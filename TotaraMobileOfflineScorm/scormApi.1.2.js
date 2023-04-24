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
 *
 * @author Simon Tegg <simon.tegg@totaralearning.com>
 */

/* global onpostCommitDataToNative */
import Models from "./scormModels";
import totalTime from "./scormTotalTime";
import collectData from "./scormCollectData";
import { get, set } from "./utils/object";
import lessonStatus from "./scormMutateLessonStatus";
import initializeCMI from "./initializeCmi";
import getSCORMDataModel from "./getScormDataModel";
import { getCurrentTimeStampInSeconds, isDefined, CMIIndex } from "./utils/index";

function SCORMapi1_2(
  defaults,
  cmiobj,
  cmiint,
  scormdebugging,
  scormauto,
  scormid,
  objectId,
  attempt,
  autocommit,
  masteryOverride,
  hidetoc,
  oldCMI
) {
  let errorCode;
  let cmi;
  let timeStarted = null;
  let isInitialized = false;
  const dataModel = getSCORMDataModel(defaults);

  // SCORM 1.2 API
  function LMSInitialize(param) {
    if (oldCMI == "null") {
      cmi = initializeCMI({ model: dataModel[objectId] });
    } else {
      try {
        cmi = JSON.parse(oldCMI);
      } catch (error) {
        throw new Error("ParseError: param 'oldCMI' must be the string 'null' or a JSON object");
      }
    }

    // QUESTION: are these needed?
    // eval(cmiobj[scoid]);
    // eval(cmiint[scoid]);

    errorCode = "0";
    if (param !== "") {
      errorCode = "201";
      return "false";
    }

    if (!isInitialized) {
      isInitialized = true;
      errorCode = "0";
      timeStarted = getCurrentTimeStampInSeconds();
      return "true";
    }

    errorCode = "101";
    return "false";
  }

  // SCORM 1.2 API
  function LMSGetLastError() {
    return errorCode;
  }

  // SCORM 1.2 API
  // NOTE: does not appear to do much or meet spec:
  // LMSGetDiagnostic( errorCode : CMIErrorCode ) : string – Returns detailed information about the last error that occurred.
  // https://scorm.com/scorm-explained/technical-scorm/run-time/run-time-reference/#section-2
  function LMSGetDiagnostic(param) {
    return param === "" ? errorCode : param;
  }

  // SCORM 1.2 API
  function LMSFinish(param) {
    if (param !== "") {
      errorCode = "201";
      return "false";
    }

    if (!isInitialized) {
      errorCode = "301";
      return "false";
    }

    isInitialized = false;

    // mutate cmi (formerly StoreData)
    lessonStatus(cmi, dataModel[objectId]["cmi.core.lesson_status"].defaultvalue, masteryOverride);

    const dataList = collectData({ dataModel, objectId, data: cmi, parent: "cmi" });

    if (!cmi.core.total_time || !cmi.core.session_time) {
      throw new Error('Cannot calculate totalTime. "total_time" or "session_time" not present');
    }

    dataList.push(
      totalTime({
        totalTime: cmi.core.total_time,
        sessionTime: cmi.core.session_time,
        objectId
      })
    );

    const commitData = { timestarted: timeStarted, tracks: dataList };
    // console.log("commitData: ", commitData);
    onpostCommitDataToNative(scormid, objectId, attempt, commitData, cmi); // global

    setTimeout("mod_scorm_launch_prev_sco();", 500);
    // NOTE: the 'nav' object and 'event' property do not appear elsewhere in the codebase
    // and the previous nav logic unreachable
    // if (nav.event != "") {
    // if (nav.event == "continue") {
    // setTimeout("mod_scorm_launch_next_sco();", 500);
    // } else {
    // setTimeout("mod_scorm_launch_prev_sco();", 500);
    // }
    // } else {
    // if (scormauto == 1) {
    // setTimeout("mod_scorm_launch_next_sco();", 500);
    // }
    // }

    errorCode = "0";
    return "true";
  }

  // SCORM 1.2 API
  function LMSGetValue(pathString) {
    if (!isInitialized) {
      errorCode = "301";
      return "";
    }

    if (!pathString) {
      errorCode = "201";
      return "";
    }

    errorCode = "0";

    const genericPath = pathString.replace(CMIIndex, ".n.");
    const genericValue = dataModel[objectId][genericPath];
    if (isDefined(genericValue)) {
      if (genericValue.mod === "w") {
        errorCode = genericValue.readerror;
        return "";
      }

      // remove 'cmi' and give indices underscores
      const element = pathString
        .replace(CMIIndex, "._$1.")
        .split(".")
        .filter((_, i) => i !== 0);

      return get(cmi, element) || "";
    }

    // adjust errorCode for ede cases
    const modelPath = genericPath.split(".");
    const parentPath = modelPath.slice(0, modelPath.length - 1);
    const parentValue = dataModel[objectId][parentPath];

    const getChildrenAttempt = modelPath[modelPath.length - 1] === "_children";
    if (getChildrenAttempt) {
      // TODO actually check of datamodel parent supports _children
      errorCode = isDefined(parentValue) ? "202" : "201";
      return "";
    }

    const getCountAttempt = modelPath[modelPath.length - 1] === "_count";
    if (getCountAttempt) {
      // TODO actually check of datamodel parent supports _count
      errorCode = isDefined(parentValue) ? "203" : "201";
      return "";
    }

    errorCode = "201";
    return "";
  }

  // SCORM 1.2 API
  function LMSSetValue(pathString, value) {
    if (!isInitialized) {
      errorCode = "301";
      return "";
    }

    if (!pathString) {
      errorCode = "201";
      return "";
    }

    errorCode = "0";

    const genericPath = pathString.replace(CMIIndex, ".n.");

    const genericValue = dataModel[objectId][genericPath];
    if (isDefined(genericValue)) {
      // check write permissions
      if (genericValue.mod === "r") {
        errorCode = genericValue.writeerror;
        return "false";
      }

      // check data format
      const formatRe = new RegExp(genericValue.format);
      const matchesFormat = String(value).match(formatRe);
      if (!matchesFormat) {
        errorCode = genericValue.writeerror;
        return "false";
      }

      const path = pathString.split(".").slice(1);

      // ensure value has ancestor objects
      const ancestorPath = [];
      path.forEach((part) => {
        if (part.match(/\d/)) {
          // store under 'private' keys: _n
          ancestorPath.push(`_${part}`);
          const ancestor = get(cmi, ancestorPath);
          if (!ancestor) {
            const modelId = ancestorPath.filter((part) => !part.match(/\d/)).join(".");
            const Model = Models[modelId];
            const update = Model();
            set(cmi, ancestorPath, update);

            // update collectioncount
            const collectionPath = ancestorPath.slice(0, ancestorPath.length - 1);
            const countPath = collectionPath.concat(["_count"]);
            const count = get(cmi, countPath);
            set(cmi, countPath, count + 1);
          }
        } else {
          ancestorPath.push(part);
        }
      });

      // check that value falls within range specified in datamodel
      if (isDefined(genericValue.range)) {
        const range = genericValue.range.split("#").map(Number);
        const number = Number(value);
        if (!(number >= range[0] && number <= range[1])) {
          errorCode = genericValue.writeerror;
          return "false";
        }
      }

      // concatenate comments
      if (pathString === "cmi.comments") {
        cmi.comments = cmi.comments + value;
        return "true";
      }

      // finally update the specified value
      set(cmi, path, value);
      return "true";
    }
  }

  // SCORM 1.2 API
  function LMSCommit(param) {
    // NOTE original code referenced the SCORMapi1_2.timeout global
    // but this is unreachable in the mobile version

    if (!isInitialized) {
      errorCode = "301";
      return "false";
    }

    if (param !== "") {
      errorCode = "201";
      return "false";
    }

    const dataList = collectData({ dataModel, objectId, data: cmi, parent: "cmi" });
    const commitData = { timestarted: timeStarted, tracks: dataList };
    // console.log("commitData: ", commitData);
    onpostCommitDataToNative(scormid, objectId, attempt, commitData, cmi);
    return "true";
  }

  // SCORM 1.2 API
  function LMSGetErrorString(errorCode) {
    switch (errorCode) {
      case "0":
        return "No error";
      case "101":
        return "General exception";
      case "201":
        return "Invalid argument error";
      case "202":
        return "Element cannot have children";
      case "203":
        return "Element not an array - cannot have count";
      case "301":
        return "Not initialized";
      case "401":
        return "Not implemented error";
      case "402":
        return "Invalid set value, element is a keyword";
      case "403":
        return "Element is read only";
      case "404":
        return "Element is write only";
      case "405":
        return "Incorrect data type";
      default:
        return "No error string found!";
    }
  }

  function _getCMI() {
    return cmi;
  }

  function _setCMI(update) {
    cmi = update;
  }

  return {
    LMSInitialize,
    LMSGetValue,
    LMSSetValue,
    LMSCommit,
    LMSFinish,
    LMSGetLastError,
    LMSGetErrorString,
    LMSGetDiagnostic,
    _getCMI,
    _setCMI
  };
}

export default SCORMapi1_2;
