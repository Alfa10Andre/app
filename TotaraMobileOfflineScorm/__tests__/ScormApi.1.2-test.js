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

import SCORMAPI from "../ScormApi.1.2";
import getSCORMDatamodel from "../getScormDataModel";
import inititalizeCMI from "../initializeCmi";
import collectData from "../scormCollectData";
import lessonStatus from "../scormMutateLessonStatus";

test('LMSInitialize should return "true"', () => {
  const objectId = "theid";
  const defaults = { [objectId]: "mock" };
  const scormAPI = SCORMAPI(
    defaults,
    null, //cmiobj,
    null, //cmiint,
    null, //scormdebugging,
    null, //scormauto,
    null, // scormid,
    objectId,
    null, //attempt,
    null, //autocommit,
    null, //masteryoverride,
    null, //hidetoc,
    "null" //oldCMI
  );

  expect(scormAPI).toHaveProperty("LMSInitialize");
  const inititalized = scormAPI.LMSInitialize("");
  expect(inititalized).toBe("true");
});

test("LMSSetValue and LMSGetValue", () => {
  const objectId = "theid";
  const defaults = { [objectId]: "mock" };
  const scormAPI = SCORMAPI(
    defaults,
    null, //cmiobj,
    null, //cmiint,
    null, //scormdebugging,
    null, //scormauto,
    null, // scormid,
    objectId,
    null, //attempt,
    null, //autocommit,
    null, //masteryoverride,
    null, //hidetoc,
    "null" //oldCMI
  );

  // LMSInitialize
  scormAPI.LMSInitialize("");

  // data
  const response = "the response";
  const updateResponse = "new response";
  const anId = "an-id";
  const lessonLoction = "Mt Everest";

  // LMSSetValue
  const boolString = scormAPI.LMSSetValue("cmi.interactions.0.student_response", response);
  const cmi = scormAPI._getCMI();
  expect(boolString).toBe("true");
  expect(cmi).toHaveProperty("interactions.0.student_response", response);
  expect(cmi).toHaveProperty("interactions._count", 1);

  scormAPI.LMSSetValue("cmi.interactions.0.student_response", updateResponse);
  expect(cmi).toHaveProperty("interactions.0.student_response", updateResponse);
  expect(cmi).toHaveProperty("interactions._count", 1);

  scormAPI.LMSSetValue("cmi.interactions.0.objectives.0.id", anId);
  expect(cmi).toHaveProperty("interactions.0.objectives.0.id", anId);

  // value is within range
  const inRange = scormAPI.LMSSetValue("cmi.core.score.raw", "999");
  expect(inRange).toBe("false");

  // LMSGetValue
  scormAPI.LMSSetValue("cmi.core.lesson_location", lessonLoction);
  const val0 = scormAPI.LMSGetValue("cmi.core.lesson_location");
  expect(val0).toBe(lessonLoction);

  const val1 = scormAPI.LMSGetValue("cmi.interactions.0.student_response");
  expect(val1).toBe("");
  const readError = scormAPI.LMSGetLastError();
  expect(readError).toBe("404");

  const notFound = scormAPI.LMSGetValue("cmi.objectives.3.id");
  expect(notFound).toBe("");
  const errorCode = scormAPI.LMSGetLastError();
  expect(errorCode).toBe("0"); // ?
});

test("LMSCommit should call onpostCommitDataToNative", () => {
  global.setTimeout = jest.fn();
  global.onpostCommitDataToNative = jest.fn();
  const objectId = "theid";
  const defaults = { [objectId]: "mock" };
  const scormAPI = SCORMAPI(
    defaults,
    null, //cmiobj,
    null, //cmiint,
    null, //scormdebugging,
    null, //scormauto,
    null, // scormid,
    objectId,
    null, //attempt,
    null, //autocommit,
    null, //masteryoverride,
    null, //hidetoc,
    "null" //oldCMI
  );

  scormAPI.LMSInitialize("");

  const committed = scormAPI.LMSCommit("");
  expect(committed).toBe("true");
  expect(global.onpostCommitDataToNative).toHaveBeenCalled();
});

test("LMSGetLastError and LMSGetDiagnostic should return an errorcode", () => {
  const objectId = "theid";
  const defaults = { [objectId]: "mock" };
  const scormAPI = SCORMAPI(
    defaults,
    null, //cmiobj,
    null, //cmiint,
    null, //scormdebugging,
    null, //scormauto,
    null, // scormid,
    objectId,
    null, //attempt,
    null, //autocommit,
    null, //masteryoverride,
    null, //hidetoc,
    "null" //oldCMI
  );

  scormAPI.LMSInitialize("");
  const errorCode = scormAPI.LMSGetLastError();
  expect(errorCode).toBe("0");

  // NOTE: does not appear to do much or meet spec:
  // LMSGetDiagnostic( errorCode : CMIErrorCode ) : string – Returns detailed information about the last error that occurred.
  // https://scorm.com/scorm-explained/technical-scorm/run-time/run-time-reference/#section-2
  const detailedErrorMessage = scormAPI.LMSGetDiagnostic("0");
  expect(detailedErrorMessage).toBe("0");
});

test("LMSGetErrorString should return a descriptive error message", () => {
  const objectId = "theid";
  const defaults = { [objectId]: "mock" };
  const scormAPI = SCORMAPI(
    defaults,
    null, //cmiobj,
    null, //cmiint,
    null, //scormdebugging,
    null, //scormauto,
    null, // scormid,
    objectId,
    null, //attempt,
    null, //autocommit,
    null, //masteryoverride,
    null, //hidetoc,
    "null" //oldCMI
  );

  scormAPI.LMSInitialize("");
  const errorStr = scormAPI.LMSGetErrorString("201");
  expect(errorStr).toBe("Invalid argument error");
});

test("LMSFinish should call globals functions", () => {
  // SCORM globals
  global.setTimeout = jest.fn();
  global.onpostCommitDataToNative = jest.fn();

  // setup
  const objectId = "theid";
  const defaults = { [objectId]: "mock" };
  const scormAPI = SCORMAPI(
    defaults,
    null, //cmiobj,
    null, //cmiint,
    null, //scormdebugging,
    null, //scormauto,
    null, // scormid,
    objectId,
    null, //attempt,
    null, //autocommit,
    null, //masteryoverride,
    null, //hidetoc,
    "null" //oldCMI
  );

  scormAPI.LMSInitialize("");
  scormAPI.LMSSetValue("cmi.core.session_time", "01:00:00");

  // not writable through the API
  const cmi = scormAPI._getCMI();
  cmi.core.total_time = "05:00:00";

  const result = scormAPI.LMSFinish("");
  expect(result).toEqual("true");
  expect(global.setTimeout).toHaveBeenCalled();
  expect(global.onpostCommitDataToNative).toHaveBeenCalled();
});

// helpers
test("should generate a SCORM 1.2 dataModel", () => {
  const defaults = { data: "mock" };
  const dataModel = getSCORMDatamodel(defaults);
  expect(dataModel).toBeTruthy();
});

test("inititalizeCMI should inititalize an CMI object with defaultvalues populated", () => {
  const objectId = "theid";
  const defaults = { [objectId]: "mock" };
  const dataModel = getSCORMDatamodel(defaults);
  const cmi = inititalizeCMI(dataModel[objectId]);

  expect(cmi).toHaveProperty("interactions");
  expect(cmi).toHaveProperty("interactions._children");
  expect(cmi).toHaveProperty("interactions._count", "0");

  expect(cmi).toHaveProperty("core");
  expect(cmi).toHaveProperty("core.lesson_status", "not attempted");
  expect(cmi).toHaveProperty("core.score");
  expect(cmi).toHaveProperty("core.score._children", "raw,min,max");
});

test("collectData should create a dataList", () => {
  const objectId = "theid";
  const defaults = { [objectId]: "mock" };
  const dataModel = getSCORMDatamodel(defaults);
  const cmi = inititalizeCMI(dataModel[objectId]);

  const dataList = collectData({
    dataModel,
    objectId,
    data: cmi,
    parent: "cmi"
  });

  expect(dataList.length).toEqual(35);
});

test("lessonStatus should mutate the cmi", () => {
  const objectId = "theid";
  const defaults = { [objectId]: "mock" };
  const dataModel = getSCORMDatamodel(defaults);
  const cmi = inititalizeCMI(dataModel[objectId]);
  const masteryOverride = true;

  lessonStatus(cmi, dataModel[objectId]["cmi.core.lesson_status"].defaultvalue, masteryOverride);

  expect(cmi).toHaveProperty("core.lesson_status", "completed");
});
