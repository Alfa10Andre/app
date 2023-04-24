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

import { get, isEmpty } from "lodash";
import * as RNFS from "react-native-fs";
import { Platform } from "react-native";
import moment from "moment";

import {
  AttemptGrade,
  Grade,
  Attempt,
  ScormBundle,
  GradeForAttemptProps,
  ScormPlayerProps,
  Sco,
  Package
} from "@totara/types/Scorm";

import { offlineScormServerRoot, scormZipPackagePath, ScormLessonStatus } from "./constants";
import { OFFLINE_SCORM_PREFIX, FILE_EXTENSION, SECONDS_FORMAT } from "@totara/lib/constants";

type GetPlayerInitialDataProps = {
  launchSrc: string;
  scormId: string;
  scos: [Sco];
  scoId: string;
  attempt: number;
  packageLocation: string;
  playerInitalData: any;
};
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;

const getOfflineScormPackageName = (scormId: string) => `${OFFLINE_SCORM_PREFIX}${scormId}`;

const getOfflinePackageUnzipPath = (scormId: string) =>
  `${offlineScormServerRoot}/${getOfflineScormPackageName(scormId)}`;

const getTargetZipFile = (scormId: string) =>
  `${scormZipPackagePath}/${getOfflineScormPackageName(scormId)}${FILE_EXTENSION}`;

const getDataForScormSummary = (isDownloaded: boolean, scormBundle: ScormBundle | undefined): any => {
  let data: any = {
    totalAttempt: 0,
    shouldAllowNewAttempt: false,
    shouldAllowLastAttempt: false
  };
  const { scorm } = scormBundle || {};
  if (!scormBundle || !scorm) {
    return data;
  }
  data.name = scorm.name;
  data.description = scorm.description;
  data.totalAttempt = scorm.attemptsCurrent || 0;
  if (scormBundle.offlineAttempts) {
    data.totalAttempt = data.totalAttempt + scormBundle!.offlineAttempts.length;
  }

  //TODO: rename - use alias - when backend finishes TL-26268
  data.gradeMethod = scorm.grademethod;
  data.attemptGrade = scorm.whatgrade;
  data.showGrades = scorm.showGrades;

  data.calculatedGrade = calculatedAttemptsGrade(
    data.attemptGrade,
    data.gradeMethod,
    scorm.maxgrade,
    scorm.calculatedGrade,
    scorm.attempts,
    scormBundle.offlineAttempts
  );
  data.timeOpen =
    (scormBundle &&
      scorm &&
      scorm.timeopen &&
      scorm.timeopen > parseInt(moment().format(SECONDS_FORMAT)) &&
      moment.unix(scorm.timeopen)) ||
    undefined;
  data.maxAttempts = (scorm.attemptsMax !== null && scorm.attemptsMax) || undefined;

  data.completionScoreRequired = (scorm.completionscorerequired !== null && scorm.completionscorerequired) || undefined;

  data.launchUrl = scorm && scorm.launchUrl;
  data.shouldAllowNewAttempt = shouldAllowAttempt(data) && (!isEmpty(data.launchUrl) || isDownloaded);

  data.repeatUrl = scorm && scorm.repeatUrl;
  data.shouldAllowLastAttempt = !isDownloaded && !isEmpty(data.repeatUrl) && data.totalAttempt > 0;

  data.attempts =
    (scorm.attempts &&
      scormBundle.offlineAttempts &&
      scormBundle.offlineAttempts &&
      scorm.attempts.concat(scormBundle.offlineAttempts)) ||
    scorm.attempts ||
    (scormBundle.offlineAttempts && scormBundle.offlineAttempts);

  data.offlinePackageScoIdentifiers = scorm && scorm.offlinePackageScoIdentifiers;

  data.newAttemptDefaults = scorm && scorm.newAttemptDefaults;
  return data;
};

const calculatedAttemptsGrade = (
  attemptGrade: AttemptGrade,
  gradeMethod: Grade,
  maxGrade: number,
  onlineCalculatedGrade?: string,
  onlineAttempts: Attempt[] = [],
  offlineAttempts: Attempt[] = []
) => {
  if (
    offlineAttempts &&
    onlineAttempts &&
    offlineAttempts.length > 0 &&
    attemptGrade !== null &&
    gradeMethod !== null &&
    maxGrade !== null
  ) {
    const allAttempts = [...onlineAttempts, ...offlineAttempts];
    const caculatedGradeReport = getAttemptsGrade(allAttempts, attemptGrade, maxGrade);
    return gradeMethod == Grade.objective ? caculatedGradeReport.toString() : `${caculatedGradeReport}%`;
  } else {
    return onlineCalculatedGrade;
  }
};

const getAttemptsGrade = (attemptsReport: Attempt[], attemptGrade: AttemptGrade, maxGrade: number): number => {
  if (!attemptsReport || attemptsReport.length === 0) {
    return 0;
  }
  switch (attemptGrade) {
    case AttemptGrade.highest: {
      const highestAttempt = attemptsReport.reduce((result: any, highestResult: any) => {
        if (result && result.gradereported > highestResult.gradereported) {
          return result;
        }
        return highestResult;
      }, undefined);
      return get(highestAttempt, "gradereported", 0);
    }
    case AttemptGrade.average: {
      const sumofscores = attemptsReport.reduce(
        (scores: number, attemptResult: any) => scores + attemptResult.gradereported,
        0
      );
      const rawSum = sumofscores * (maxGrade / 100);
      const avgRawSum = Math.round(rawSum / attemptsReport.length);
      return avgRawSum * (100 / maxGrade);
    }
    case AttemptGrade.first:
      return attemptsReport[0].gradereported;
    case AttemptGrade.last:
      return attemptsReport[attemptsReport.length - 1].gradereported;
  }
};

const getGradeForAttempt = ({ attemptCmi, maxGrade, gradeMethod }: GradeForAttemptProps) => {
  let sumGrade = 0;
  let highestGrade = 0;
  let completedScos = 0;
  let averageGrade = 0;
  if (!isEmpty(attemptCmi) && typeof Object.keys(attemptCmi) !== undefined && Object.keys(attemptCmi).length > 0) {
    const numberOfScors = Object.keys(attemptCmi).length;
    for (let [, cmi] of Object.entries(attemptCmi)) {
      // Check whether SCORM-1.2 can be "score.raw" and "core.score.raw"
      // Versions of scorm have different "score" paths
      const rawScore = parseInt(get(cmi, "core.score.raw", undefined) || get(cmi, "score.raw", 0));
      const lessonStatus = get(cmi, "core.lesson_status", "").toLowerCase();
      if (lessonStatus === ScormLessonStatus.passed || lessonStatus === ScormLessonStatus.completed) {
        completedScos = completedScos + 1;
      }
      sumGrade = sumGrade + rawScore;
      if (highestGrade < rawScore) {
        highestGrade = rawScore;
      }
    }
    averageGrade = sumGrade / numberOfScors;
  }
  const getGrades = () => ({
    [Grade.objective]: completedScos,
    [Grade.highest]: Math.round(highestGrade * (100 / maxGrade)),
    [Grade.average]: Math.round(averageGrade * (100 / maxGrade)),
    [Grade.sum]: Math.round(sumGrade * (100 / maxGrade))
  });
  return getGrades()[gradeMethod];
};

/**
 * This is to allow the user to make decision to show the buttons
 * @param param0
 */
const shouldAllowAttempt = ({ timeOpen, maxAttempts, totalAttempt = 0 }) =>
  !timeOpen && (!maxAttempts || maxAttempts > totalAttempt);

const getScormPlayerInitialData = ({
  launchSrc,
  scormId,
  scoId,
  attempt,
  packageLocation,
  playerInitalData
}: GetPlayerInitialDataProps) => {
  const { defaults, interactions, objectives } = playerInitalData;
  const _entrysrc = launchSrc ? `${packageLocation}/${launchSrc}` : undefined;
  const _scormdebugging = false;
  const _scormauto = 0;
  const _scormid = scormId;
  const _scoid = scoId;
  const _autocommit = false;
  const _masteryoverride = true;
  const _hidetoc = 1;

  return {
    entrysrc: _entrysrc,
    def: { ...defaults },
    obj: { ...objectives },
    int: { ...interactions },
    scormdebugging: _scormdebugging,
    scormauto: _scormauto,
    scormid: _scormid,
    scoid: _scoid,
    attempt: attempt,
    autocommit: _autocommit,
    masteryoverride: _masteryoverride,
    hidetoc: _hidetoc
  } as ScormPlayerProps;
};

const scormDataIntoJsInitCode = (scormData: any, cmi: any) => {
  const _entrysrc = "'" + scormData.entrysrc + "'";
  const _def = "'" + JSON.stringify(scormData.def) + "'";
  const _cmiobj = "'" + JSON.stringify(scormData.obj) + "'";
  const _cmiint = "'" + JSON.stringify(scormData.int) + "'";
  const _scormdebugging = "'" + scormData.scormdebugging + "'";
  const _scormauto = "'" + scormData.scormauto + "'";
  const _scormid = "'" + scormData.scormid + "'";
  const _scoid = "'" + scormData.scoid + "'";
  const _attempt = "'" + scormData.attempt + "'";
  const _autocommit = scormData.autocommit;
  const _masteryoverride = scormData.masteryoverride;
  const _hidetoc = "'" + scormData.hidetoc + "'";

  return (
    "{onInjectScormData(" +
    _entrysrc +
    ", " +
    _def +
    ", " +
    _cmiobj +
    ", " +
    _cmiint +
    ", " +
    _scormdebugging +
    ", " +
    _scormauto +
    ", " +
    _scormid +
    ", " +
    _scoid +
    ", " +
    _attempt +
    ", " +
    _autocommit +
    ", " +
    _masteryoverride +
    ", " +
    _hidetoc +
    ", " +
    "'" +
    JSON.stringify(cmi) +
    "'" +
    ")}"
  );
};

//scorm player package handling
const setupOfflineScormPlayer = (
  onScormPlayerInitialized = isScormPlayerInitialized,
  onInitializeScormWebplayer = initializeScormWebplayer
) => {
  return onScormPlayerInitialized().then((isInit) => {
    if (isInit) {
      return offlineScormServerRoot;
    } else {
      return onInitializeScormWebplayer().then(() => {
        return offlineScormServerRoot;
      });
    }
  });
};

const loadScormPackageData = (packageData?: Package, onGetScormPackageData = getScormPackageData) => {
  if (packageData && !isEmpty(packageData.path)) {
    if (packageData.scos && packageData.defaultSco) {
      return Promise.resolve(packageData);
    } else {
      return onGetScormPackageData(`${offlineScormServerRoot}/${packageData.path}`).then((data) => {
        const tmpPackageData = { ...packageData, ...data } as Package;
        return tmpPackageData;
      });
    }
  } else {
    return Promise.reject("Cannot find offline package data");
  }
};

const getPackageContent = () =>
  Platform.OS === "android"
    ? RNFS.readDirAssets(getScormPlayerPackagePath())
    : RNFS.readDir(getScormPlayerPackagePath());

const initializeScormWebplayer = () => {
  return RNFS.mkdir(offlineScormServerRoot).then(() => {
    return getPackageContent().then((result) => {
      if (result && result.length) {
        let promisesToCopyFiles: [Promise<void>?] = [];
        for (let i = 0; i < result.length; i++) {
          const itemPathFrom = result[i].path;
          const itemPathTo = `${offlineScormServerRoot}/${result[i].name}`;
          const copyAssetsToPlayer = () =>
            Platform.OS === "android"
              ? RNFS.copyFileAssets(itemPathFrom, itemPathTo)
              : RNFS.copyFile(itemPathFrom, itemPathTo);
          const promiseCopyItem = RNFS.exists(itemPathTo).then((isExist) => {
            if (!isExist) {
              return copyAssetsToPlayer();
            } else {
              return RNFS.unlink(itemPathTo).then(() => {
                return copyAssetsToPlayer();
              });
            }
          });
          promisesToCopyFiles.push(promiseCopyItem);
        }
        return Promise.all(promisesToCopyFiles);
      } else {
        throw new Error("Cannot find any content in the location (" + getScormPlayerPackagePath() + ")");
      }
    });
  });
};

const isScormPlayerInitialized = () => {
  return getPackageContent().then((result) => {
    if (result && result.length) {
      const promisesToExistFiles = <Promise<Boolean>[]>[];
      for (let i = 0; i < result.length; i++) {
        const itemPathTo = `${offlineScormServerRoot}/${result[i].name}`;
        promisesToExistFiles.push(RNFS.exists(itemPathTo));
      }
      return Promise.all(promisesToExistFiles).then((resultExistsFiles) => {
        for (let index = 0; index < resultExistsFiles.length; index++) {
          if (!resultExistsFiles[index]) {
            return false;
          }
        }
        return true;
      });
    } else {
      throw new Error("No package content found.");
    }
  });
};

const getScormPlayerPackagePath = () => (Platform.OS === "android" ? `html` : `${RNFS.MainBundlePath}/html`);

// downloaded scorm activity package processing

const getScormPackageData = (packagPath: string) => {
  const manifestFilePath = `${packagPath}/imsmanifest.xml`;
  return RNFS.readFile(manifestFilePath).then((xmlcontent) => {
    if (!isEmpty(xmlcontent)) {
      const xmlData = new dom().parseFromString(xmlcontent);
      const scosList = getScosDataForPackage(xmlData);
      const defaultSco = getInitialScormLoadData(xmlData);

      if (!isEmpty(scosList)) return { scos: scosList, defaultSco: defaultSco } as Package;
    }
  });
};

/**
 * Based on the schema of SCORM 1.2 manifest file, it can be found here
 * https://scorm.com/wp-content/assets/SchemaDefinitionFiles/SCORM%201.2%20Schema%20Definition/imsmanifest.xml
 *
 * @param manifestDom
 */
const getScosDataForPackage = (manifestDom: any) => {
  const resultOrganisations = xpath.evaluate(
    "//*[local-name(.)='organizations']/*[local-name()='organization']",
    manifestDom, // contextNode
    null, // namespaceResolver
    xpath.XPathResult.ANY_TYPE, // resultType
    null // result
  );
  let organizationNode;
  let scos: [Sco?] = [];
  while ((organizationNode = resultOrganisations.iterateNext())) {
    const organizationId = organizationNode.getAttribute("identifier");
    const itemResult = xpath.evaluate(
      ".//*[local-name(.)='item']/@identifier",
      organizationNode,
      null,
      xpath.XPathResult.ANY_TYPE,
      null
    );
    let itemNode;
    while ((itemNode = itemResult.iterateNext())) {
      const itemId = itemNode.nodeValue;
      const valLaunchUrl = getDefaultScoLaunchUrl(manifestDom, itemNode.nodeValue);
      if (itemId && valLaunchUrl && organizationId) {
        const sco: Sco = {
          id: itemId,
          organizationId: organizationId,
          launchSrc: valLaunchUrl
        };
        scos.push(sco);
      }
    }
  }
  return scos;
};

const getInitialScormLoadData = (manifestDom: any) => {
  const defaultOrgizationsNode = xpath.select(
    "//*[local-name(.)='organizations']/*[local-name(.)='organization']/@identifier",
    manifestDom
  );
  let defaultOrgizationId: string | undefined;
  if (!isEmpty(defaultOrgizationsNode)) {
    if (defaultOrgizationsNode.length === 1) {
      defaultOrgizationId = defaultOrgizationsNode[0].nodeValue;
    } else {
      const defaultOrgNode = xpath.select("//*[local-name(.)='organizations']/@default", manifestDom);
      if (!isEmpty(defaultOrgNode) && !isEmpty(defaultOrgNode[0].nodeValue)) {
        const tempDefaultOrg = defaultOrgNode[0].nodeValue;
        for (let i = 0; i < defaultOrgizationsNode.length; i++) {
          if (defaultOrgizationsNode[i].nodeValue === tempDefaultOrg) {
            defaultOrgizationId = tempDefaultOrg;
            break;
          }
        }
      }
      if (!defaultOrgizationId) {
        defaultOrgizationId = defaultOrgizationsNode[0].nodeValue;
      }
    }
  }
  let defaultScoId: string | undefined;
  let defaultLaunchSrc: string | undefined;
  if (!isEmpty(defaultOrgizationId)) {
    const firstScoOnDefaultOrgNode = xpath.select(
      "//*[local-name(.)='organizations']/*[local-name(.)='organization' and @identifier='" +
        defaultOrgizationId +
        "']/*[local-name(.)='item'][1]",
      manifestDom
    );
    if (firstScoOnDefaultOrgNode && firstScoOnDefaultOrgNode.length === 1) {
      defaultScoId = firstScoOnDefaultOrgNode[0].getAttribute("identifier");
      defaultLaunchSrc = getDefaultScoLaunchUrl(manifestDom, defaultScoId!);
    }
  }
  if (defaultOrgizationId && defaultScoId && defaultLaunchSrc) {
    return {
      id: defaultScoId,
      organizationId: defaultOrgizationId,
      launchSrc: defaultLaunchSrc
    };
  }
};

const getDefaultScoLaunchUrl = (manifestDom: any, scoId: string) => {
  const scoNode = xpath.select("//*[local-name(.)='item' and @identifier ='" + scoId + "']", manifestDom);
  if (scoNode.length === 1) {
    const resouceId = scoNode[0].getAttribute("identifierref");
    const queryString = scoNode[0].getAttribute("parameters");
    const resourceNode = xpath.select(
      "//*[local-name(.)='resources']/*[local-name(.)='resource' and @identifier ='" + resouceId + "']",
      manifestDom
    );
    if (resourceNode && resourceNode.length === 1 && resourceNode[0].getAttribute("href")) {
      return `${resourceNode[0].getAttribute("href")}${queryString}`;
    }
  }
};

export {
  getOfflinePackageUnzipPath,
  getTargetZipFile,
  getOfflineScormPackageName,
  getDataForScormSummary,
  calculatedAttemptsGrade,
  getAttemptsGrade,
  getGradeForAttempt,
  shouldAllowAttempt,
  getScormPlayerInitialData,
  scormDataIntoJsInitCode,
  setupOfflineScormPlayer,
  loadScormPackageData,
  initializeScormWebplayer,
  isScormPlayerInitialized,
  getScormPackageData
};
