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

import * as RNFS from "react-native-fs";
import { Platform } from "react-native";
import { omit } from "lodash";

import {
  getDataForScormSummary,
  calculatedAttemptsGrade,
  getAttemptsGrade,
  getGradeForAttempt,
  getScormPlayerInitialData,
  setupOfflineScormPlayer,
  initializeScormWebplayer,
  isScormPlayerInitialized,
  getScormPackageData,
  loadScormPackageData
} from "../utils";
import { AttemptGrade, Grade } from "@totara/types/Scorm";
import { ScormLessonStatus, offlineScormServerRoot } from "../constants";
describe("scorm utilities", () => {
  //This is a mock. These fields are from API response
  const defaultData = {
    name: "Creating a dynamic audience",
    description: "Title",
    calculatedGrade: "10%",
    attempts: [
      {
        attempt: 1,
        timestarted: 1588040660,
        gradereported: 0
      }
    ],
    launchUrl: "https://path.to.launch.url",
    repeatUrl: "https://path.to.repeat.url",
    offlinePackageScoIdentifiers: ["Software_Simulation_SCO"],
    newAttemptDefaults: "default_data",
    grademethod: Grade.highest,
    whatgrade: AttemptGrade.highest
  };

  //This is a mock. These fields are from API response
  const scormBundle = {
    scorm: {
      id: "8",
      courseid: "30",
      scormtype: "local",
      reference: "Creating a dynamic audience.zip",
      intro: "",
      version: "SCORM_1.2",
      maxgrade: 100,
      maxattempt: null,
      forcecompleted: false,
      forcenewattempt: false,
      lastattemptlock: false,
      masteryoverride: false,
      displaycoursestructure: false,
      skipview: 2,
      nav: 1,
      navpositionleft: -100,
      navpositiontop: -100,
      auto: false,
      width: 100,
      height: 500,
      timeOpen: null,
      timeclose: null,
      displayactivityname: true,
      autocommit: false,
      allowmobileoffline: true,
      completion: 2,
      completionview: false,
      completionstatusrequired: 4,
      completionScoreRequired: null,
      completionstatusallscos: false,
      packageUrl: "https://path.to.package.url",
      attemptsCurrent: 1,
      offlinePackageUrl: "https://path.to.package.url",
      offlinePackageContentHash: "e99447a9fa5447cdcfffb2bdefdefbc15bdd0821",
      maxAttempts: null,
      attemptsForceNew: false,
      attemptsLockFinal: false,
      autoContinue: false,
      offlineAttemptsAllowed: true,
      ...defaultData
    }
  };

  describe("getDataForScormSummary", () => {
    const expectedDataForUndefined = {
      totalAttempt: 0,
      shouldAllowLastAttempt: false,
      shouldAllowNewAttempt: false
    };
    //For Offline
    it("returns correct object for valid `scormBundle` and default values for undefined on offline mode.", () => {
      const isDownloaded = true;
      expect(getDataForScormSummary(isDownloaded, undefined)).toEqual(expectedDataForUndefined);

      //TODO: rename - fix when backend finishes TL-26268
      const expectResultScormBundle = {
        ...omit(defaultData, ["grademethod", "whatgrade"]),
        totalAttempt: 1,
        shouldAllowLastAttempt: false,
        shouldAllowNewAttempt: true,
        gradeMethod: "1",
        attemptGrade: "0"
      };
      expect(getDataForScormSummary(isDownloaded, scormBundle)).toEqual(expectResultScormBundle);
    });

    it("returns incremented total attempts because there are a initial number of attempts done when offline", () => {
      const isDownloaded = true;
      const previousOfflineAttempt = {
        attempt: 2,
        gradereported: 0,
        timestarted: 1584040660
      };
      //TODO: rename - fix when backend finishes TL-26268
      const expectResultScormBundle = {
        ...omit(defaultData, ["grademethod", "whatgrade"]),
        totalAttempt: 2,
        shouldAllowLastAttempt: false,
        shouldAllowNewAttempt: true,
        calculatedGrade: "0%",
        attempts: [...defaultData.attempts, previousOfflineAttempt],
        gradeMethod: "1",
        attemptGrade: "0"
      };
      expect(
        getDataForScormSummary(isDownloaded, {
          ...scormBundle,
          offlineAttempts: [previousOfflineAttempt]
        })
      ).toEqual(expectResultScormBundle);
    });

    //For Online
    it("returns correct object for valid `scormBundle` for online mode", () => {
      const isDownloaded = false;
      expect(getDataForScormSummary(isDownloaded, undefined)).toEqual(expectedDataForUndefined);

      const expectResultScormBundle = {
        ...omit(defaultData, ["grademethod", "whatgrade"]),
        totalAttempt: 1,
        shouldAllowLastAttempt: true,
        shouldAllowNewAttempt: true,
        gradeMethod: "1",
        attemptGrade: "0"
      };
      expect(getDataForScormSummary(isDownloaded, scormBundle)).toEqual(expectResultScormBundle);
    });

    it(" should return zero total attempts because attempts current in `scormBundle` is undefined", () => {
      const isDownloaded = false;
      const expectResultScormBundle = {
        ...omit(defaultData, ["grademethod", "whatgrade"]),
        totalAttempt: 0,
        shouldAllowLastAttempt: false,
        shouldAllowNewAttempt: true,
        gradeMethod: "1",
        attemptGrade: "0"
      };
      expect(
        getDataForScormSummary(isDownloaded, {
          scorm: { ...scormBundle.scorm, attemptsCurrent: undefined }
        })
      ).toEqual(expectResultScormBundle);

      expect(
        getDataForScormSummary(isDownloaded, {
          scorm: { ...scormBundle.scorm, attemptsCurrent: null }
        })
      ).toEqual(expectResultScormBundle);
    });
  });

  describe("getAttemptsGrade", () => {
    it("return particular value for `attemptGrade` with non-empty `attemptsReport`.", () => {
      const attemptsReport = [
        {
          attempt: 1,
          gradereported: 60
        },
        {
          attempt: 2,
          gradereported: 40
        },
        {
          attempt: 3,
          gradereported: 70
        },
        {
          attempt: 4,
          gradereported: 50
        }
      ];
      expect(getAttemptsGrade(attemptsReport, AttemptGrade.highest, 10)).toEqual(70);
      expect(getAttemptsGrade(attemptsReport, AttemptGrade.average, 10)).toEqual(60);
      expect(getAttemptsGrade(attemptsReport, AttemptGrade.first, 10)).toEqual(60);
      expect(getAttemptsGrade(attemptsReport, AttemptGrade.last, 10)).toEqual(50);
    });

    it("return 0 for all `attemptGrade` with empty attemptsReport", () => {
      const attemptsReport = [];
      expect(getAttemptsGrade(attemptsReport, AttemptGrade.highest, 10)).toEqual(0);
      expect(getAttemptsGrade(attemptsReport, AttemptGrade.average, 10)).toEqual(0);
      expect(getAttemptsGrade(attemptsReport, AttemptGrade.first, 10)).toEqual(0);
      expect(getAttemptsGrade(attemptsReport, AttemptGrade.last, 10)).toEqual(0);
    });
  });
  describe("getGradeForAttempt", () => {
    it("return correct values for complete `attemptcmi`.", () => {
      const attemptCmi = eval({
        id1: {
          core: {
            score: {
              raw: 4
            },
            lesson_status: ScormLessonStatus.completed
          }
        },
        id2: {
          core: {
            score: {
              raw: 2
            },
            lesson_status: ScormLessonStatus.failed
          }
        },
        id3: {
          core: {
            score: {
              raw: 8
            },
            lesson_status: ScormLessonStatus.passed
          }
        }
      });
      expect(
        getGradeForAttempt({
          attemptCmi,
          maxGrade: 10,
          gradeMethod: Grade.objective
        })
      ).toEqual(2);
      expect(
        getGradeForAttempt({
          attemptCmi,
          maxGrade: 10,
          gradeMethod: Grade.highest
        })
      ).toEqual(80);
      expect(
        getGradeForAttempt({
          attemptCmi,
          maxGrade: 10,
          gradeMethod: Grade.average
        })
      ).toEqual(47);
      expect(
        getGradeForAttempt({
          attemptCmi,
          maxGrade: 10,
          gradeMethod: Grade.sum
        })
      ).toEqual(140);
    });

    it("should return correct for `grademethod` [objective] and 0 for [highest/average/sum], if `attemptcmi` has only lesson_status and no score.", () => {
      const blankAttemptCmi = eval({
        id1: {
          core: {
            lesson_status: ScormLessonStatus.completed
          }
        },
        id2: {
          core: {
            lesson_status: ScormLessonStatus.failed
          }
        },
        id3: {}
      });
      expect(
        getGradeForAttempt({
          attemptCmi: blankAttemptCmi,
          maxGrade: 10,
          gradeMethod: Grade.objective
        })
      ).toEqual(1);
      expect(
        getGradeForAttempt({
          attemptCmi: blankAttemptCmi,
          maxGrade: 10,
          gradeMethod: Grade.highest
        })
      ).toEqual(0);
      expect(
        getGradeForAttempt({
          attemptCmi: blankAttemptCmi,
          maxGrade: 10,
          gradeMethod: Grade.average
        })
      ).toEqual(0);
      expect(
        getGradeForAttempt({
          attemptCmi: blankAttemptCmi,
          maxGrade: 10,
          gradeMethod: Grade.sum
        })
      ).toEqual(0);
    });

    it("should return 0 for all the `grademethod`, if there is no any lesson_status or score in `attemptcmi`.", () => {
      const blankAttemptCmi = eval({
        id1: {
          core: {}
        },
        id2: {
          core: {}
        },
        id3: {}
      });
      expect(
        getGradeForAttempt({
          attemptCmi: blankAttemptCmi,
          maxGrade: 10,
          gradeMethod: Grade.objective
        })
      ).toEqual(0);
      expect(
        getGradeForAttempt({
          attemptCmi: blankAttemptCmi,
          maxGrade: 10,
          gradeMethod: Grade.highest
        })
      ).toEqual(0);
      expect(
        getGradeForAttempt({
          attemptCmi: blankAttemptCmi,
          maxGrade: 10,
          gradeMethod: Grade.average
        })
      ).toEqual(0);
      expect(
        getGradeForAttempt({
          attemptCmi: blankAttemptCmi,
          maxGrade: 10,
          gradeMethod: Grade.sum
        })
      ).toEqual(0);
    });
  });
  describe("calculatedAttemptsGrade", () => {
    it("return grade with appending `%` for the `gradeMethod` [highest, average, sum] else it should return grade.", () => {
      const attemptsOnlineReport = [
        {
          attempt: 1,
          gradereported: 60
        },
        {
          attempt: 2,
          gradereported: 40
        },
        {
          attempt: 3,
          gradereported: 60
        },
        {
          attempt: 4,
          gradereported: 50
        }
      ];
      const attemptsOfflineReport = [
        {
          attempt: 5,
          gradereported: 70
        },
        {
          attempt: 6,
          gradereported: 50
        }
      ];

      expect(
        calculatedAttemptsGrade(
          AttemptGrade.average,
          Grade.average,
          100,
          "40%",
          attemptsOnlineReport,
          attemptsOfflineReport
        )
      ).toEqual("55%");
      expect(
        calculatedAttemptsGrade(
          AttemptGrade.average,
          Grade.highest,
          100,
          "60%",
          attemptsOnlineReport,
          attemptsOfflineReport
        )
      ).toEqual("55%");
      expect(
        calculatedAttemptsGrade(
          AttemptGrade.average,
          Grade.sum,
          100,
          "40%",
          attemptsOnlineReport,
          attemptsOfflineReport
        )
      ).toEqual("55%");
      expect(
        calculatedAttemptsGrade(
          AttemptGrade.average,
          Grade.objective,
          100,
          "60",
          attemptsOnlineReport,
          attemptsOfflineReport
        )
      ).toEqual("55");

      expect(
        calculatedAttemptsGrade(
          AttemptGrade.highest,
          Grade.average,
          100,
          "40%",
          attemptsOnlineReport,
          attemptsOfflineReport
        )
      ).toEqual("70%");
      expect(
        calculatedAttemptsGrade(
          AttemptGrade.highest,
          Grade.objective,
          100,
          "40%",
          attemptsOnlineReport,
          attemptsOfflineReport
        )
      ).toEqual("70");

      expect(
        calculatedAttemptsGrade(
          AttemptGrade.first,
          Grade.highest,
          100,
          "60",
          attemptsOnlineReport,
          attemptsOfflineReport
        )
      ).toEqual("60%");
      expect(
        calculatedAttemptsGrade(
          AttemptGrade.first,
          Grade.objective,
          100,
          "60",
          attemptsOnlineReport,
          attemptsOfflineReport
        )
      ).toEqual("60");

      expect(
        calculatedAttemptsGrade(AttemptGrade.last, Grade.sum, 100, "40%", attemptsOnlineReport, attemptsOfflineReport)
      ).toEqual("50%");
      expect(
        calculatedAttemptsGrade(
          AttemptGrade.last,
          Grade.objective,
          100,
          "40",
          attemptsOnlineReport,
          attemptsOfflineReport
        )
      ).toEqual("50");

      expect(calculatedAttemptsGrade(AttemptGrade.average, Grade.objective, 100, "60", undefined, undefined)).toEqual(
        "60"
      );
      expect(calculatedAttemptsGrade(AttemptGrade.average, Grade.objective, 100, "60", null, null)).toEqual("60");
    });
  });

  describe("getScormPlayerInitialData", () => {
    it("should return initialize data for scomr player", () => {
      const scormId = "1";
      const attempt = 1;
      const scoId = "sco-1";
      const launchSrc = "sco-1/index.html";
      const scos = [
        { id: "sco-1", organizationId: "org-1", launchSrc: "sco-1/index.html" },
        { id: "sco-2", organizationId: "org-1", launchSrc: "sco-2/index.html" }
      ];
      const packageLocation = "path/packageName";
      const playerInitalData = {
        defaults: {
          "sco-1": "initial default data 1",
          "sco-2": "initial default data 2"
        },
        objectives: {
          "sco-1": "initial objective data 1",
          "sco-2": "initial objective data 2"
        },
        interactions: {
          "sco-1": "initial interaction data 1",
          "sco-2": "initial interaction data 2"
        }
      };
      const result = getScormPlayerInitialData({
        scormId,
        scos,
        scoId,
        attempt,
        packageLocation,
        playerInitalData,
        launchSrc
      });

      expect(result.entrysrc).toBe(`${packageLocation}/${launchSrc}`);
      expect(result.def).toMatchObject(playerInitalData.defaults);
      expect(result.obj).toMatchObject(playerInitalData.objectives);
      expect(result.int).toMatchObject(playerInitalData.interactions);
      expect(result.scormdebugging).toBeFalsy();
      expect(result.scormauto).toBe(0);
      expect(result.scormid).toBe(scormId);
      expect(result.scoid).toBe(scoId);
      expect(result.attempt).toBe(attempt);
      expect(result.autocommit).toBeFalsy();
      expect(result.masteryoverride).toBeTruthy();
      expect(result.hidetoc).toBe(1);
    });
  });

  describe("setupOfflineScormPlayer", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return server root path", async () => {
      const isScormPlayerInitializedMock = jest.fn(() => Promise.resolve(true));
      const onInitializeScormWebplayerMock = jest.fn(() => Promise.resolve(true));
      const result = await setupOfflineScormPlayer(isScormPlayerInitializedMock, onInitializeScormWebplayerMock);
      expect(result).toStrictEqual(offlineScormServerRoot);
    });

    it("should return server root path, scorm player is initialized", async () => {
      const isScormPlayerInitializedMock = jest.fn(() => Promise.resolve(false));
      const onInitializeScormWebplayerMock = jest.fn(() => Promise.resolve(true));
      const result = await setupOfflineScormPlayer(isScormPlayerInitializedMock, onInitializeScormWebplayerMock);
      expect(result).toStrictEqual(offlineScormServerRoot);
    });
  });

  describe("loadScormPackageData", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return package data, if data is already exists", async () => {
      const packageDataMock = {
        path: "path",
        scos: ["sco one", "sco two"],
        defaultSco: "sco_i"
      };
      const result = await loadScormPackageData(packageDataMock);
      expect(result).toMatchObject(packageDataMock);
    });

    it("should get package data using getScormPackageData and return package data, if package path is not available", async () => {
      const packageDataMock = {
        path: "path",
        scos: ["sco one", "sco two"]
      };
      const getScormPackageDataMock = jest.fn(() => Promise.resolve(packageDataMock));
      const result = await loadScormPackageData(packageDataMock, getScormPackageDataMock);
      expect(result).toMatchObject(packageDataMock);
    });

    it("should throw error, if package path is empty", async () => {
      let packageDataMock = { path: undefined };
      try {
        await loadScormPackageData(packageDataMock);
      } catch (e) {
        expect(e).toBe("Cannot find offline package data");
      }

      packageDataMock = undefined;
      try {
        await loadScormPackageData(packageDataMock);
      } catch (e) {
        expect(e).toBe("Cannot find offline package data");
      }

      packageDataMock = { path: "" };
      try {
        await loadScormPackageData(packageDataMock);
      } catch (e) {
        expect(e).toBe("Cannot find offline package data");
      }
    });
  });
});

describe("scorm player package handling", () => {
  const mockSourceDirContent = ["file1.html", "file2.js", "file3.html"];
  const errorMkDir = "Failed to create a new directory";
  const errorUnlink = "Failed to delete a file";
  const errorIsExistingFile = "Failed find the existing file";
  const errorReadingDir = "Failed to get content of the directory";
  const errorCoping = "Failed to copy the file";

  const mockVoidPromise = (isSuccess, error) =>
    isSuccess ? jest.fn(() => Promise.resolve()) : jest.fn(() => Promise.reject(new Error(error)));

  const mockReturnPromise = (isSuccess, data, error) =>
    isSuccess ? jest.fn(() => Promise.resolve(data)) : jest.fn(() => Promise.reject(new Error(error)));

  const setupDefaultConfigeMock = ({
    platformOS,
    sourceDirContent = mockSourceDirContent,
    isSuccessMkDir = true,
    isSuccessExists = true,
    isSuccessUnlink = true,
    isSuccessReadDir = true,
    isSuccessCopy = true
  }) => {
    Platform.OS = platformOS;
    RNFS.mkdir.mockImplementation(mockVoidPromise(isSuccessMkDir, errorMkDir));
    RNFS.unlink.mockImplementation(mockVoidPromise(isSuccessUnlink, errorUnlink));
    RNFS.exists.mockImplementation(mockReturnPromise(isSuccessExists, false, errorIsExistingFile));
    if (Platform.OS === "android") {
      RNFS.readDirAssets.mockImplementation(mockReturnPromise(isSuccessReadDir, sourceDirContent, errorReadingDir));
      RNFS.copyFileAssets.mockImplementation(mockVoidPromise(isSuccessCopy, errorCoping));
    } else {
      RNFS.readDir.mockImplementation(mockReturnPromise(isSuccessReadDir, sourceDirContent, errorReadingDir));
      RNFS.copyFile.mockImplementation(mockVoidPromise(isSuccessCopy, errorCoping));
    }
  };

  describe("initializeScormWebplayer", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return array of promises copy files in the directory.", async () => {
      setupDefaultConfigeMock({ platformOS: "android" });
      let result;
      result = await initializeScormWebplayer();
      expect(result.length).toBe(mockSourceDirContent.length);

      setupDefaultConfigeMock({ platformOS: "ios" });
      result = await initializeScormWebplayer();
      expect(result.length).toBe(mockSourceDirContent.length);
    });

    it("should throw an error for creating directory, if it fails.", async () => {
      setupDefaultConfigeMock({ platformOS: "android", isSuccessMkDir: false });
      try {
        await initializeScormWebplayer();
      } catch (e) {
        expect(e.message).toBe(errorMkDir);
      }

      setupDefaultConfigeMock({ platformOS: "ios", isSuccessMkDir: false });
      try {
        await initializeScormWebplayer();
      } catch (e) {
        expect(e.message).toBe(errorMkDir);
      }
    });

    it("should throw an error for reading content of directory, if it fails", async () => {
      setupDefaultConfigeMock({
        platformOS: "android",
        isSuccessReadDir: false
      });
      try {
        await initializeScormWebplayer();
      } catch (e) {
        expect(e.message).toBe(errorReadingDir);
      }

      setupDefaultConfigeMock({ platformOS: "ios", isSuccessReadDir: false });
      try {
        await initializeScormWebplayer();
      } catch (e) {
        expect(e.message).toBe(errorReadingDir);
      }
    });

    it("should throw an error for checking existing file, if it fails", async () => {
      setupDefaultConfigeMock({
        platformOS: "android",
        isSuccessExists: false
      });
      try {
        await initializeScormWebplayer();
      } catch (e) {
        expect(e.message).toBe(errorIsExistingFile);
      }

      setupDefaultConfigeMock({ platformOS: "ios", isSuccessExists: false });
      try {
        await initializeScormWebplayer();
      } catch (e) {
        expect(e.message).toBe(errorIsExistingFile);
      }
    });
    it("should throw an error for coping file, if it fails", async () => {
      setupDefaultConfigeMock({ platformOS: "android", isSuccessCopy: false });
      try {
        await initializeScormWebplayer();
      } catch (e) {
        expect(e.message).toBe(errorCoping);
      }

      setupDefaultConfigeMock({ platformOS: "ios", isSuccessCopy: false });
      try {
        await initializeScormWebplayer();
      } catch (e) {
        expect(e.message).toBe(errorCoping);
      }
    });

    it("should throw an error if source directory is empty", async () => {
      // For empty directory content
      setupDefaultConfigeMock({ platformOS: "android", sourceDirContent: [] });
      try {
        await initializeScormWebplayer();
      } catch (e) {
        expect(e.message).toBe("Cannot find any content in the location (html)");
      }

      setupDefaultConfigeMock({ platformOS: "ios", sourceDirContent: [] });
      try {
        await initializeScormWebplayer();
      } catch (e) {
        expect(e.message).toBe("Cannot find any content in the location (" + RNFS.MainBundlePath + "/html)");
      }
      // For null directory content
      setupDefaultConfigeMock({
        platformOS: "android",
        sourceDirContent: null
      });
      try {
        await initializeScormWebplayer();
      } catch (e) {
        expect(e.message).toBe("Cannot find any content in the location (html)");
      }

      setupDefaultConfigeMock({ platformOS: "ios", sourceDirContent: null });
      try {
        await initializeScormWebplayer();
      } catch (e) {
        expect(e.message).toBe("Cannot find any content in the location (" + RNFS.MainBundlePath + "/html)");
      }
    });

    it("should remove all existing files before copy, if there any existing files", async () => {
      setupDefaultConfigeMock({ platformOS: "android" });
      RNFS.exists.mockImplementation(jest.fn(() => Promise.resolve(true)));

      const resultAndroid = await initializeScormWebplayer();
      expect(RNFS.unlink).toHaveBeenCalledTimes(mockSourceDirContent.length);
      expect(resultAndroid.length).toBe(mockSourceDirContent.length);

      setupDefaultConfigeMock({ platformOS: "ios" });
      RNFS.exists.mockImplementation(jest.fn(() => Promise.resolve(true)));

      const resultIOS = await initializeScormWebplayer();
      expect(RNFS.unlink).toHaveBeenCalledTimes(mockSourceDirContent.length*2);
      expect(resultIOS.length).toBe(mockSourceDirContent.length);
    });
  });
  describe("isScormPlayerInitialized", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return false for none existing files in the offline scorm player directory.", async () => {
      setupDefaultConfigeMock({ platformOS: "android" });
      let result;
      result = await isScormPlayerInitialized();
      expect(result).toStrictEqual(false);

      setupDefaultConfigeMock({ platformOS: "ios" });
      result = await isScormPlayerInitialized();
      expect(result).toStrictEqual(false);
    });

    it("should return true if all files existing files in the offline scorm player directory.", async () => {
      setupDefaultConfigeMock({ platformOS: "android" });
      RNFS.exists.mockImplementation(jest.fn(() => Promise.resolve(true)));
      let result;
      result = await isScormPlayerInitialized();
      expect(result).toStrictEqual(true);

      setupDefaultConfigeMock({ platformOS: "ios" });
      RNFS.exists.mockImplementation(jest.fn(() => Promise.resolve(true)));
      result = await isScormPlayerInitialized();
      expect(result).toStrictEqual(true);
    });
    it("should throw an error if source directory is empty", async () => {
      setupDefaultConfigeMock({ platformOS: "android" });
      RNFS.readDirAssets.mockImplementation(jest.fn(() => Promise.resolve([])));
      try {
        await isScormPlayerInitialized();
      } catch (e) {
        expect(e.message).toStrictEqual("No package content found.");
      }

      setupDefaultConfigeMock({ platformOS: "ios" });
      RNFS.readDir.mockImplementation(jest.fn(() => Promise.resolve([])));
      try {
        await isScormPlayerInitialized();
      } catch (e) {
        expect(e.message).toStrictEqual("No package content found.");
      }
    });
  });
});

describe("downloaded scorm activity package processing", () => {
  const packagePath = "/packagePath";
  const firstOrg = {
    id: "item_1",
    launchSrc: "index_lms.html",
    organizationId: "adapt_scorm"
  };
  const secondOrg = {
    id: "second_item_1",
    launchSrc: "second_index_lms.html",
    organizationId: "second_adapt_scorm"
  };
  const xmlData = ({ defatultOrgId, nextOrg }) =>
    `<?xml version="1.0" encoding="UTF-8"?>
  <manifest identifier="adapt_manifest" version="1" xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2" xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
  <schema>ADL SCORM</schema>
  <schemaversion>1.2</schemaversion>
  <lom xmlns="http://www.imsglobal.org/xsd/imsmd_rootv1p2p1" xsi:schemaLocation="http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd">
    <general>
      <title>
        <langstring xml:lang="x-none"><![CDATA[C003_A015_12 Anatomy of a report]]></langstring>
      </title>
      <description>
        <langstring xml:lang="x-none"><![CDATA[]]></langstring>
       </description>
      </general>
    </lom>
  </metadata>
  <organizations ${defatultOrgId && `default="${defatultOrgId}"`}>
    <organization identifier="${firstOrg.organizationId}">
      <title><![CDATA[C003_A015_12 Anatomy of a report]]></title>
      <item identifier="${firstOrg.id}" isvisible="true" identifierref="res1">
        <title><![CDATA[C003_A015_12 Anatomy of a report]]></title>
      </item>
    </organization>
    ${
      nextOrg &&
      `<organization identifier="${nextOrg.organizationId}"> 
        <title><![CDATA[C003_A015_13 Anatomy of a report]]></title>
        <item identifier="${nextOrg.id}" isvisible="true" identifierref="second_res1">
          <title><![CDATA[C003_A015_13 Anatomy of a report]]></title>
        </item>
      </organization>`
    }
    
  </organizations>
  <resources>
    <resource identifier="res1" type="webcontent" href="${firstOrg.launchSrc}" adlcp:scormtype="sco">
     <file href="${firstOrg.launchSrc}"/>
    </resource>
    ${
      nextOrg &&
      `<resource identifier="second_res1" type="webcontent" href="${nextOrg.launchSrc}" adlcp:scormtype="sco">
        <file href="${nextOrg.launchSrc}"/>
      </resource>
    `
    }  </resources>
  </manifest>`;
  const expectedData = ({ nextOrg = undefined }) => {
    if (nextOrg) {
      return { defaultSco: firstOrg, scos: [firstOrg, secondOrg] };
    }
    return { defaultSco: firstOrg, scos: [firstOrg] };
  };
  const imsManifestPath = packagePath + "/imsmanifest.xml";

  describe("getScormPackageData", () => {
    it("should return correct object for valid manifest xml content", async () => {
      const configInput = {
        nextOrg: secondOrg,
        defatultOrgId: firstOrg.organizationId
      };
      RNFS.readFile.mockImplementation(() => {
        return Promise.resolve(xmlData(configInput));
      });
      const result = await getScormPackageData(packagePath);
      expect(RNFS.readFile).toHaveBeenCalledWith(imsManifestPath);
      expect(result).toMatchObject(expectedData(configInput));
    });

    it("should not return any data for invalid manifest xml content", async () => {
      RNFS.readFile.mockImplementation(() => {
        return Promise.resolve("");
      });
      const resultBlank = await getScormPackageData(packagePath);
      expect(RNFS.readFile).toHaveBeenCalledWith(imsManifestPath);
      expect(resultBlank).toBeUndefined();

      RNFS.readFile.mockImplementation(() => {
        return Promise.resolve();
      });
      const resultUndefined = await getScormPackageData(packagePath);
      expect(RNFS.readFile).toHaveBeenCalledWith(imsManifestPath);
      expect(resultUndefined).toBeUndefined();
    });

    it("should throw an error for file read error", async () => {
      const errorMessage = "This is xml read error";
      RNFS.readFile.mockImplementation(() => {
        return Promise.reject(errorMessage);
      });
      try {
        getScormPackageData(packagePath);
      } catch (e) {
        expect(e).toBe(errorMessage);
      }
    });

    it("should return correct object for valid manifest xml content without default organization", async () => {
      const configInput = {
        nextOrg: secondOrg
      };
      RNFS.readFile.mockImplementation(() => {
        return Promise.resolve(xmlData(configInput));
      });
      const result = await getScormPackageData(packagePath);
      expect(RNFS.readFile).toHaveBeenCalledWith(imsManifestPath);
      expect(result).toMatchObject(expectedData(configInput));
    });

    it("should return single sco for valid manifest xml content with one orgainzation in the organizations without default organization", async () => {
      const configInput = {};
      RNFS.readFile.mockImplementation(() => {
        return Promise.resolve(xmlData(configInput));
      });
      const result = await getScormPackageData(packagePath);
      expect(RNFS.readFile).toHaveBeenCalledWith(imsManifestPath);
      expect(result).toMatchObject(expectedData(configInput));
    });
  });
});
