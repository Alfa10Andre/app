/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2020 onwards Totara Learning Solutions LTD
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

import React, { useEffect, useState, useRef } from "react";
import { Text, BackHandler } from "react-native";
// @ts-ignore //TODO: THERE'S NO TYPED FOR REACT-NATIVE-STATIC-SERVER https://github.com/futurepress/react-native-static-server/issues/67
import StaticServer from "@dr.pogodin/react-native-static-server";

import OfflineScormPlayer from "./components/OfflineScormPlayer";
import { Package, Scorm } from "@totara/types/Scorm";
import { Log } from "@totara/lib";
import { translate } from "@totara/locale";
import { useApolloClient } from "@apollo/client";
import { get, isEmpty } from "lodash";

import { setScormActivityData, getScormAttemptData, retrieveAllData, saveInTheCache } from "./storageUtils";
import { useSelector } from "react-redux";
import { RootState } from "@totara/reducers";
import { ResourceType } from "@totara/types/Resource";
import {
  getOfflineScormPackageName,
  getScormPlayerInitialData,
  scormDataIntoJsInitCode,
  setupOfflineScormPlayer,
  loadScormPackageData
} from "./utils";
import { ScormLessonStatus } from "./constants";
import { SCORM_TEST_IDS } from "@totara/lib/testIds";

type OfflineScormParams = {
  attempt: number;
  scorm?: Scorm;
  backAction: () => void;
};

type OfflineScormProps = {
  navigation: any;
};
const { NONE_EXIST_RESOURCE_ID, INVALID_SCORM_ID } = SCORM_TEST_IDS;
const getResources = (state: RootState) => state.resourceReducer.resources;

const OfflineScormActivity = ({ navigation }: OfflineScormProps) => {
  const { scorm, attempt, backAction } = navigation.state.params as OfflineScormParams;
  if (!scorm || !scorm.id) {
    return <Text testID={INVALID_SCORM_ID}>{translate("general.error_unknown")}</Text>;
  }

  const resourcesList = useSelector(getResources);
  const targetResource = resourcesList.find(
    resource => resource.customId === scorm.id && resource.type === ResourceType.ScormActivity
  );
  if (!targetResource) {
    return <Text testID={NONE_EXIST_RESOURCE_ID}>{translate("general.error_unknown")}</Text>;
  }

  const server = useRef<StaticServer>(null);

  const [scormPackageData, setScormPackageData] = useState<Package>({
    path: `${getOfflineScormPackageName(scorm.id)}`
  });
  const { scos, defaultSco } = scormPackageData;

  const [url, setUrl] = useState<string>();
  const [jsCode, setJsCode] = useState<string>();
  const client = useApolloClient();

  useEffect(
    loadedScormEffect({
      server,
      setUrl,
      scormPackageData,
      setScormPackageData,
      backAction
    }),
    [scorm.id]
  );

  useEffect(
    packageEffect({
      url,
      scos,
      scorm,
      attempt,
      client,
      defaultSco,
      setJsCode
    }),
    [scormPackageData, url]
  );

  return (
    <>
      {url && jsCode ? (
        <OfflineScormPlayer
          url={url}
          injectScript={jsCode}
          onExitHandler={() => stopServer(server, setUrl)}
          onMessageHandler={onPlayerMessageHandler({
            client,
            maxGrade: scorm.maxgrade,
            gradeMethod: scorm.grademethod
          })}
        />
      ) : (
        <Text>{translate("general.loading")}</Text>
      )}
    </>
  );
};

const packageEffect = ({ url, scos, scorm, attempt, client, defaultSco, setJsCode }) => () => {
  if (url && scos) {
    const { id, newAttemptDefaults } = scorm;
    const cmiData = getScormAttemptData({
      scormId: scorm.id,
      attempt,
      client
    });
    const selectedSco = defaultSco ? defaultSco : scos[0];
    const lastActivityCmi = (cmiData && cmiData[selectedSco.id]) || null;
    const cmi = getScormPlayerInitialData({
      launchSrc: selectedSco?.launchSrc,
      scormId: id,
      scos,
      scoId: selectedSco?.id,
      attempt,
      packageLocation: getOfflineScormPackageName(scorm.id),
      playerInitalData: {
        defaults: JSON.parse(newAttemptDefaults)
      }
    });
    setJsCode(scormDataIntoJsInitCode(cmi, lastActivityCmi));
  }
};

const loadedScormEffect = ({ server, setUrl, scormPackageData, setScormPackageData, backAction }) => () => {
  setupOfflineScormPlayer()
    .then(offlineServerPath => {
      if (!isEmpty(offlineServerPath)) {
        return startServer(offlineServerPath, server);
      } else {
        throw new Error("Cannot fine offline server details.");
      }
    })
    .then((serverOrigin: string) => {
      setUrl(serverOrigin);
    })
    .catch(e => {
      Log.debug(e.messageData);
    });

  loadScormPackageData(scormPackageData)
    .then(data => {
      setScormPackageData(data);
    })
    .catch(e => {
      Log.debug(e.messageData);
    });

  const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
  return () => backHandler.remove();
};

const stopServer = (server: React.MutableRefObject<any>, setUrl) => {
  if (server && server.current) {
    server.current!.stop();
    server.current = null;
  }
  setUrl(undefined);
};

const startServer = (path: string, server: React.MutableRefObject<any>) => {
  if (server && server.current) {
    server.current.stop();
    server.current = null;
  }
  server.current = new StaticServer(0, path, {
    keepAlive: true,
    localOnly: true
  });
  return server.current.start();
};

const onPlayerMessageHandler = ({ client, maxGrade, gradeMethod }) => (messageData: any) => {
  const { tmsevent, result } = messageData;
  const status = get(result, "cmi.core.lesson_status", undefined);
  if (tmsevent && tmsevent === "SCORMCOMMIT" && status && status !== ScormLessonStatus.incomplete) {
    const scormBundles = retrieveAllData({ client });
    const newData = setScormActivityData({
      scormBundles,
      data: result,
      maxGrade,
      gradeMethod
    });
    saveInTheCache({
      client,
      scormBundles: newData
    });
  }
};

export { packageEffect, loadedScormEffect, stopServer, onPlayerMessageHandler };
export default OfflineScormActivity;
