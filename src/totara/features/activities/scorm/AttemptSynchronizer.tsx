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

import { useEffect, useState } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { useNetInfo } from "@react-native-community/netinfo";
import { isEmpty, get } from "lodash";

import { showMessage, Log } from "@totara/lib";
import { translate } from "@totara/locale";
import { getOfflineScormCommits, setCleanScormCommit, retrieveAllData, saveInTheCache } from "./storageUtils";
import { mutationAttempts } from "./api";

type SyncData = {
  scormId: string;
  attempt: number;
  tracks: [any];
};

type NetInfoEffectProps = {
  type?: string;
  isInternetReachable?: boolean | null;
  unSyncData?: [SyncData];
  client: any;
  saveAttempt: Function;
  setUnsyncData: Function;
  onSyncScormAttempt?: Function;
};

type SyncScormAttemptProps = {
  syncData: SyncData;
  client: any;
  unSyncData: [SyncData];
  saveAttempt: Function;
};

type PropsSyncSeverScormAttempt = {
  scormId: string;
  tracks: [any];
  saveAttempt: Function;
};

const syncScormAttempt = ({ syncData, unSyncData, client, saveAttempt }: SyncScormAttemptProps) =>
  syncServerWithScormAttempt({ ...syncData, saveAttempt })
    .then((isSynced) => {
      if (isSynced) {
        const scormBundles = retrieveAllData({ client });
        const newData = setCleanScormCommit({
          scormBundles,
          scormId: syncData.scormId,
          attempt: syncData.attempt
        });
        return saveInTheCache({ client, scormBundles: newData });
      } else {
        throw new Error("Data sync failed.");
      }
    })
    .then(() => {
      let newUnsyncData = [...unSyncData];
      if (newUnsyncData) {
        newUnsyncData.shift();
      }
      return newUnsyncData;
    });

const syncServerWithScormAttempt = ({ scormId, tracks, saveAttempt }: PropsSyncSeverScormAttempt) =>
  saveAttempt({
    variables: {
      scormid: scormId,
      attempts: tracks
    }
  }).then((responce) => {
    if (!isEmpty(responce)) {
      const attemptsAccepted = get(responce, "data.attempts.attempts_accepted", undefined);
      if (!isEmpty(attemptsAccepted)) {
        return !attemptsAccepted.includes(false);
      }
    }
    return false;
  });

const netInfoEffect = ({
  type,
  isInternetReachable,
  unSyncData,
  client,
  saveAttempt,
  setUnsyncData,
  onSyncScormAttempt = syncScormAttempt
}: NetInfoEffectProps) => () => {
  if (type && type !== "unknown" && isInternetReachable) {
    if (!isEmpty(unSyncData)) {
      // Send the attempt through the API and remove the attempt from the cache
      onSyncScormAttempt({
        syncData: unSyncData![0],
        client,
        unSyncData: unSyncData!,
        saveAttempt
      })
        .then((updatedUnsyncData) => {
          // remove the same attempt from the react state
          setUnsyncData(updatedUnsyncData);
        })
        .catch((e) => {
          showMessage({ text: `${translate("scorm.data_sync_error")}` });
          Log.warn(e);
        });
    } else {
      const syncDataSet = getOfflineScormCommits({ client });
      // update the attempt from the react state
      setUnsyncData(syncDataSet as [SyncData]);
    }
  }
};

const AttemptSynchronizer = () => {
  const [unSyncData, setUnsyncData] = useState<[SyncData]>();

  const [saveAttempt] = useMutation(mutationAttempts);
  const netInfo = useNetInfo();
  const client = useApolloClient();

  const { type, isInternetReachable } = netInfo;
  useEffect(
    netInfoEffect({
      type,
      isInternetReachable,
      unSyncData,
      client,
      saveAttempt,
      setUnsyncData
    }),
    [unSyncData, netInfo]
  );

  return null;
};

export { netInfoEffect, syncScormAttempt, syncServerWithScormAttempt };
export default AttemptSynchronizer;
