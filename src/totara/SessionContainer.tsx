/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2021 onwards Totara Learning Solutions LTD
 *
 * Totara Enterprise is provided only to Totara Learning Solutions
 * LTD’s customers and partners, pursuant to the terms and
 * conditions of a separate agreement with Totara Learning
 * Solutions LTD or its affiliate.
 *
 * If you do not have an agreement with Totara Learning Solutions
 * LTD, you may not access, use, modify, or distribute this software.
 * Please contact [sales@totaralearning.com] for more information.
 */

import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import {
  ApolloProvider,
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  defaultDataIdFromObject
} from "@apollo/client";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { linkingHandler } from "./auth/authUtils";
import SiteUrl from "./auth/manual/SiteUrl";
import { AppStateListener, Loading } from "./components";
import { useSession } from "./core";
import { createApolloClient, deviceCleanup, fetchData, registerDevice } from "./core/AuthRoutines";
import LocaleResolver from "./locale/LocaleResolver";
import MainContainer from "./MainContainer";
import { AsyncStorageWrapper, CachePersistor } from "apollo3-cache-persist";
import { LearningItem } from "./types";
import { queryCore } from "./core/api/core";
import AdditionalAction from "./auth/additional-actions/AdditionalAction";
import AttemptSynchronizer from "@totara/activities/scorm/AttemptSynchronizer";
import { useDispatch } from "react-redux";
import event, { Events, EVENT_LISTENER } from "./lib/event";

const setupApolloClient = async ({ apiKey, host }) => {
  const cache = new InMemoryCache({
    dataIdFromObject: object => {
      switch (object.__typename) {
        case "totara_mobile_current_learning": {
          const learningItem = object as unknown as LearningItem;
          return `${learningItem.id}__${learningItem.itemtype}`; // totara_core_learning_item is generic type, need to use 1 more field discriminate different types
        }
        default:
          return defaultDataIdFromObject(object); // fall back to default for all other types
      }
    }
  });

  const newPersistor = new CachePersistor({
    cache,
    storage: new AsyncStorageWrapper(AsyncStorage)
  });

  const newApolloClient = createApolloClient(apiKey, host!, cache);

  return {
    apolloClient: newApolloClient,
    persistor: newPersistor
  };
};

const initialURLHandler = ({ fetchDataWithFetch, url, siteInfo, initSession, dispatch }) => {
  if (url) {
    linkingHandler(
      url,
      ({ secret, uri }) => {
        registerDevice(
          fetchDataWithFetch,
          AsyncStorage
        )({
          uri: uri,
          secret: secret,
          siteInfo: siteInfo
        })
          .then(res => {
            dispatch(initSession({ apiKey: res.apiKey }));
          })
          .catch(ee => {
            console.warn(ee);
          });
      },
      () => {
        console.warn("fail");
      }
    );
  }
};

const SessionContainer = () => {
  // eslint-disable-next-line no-undef
  const fetchDataWithFetch = fetchData(fetch);

  const { initSession, host, apiKey, siteInfo, core, setCore } = useSession();
  const dispatch = useDispatch();
  const [apolloClient, setApolloClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [persistor, setPersistor] = useState<CachePersistor<NormalizedCacheObject>>();
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  const onLogout = async (apolloClient, dispatch) => {
    deviceCleanup({ apolloClient, dispatch });
  };

  React.useEffect(() => {
    const unsubscribe = event.addListener(EVENT_LISTENER, param => {
      if (param.event === Events.Logout) {
        onLogout(apolloClient, dispatch);
      }
    });

    return () => unsubscribe;
  }, [apolloClient]);

  useEffect(() => {
    if (apiKey && !apolloClient) {
      setupApolloClient({ apiKey, host }).then(({ apolloClient, persistor }) => {
        setPersistor(persistor);
        setApolloClient(apolloClient);
        persistor?.restore();
      });
    } else if (!apiKey && apolloClient) {
      persistor?.purge();
      setApolloClient(undefined);
    } else if (apiKey && apolloClient && isLoading) {
      setIsLoading(false);
    }
  }, [apiKey, apolloClient]);

  useEffect(() => {
    //only runs if apolloClient exists and core not yet
    if (apolloClient && apiKey && !core) {
      apolloClient
        .query({
          query: queryCore
        })
        .then(result => {
          const core = result.data.me;
          dispatch(setCore(core));
          setIsLoading(false);
        })
        .catch(e => {
          console.warn("Failing to fetching user data: ", e);
        });
    }
  }, [apolloClient, apiKey, core]);

  const requiresAdditionalAction =
    core?.system.password_change_required ||
    core?.system.request_policy_agreement ||
    core?.system.request_user_consent ||
    core?.system.request_user_fields;

  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        if (!apiKey) {
          Linking.getInitialURL().then(url => {
            initialURLHandler({ fetchDataWithFetch, url, siteInfo, initSession, dispatch });
          });
        } else {
          return () => {
            Linking.removeAllListeners("url");
          };
        }
      }
    }, [apiKey])
  );

  if (!host || !apiKey) {
    return <SiteUrl />;
  }

  if (requiresAdditionalAction) {
    return (
      <AppStateListener
        onActive={() => {
          dispatch(setCore(undefined));
        }}>
        <AdditionalAction />
      </AppStateListener>
    );
  }

  if (isLoading || !apolloClient) return <Loading />;

  return (
    <ApolloProvider client={apolloClient!}>
      <LocaleResolver>
        <MainContainer />
        <AttemptSynchronizer />
      </LocaleResolver>
    </ApolloProvider>
  );
};

export default SessionContainer;
