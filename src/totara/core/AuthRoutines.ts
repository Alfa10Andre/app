/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2019 onwards Totara Learning Solutions LTD
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

import { ApolloClient, ApolloLink, HttpLink, NormalizedCacheObject, ServerError } from "@apollo/client";
import ApolloLinkTimeout from "apollo-link-timeout";
import { get } from "lodash";
import { setContext } from "@apollo/client/link/context";
import { RetryLink } from "@apollo/client/link/retry";
import { onError, ErrorResponse } from "@apollo/client/link/error";

import { AsyncStorageStatic } from "@react-native-async-storage/async-storage";
import { config, Log } from "@totara/lib";
import { AUTH_HEADER_FIELD } from "@totara/lib/constants";
import { AppState, SiteInfo } from "@totara/types";
import { NetworkFailedError } from "@totara/types/Error";
import { persistor } from "./../store";
import { purge } from "./../actions/root";
import { deleteDevice } from "./api/core";
import { Setup } from "@totara/types/Auth";
import event, { Events, EVENT_LISTENER } from "@totara/lib/event";
import { translate } from "@totara/locale";

/**
 * Authentication Routines, part of AuthProvider however refactored to individual functions
 * so dependency can be passed as params for testing.
 *
 * WIP, not ideal that internal implementation is exposed (export).  Working out how to do
 * have a good balance between testability and keeping implementation hidden
 *
 * Partially apply the function to an instance of AuthProvider and recommended on its constructor
 */

/**
 * Given a appState secret (temp key), retrieve the api key (a long term key) from the api via
 * fetch.  Store the api key and host in storage, return these as well.
 *
 * @param fetchData - promise that resolves to get data
 * @param asyncStorage - device storage
 *
 * @param setup - contains the appState secret to be validated by the server
 *
 * @returns promise of appState which contains the valid apiKey and which host it was obtained from
 */
export const registerDevice =
  (fetchData: <T>(input: RequestInfo, init?: RequestInit) => Promise<T>, asyncStorage: AsyncStorageStatic) =>
  async (setup: Setup): Promise<AppState> => {
    type ApiKey = {
      apikey: string;
    };

    return fetchData<ApiKey>(config.deviceRegisterUri(setup.uri), {
      method: "POST",
      body: JSON.stringify({
        setupsecret: setup.secret
      })
    })
      .then(apiKey => {
        const siteInfoData = JSON.stringify(setup.siteInfo);
        return Promise.all([
          asyncStorage.setItem("apiKey", apiKey.apikey),
          asyncStorage.setItem("siteInfo", siteInfoData),
          asyncStorage.setItem("host", setup.uri)
        ]).then(() => {
          return apiKey;
        });
      })
      .then(apiKey => {
        const appState = {
          apiKey: apiKey.apikey,
          host: setup.uri,
          siteInfo: setup.siteInfo
        } as AppState;
        return appState;
      })
      .catch(error => {
        //NOTE: This is using warning so the app does not crash
        Log.warn("unable to get apiKey", error);
        return {} as AppState;
      });
  };

/**
 *
 * During logOff this will clean up the device properly.  Will perform both local and remote
 * clean up.  It would catch all errors, as a user would be logged off regardless issues on the
 * remote and local services.  It would always clear the memory state
 *
 * @param apolloClient
 *
 * @param dispatch - to update the redux store
 */
export const deviceCleanup = ({ apolloClient, dispatch }) => {
  if (!apolloClient) logOut({ apolloClient, dispatch });
  apolloClient
    ?.mutate({
      mutation: deleteDevice
    })
    .then(({ data: { delete_device } }) => {
      if (!delete_device) Log.warn("Unable to delete device from server");
      return delete_device;
    })
    .catch(error => {
      Log.warn("remote clean up had issues, but continue to do local clean up", error);
    })
    .finally(() => {
      logOut({ apolloClient, dispatch });
    });
};

/**
 * Would get needed items from storage and return a valid state appState.
 *
 * @param asyncStorage device storage
 */
export const bootstrap = (asyncStorage: AsyncStorageStatic) => async (): Promise<AppState | undefined> => {
  const [apiKey, host, siteInfo] = await Promise.all([
    asyncStorage.getItem("apiKey"),
    asyncStorage.getItem("host"),
    asyncStorage.getItem("siteInfo")
  ]);

  if (apiKey !== null && host !== null && siteInfo !== null) {
    return {
      apiKey: apiKey,
      host: host,
      siteInfo: JSON.parse(siteInfo) as SiteInfo
    };
  } else {
    return undefined;
  }
};

/**
 * create an authenticated Apollo client that has the right credentials to the api
 */
export const createApolloClient = (apiKey: string, host: string, cache: any): ApolloClient<NormalizedCacheObject> => {
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      [AUTH_HEADER_FIELD]: apiKey
    },
    http: { includeQuery: !config.mobileApi.persistentQuery }
  }));

  const errorLink = onError(({ networkError }: ErrorResponse) => {
    if (networkError && (networkError as ServerError).statusCode === 401) {
      Log.warn("Forbidden error");
    } else {
      const errorMessage = get(networkError, "result.errors[0].message", translate("general.error_unknown"));
      if (networkError) Log.warn("Network error status code: ", (networkError as ServerError).statusCode);
      Log.warn("Error message: ", errorMessage);
      const payload = { errorMessage };
      event.emit(EVENT_LISTENER, { event: Events.NetworkError, payload });
    }
  });

  const httpLink = new HttpLink({ uri: config.apiUri(host) });
  const timeOutLinkWithHttpLink = new ApolloLinkTimeout(10 * 1000).concat(httpLink);
  const link = ApolloLink.from([
    errorLink,
    new RetryLink({
      attempts: {
        max: 2,
        retryIf: error => {
          if (error.statusCode && error.statusCode === 401) {
            return false; // do not retry on 401 errors, fail fast
          } else {
            return !!error;
          }
        }
      }
    }),
    authLink,
    timeOutLinkWithHttpLink
  ]);

  return new ApolloClient({
    link: link,
    cache
  });
};

/**
 * fetch the json data from http endpoint.  The response is expected to be json with a data then return payload
 * { data: payload } as the object
 *
 * @param fetch - pass the fetch implementation, usually in test this is a mock fetch
 * @param input - input such as url to fetch to
 * @param init - optional options for the fetch request
 *
 * @example
 *
 * const totaraApi = fetchData(globalFetch)
 *
 * totaraApi<MyType>(
 *   "https://totarasite/api.php",
 *   {
 *      method: "GET"
 *   }
 *
 */

export const fetchData =
  (fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>) =>
  async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
    const fetchPromise = fetch(input, init)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          Log.warn("fetch error response", response);
          return Promise.reject(response);
        }
      })
      .catch(error => {
        if (error?.message === "Network request failed") {
          return Promise.reject(new NetworkFailedError());
        }
        return Promise.reject(error);
      })
      .then(json => {
        if (json.data) return json.data as unknown as T;
        else return Promise.reject("json expected to have data attribute");
      });

    //TIMEOUT OF 10 SECS (10*1000)
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new NetworkFailedError());
      }, 10 * 1000);
      fetchPromise.then(
        res => {
          clearTimeout(timeoutId);
          resolve(res);
        },
        err => {
          clearTimeout(timeoutId);
          reject(err);
        }
      );
    });
  };

export const logOut = async ({ apolloClient, dispatch }) => {
  if (apolloClient) {
    const { cache } = apolloClient;
    await cache.reset(); //clear the apollo client cache
  }
  await dispatch(purge({})); //root purge (hot)
  await persistor.purge(); //root purge (stored)
  return Promise.resolve();
};
