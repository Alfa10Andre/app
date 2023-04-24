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

import { Grade, ScormBundle, GradeForAttemptProps } from "@totara/types/Scorm";
import { scormActivitiesRecordsQuery } from "@totara/features/activities/scorm/api";
import { setWith, get, values, remove, omit, isEmpty, difference } from "lodash";

import { getGradeForAttempt } from "./utils";

type CacheProps = {
  client: any;
  scormBundles?: { [key: string]: ScormBundle };
};

type CompletedScormAttemptProps = {
  scormBundles?: { [key: string]: ScormBundle };
  scormId: string;
  client: any;
  attempt?: number;
  offlinePackageScoIdentifiers?: [string];
  onRetrieveAllData?: (data: CacheProps) => {};
  onSaveInTheCache?: (data: CacheProps) => void;
};

type SetScormActivityProps = {
  scormBundles?: { [key: string]: ScormBundle };
  data: any;
  maxGrade: number;
  gradeMethod: Grade;
  onGetGradeForAttempt?: (data: GradeForAttemptProps) => number;
};

type ScormCommitProps = {
  scormBundles?: { [key: string]: ScormBundle };
  scormId: string;
  attempt: number;
  offlinePackageScoIdentifiers?: [string];
};

type CachedCommitsProps = {
  client: any;
  onRetrieveAllData?: (data: CacheProps) => {};
};
/**
 *
 * @param param0 - Object with the scorm id to fetch the cached activity records
 * @returns an object: the specific scorm cached data
 * NOTE: `client` is needed because this readQuery function needs the state of the client object to work properly.
 */
const retrieveAllData = ({ client }): { [key: string]: ScormBundle } => {
  try {
    const { scormBundles } = client.readQuery({
      query: scormActivitiesRecordsQuery
    });
    return scormBundles;
  } catch (e) {
    return {};
  }
};
/**
 * This saves the map of scorm bundle with the new scormBunble in the cache
 * @param param0
 * NOTE: `client` is needed because this writeQuery function needs the state of the client object to work properly.
 */
const saveInTheCache = ({ client, scormBundles }: CacheProps) => {
  try {
    client.writeQuery({
      query: scormActivitiesRecordsQuery,
      data: {
        scormBundles
      }
    });
  } catch (e) {
    console.warn("Scorm cache data saving error: ", e);
  }
};

const setScormActivityData = ({
  scormBundles,
  data,
  maxGrade,
  gradeMethod,
  onGetGradeForAttempt = getGradeForAttempt
}: SetScormActivityProps) => {
  const scormId = data.scormid;
  const attempt = data.attempt;
  const scoId = data.scoid;
  const cmiData = data.cmi;
  const commitData = data.commit;

  let newData = { ...scormBundles };

  setWith(newData, `[${scormId}].cmi[${attempt}][${scoId}]`, cmiData, Object);

  const reportCmiList = get(newData, `[${scormId}].cmi[${attempt}]`);
  const attemptGrade = onGetGradeForAttempt({
    attemptCmi: reportCmiList,
    maxGrade,
    gradeMethod
  });
  const newAttemptGrade = { gradereported: attemptGrade, attempt: attempt };

  const existingOfflineActivityData = get(newData, `[${scormId}].offlineAttempts`, []);
  if (existingOfflineActivityData && existingOfflineActivityData.length > 0) {
    if (existingOfflineActivityData[existingOfflineActivityData.length - 1].attempt === newAttemptGrade.attempt) {
      existingOfflineActivityData.pop();
    }
  }
  setWith(newData, `[${scormId}].offlineAttempts`, existingOfflineActivityData.concat([newAttemptGrade]), Object);

  setWith(newData, `[${scormId}].commits[${attempt}][${scoId}]`, commitData, Object);
  return newData;
};

const setCompletedScormAttempt = ({
  scormId,
  attempt,
  offlinePackageScoIdentifiers,
  scormBundles
}: ScormCommitProps) => {
  let newData = { ...scormBundles };

  const newCommitsData = get(newData, `completed_attempts.[${scormId}]`, []);
  const newDataCmi = get(newData, `[${scormId}].cmi[${attempt}]`, undefined);
  if (newDataCmi) {
    const savedCmiScos = Object.keys(newDataCmi);
    const nonExistingScos = difference(offlinePackageScoIdentifiers, savedCmiScos);
    if (nonExistingScos && nonExistingScos.length > 0) {
      newData = setCleanScormCommit({ scormBundles, scormId, attempt });
    } else {
      if (!newCommitsData.some((x) => x === attempt)) {
        newCommitsData.push(attempt);
        setWith(newData, `completed_attempts.[${scormId}]`, newCommitsData, Object);
      }
    }
  }
  return newData;
};

const getOfflineLastActivityResult = ({
  scormId,
  client,
  onRetrieveAllData = retrieveAllData
}: CompletedScormAttemptProps) => {
  const scormBundles = onRetrieveAllData({ client });
  const scormOfflineActivityReport = get(scormBundles, `[${scormId}].offlineAttempts`, undefined);
  if (scormOfflineActivityReport && scormOfflineActivityReport.length > 0) {
    return scormOfflineActivityReport[scormOfflineActivityReport.length - 1];
  }
};

const getOfflineActivity = ({ client, scormId, onRetrieveAllData = retrieveAllData }: CompletedScormAttemptProps) => {
  const cachedData = onRetrieveAllData({ client });

  const offlineAttempts = get(cachedData, `[${scormId}].offlineAttempts`, undefined);
  if (offlineAttempts && Object.keys(offlineAttempts).length) {
    return offlineAttempts;
  }
};

const getOfflineScormCommits = ({ client, onRetrieveAllData = retrieveAllData }: CachedCommitsProps) => {
  const allOfflineData = onRetrieveAllData({ client });
  const completedScormAttempts = get(allOfflineData, `completed_attempts`, undefined);

  if (completedScormAttempts) {
    const formattedUnsyncedData = <any[]>[];
    const scormIs = Object.keys(completedScormAttempts);
    for (let keyIndex = 0; keyIndex < scormIs.length; keyIndex++) {
      const scormId = scormIs[keyIndex];
      const completedAttempts = completedScormAttempts[scormId];
      for (let indexAttempt = 0; indexAttempt < completedAttempts.length; indexAttempt++) {
        const attempt = completedAttempts[indexAttempt];

        const commitScormAttempt = get(allOfflineData, `${[scormId]}.commits[${[attempt]}]`, undefined);
        if (commitScormAttempt) {
          const commitTracks = values(commitScormAttempt).filter((value) => value);
          const commit = {
            scormId: scormId,
            attempt: parseInt(attempt),
            tracks: commitTracks
          };
          formattedUnsyncedData.push(commit);
        }
      }
    }
    if (formattedUnsyncedData.length > 0) {
      return formattedUnsyncedData;
    }
  }
  return;
};

const setCleanScormCommit = ({ scormBundles, scormId, attempt }: ScormCommitProps) => {
  if (scormBundles && !isEmpty(scormBundles)) {
    let newData = { ...scormBundles };

    const completedScormAttempts = get(newData, `completed_attempts.[${scormId}]`, undefined);
    if (completedScormAttempts) {
      remove(completedScormAttempts, (num) => num == attempt);
      if (!completedScormAttempts) {
        newData = omit(newData, [`completed_attempts.[${scormId}]`]);
      } else {
        setWith(newData, `completed_attempts.[${scormId}]`, completedScormAttempts, Object);
      }
    }
    newData = omit(newData, [`[${scormId}].commits[${attempt}]`, `[${scormId}].cmi[${attempt}]`]);
    const existingOfflineActivityData = get(newData, `[${scormId}].offlineAttempts`, []);
    // record.attempt is string and attempt is number, so avoid checking type
    remove(existingOfflineActivityData, (record) => record.attempt == attempt);
    setWith(newData, `[${scormId}].offlineAttempts`, existingOfflineActivityData, Object);
    return newData;
  }
  return {};
};

const getScormAttemptData = ({
  client,
  scormId,
  attempt,
  onRetrieveAllData = retrieveAllData
}: CompletedScormAttemptProps) => {
  const cachedData = onRetrieveAllData({ client });

  const attemptCmi = get(cachedData, `[${scormId}].cmi[${attempt}]`, undefined);
  if (attemptCmi && Object.keys(attemptCmi).length) {
    return attemptCmi;
  }
};

export {
  retrieveAllData,
  saveInTheCache,
  setScormActivityData,
  setCompletedScormAttempt,
  getOfflineLastActivityResult,
  getOfflineActivity,
  getOfflineScormCommits,
  setCleanScormCommit,
  getScormAttemptData
};
