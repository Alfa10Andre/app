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

import { useApolloClient } from "@apollo/client";

import {
  setScormActivityData,
  setCompletedScormAttempt,
  setCleanScormCommit,
  saveInTheCache,
  retrieveAllData,
  getOfflineLastActivityResult,
  getOfflineActivity,
  getOfflineScormCommits,
  getScormAttemptData
} from "../storageUtils";
import { Grade } from "@totara/types/Scorm";
import { ScormLessonStatus } from "../constants";
import { scormActivitiesRecordsQuery } from "../api";

const commitData = (completeValue = ScormLessonStatus.completed) => ({
  scormid: "18",
  attempt: "16",
  scoid: "item_1",
  commit: {
    timestarted: 1592950901,
    tracks: [
      {
        identifier: "item_1",
        element: "cmi.core.lesson_status",
        value: completeValue,
        timemodified: 1592950921
      },
      {
        identifier: "item_1",
        element: "cmi.suspend_data",
        value:
          '{"lang":"en","completion":"-1111111","questions":"","_isCourseComplete":true,"_isAssessmentPassed":false}',
        timemodified: 1592950921
      },
      {
        identifier: "item_1",
        element: "cmi.interactions_0.id",
        value: "5cd58e9cd35dedaa11771534",
        timemodified: 1592950921
      },
      {
        identifier: "item_1",
        element: "cmi.interactions_0.type",
        value: "matching",
        timemodified: 1592950921
      },
      {
        identifier: "item_1",
        element: "cmi.interactions_0.student_response",
        value: "1.2,2.1,3.1,4.1",
        timemodified: 1592950921
      },
      {
        identifier: "item_1",
        element: "cmi.interactions_0.result",
        value: "correct",
        timemodified: 1592950921
      },
      {
        identifier: "item_1",
        element: "cmi.interactions_0.time",
        value: "10:22:01",
        timemodified: 1592950921
      }
    ]
  },
  cmi: {
    core: {
      score: { _children: "raw,min,max", raw: "", max: "", min: "" },
      _children:
        "student_id,student_name,lesson_location,credit,lesson_status,entry,score,total_time,lesson_mode,exit,session_time",
      student_id: "kamala",
      student_name: "Tennakoon, Kamala",
      lesson_location: "",
      credit: "credit",
      lesson_status: completeValue,
      entry: "ab-initio",
      total_time: "00:00:00",
      lesson_mode: "normal",
      exit: "",
      session_time: "00:00:00"
    },
    objectives: { _children: "id,score,status", _count: "0" },
    student_data: {
      _children: "mastery_score,max_time_allowed,time_limit_action",
      mastery_score: "",
      max_time_allowed: "",
      time_limit_action: ""
    },
    student_preference: {
      _children: "audio,language,speed,text",
      audio: "0",
      language: "",
      speed: "0",
      text: "0"
    },
    interactions: {
      _children: "id,objectives,time,type,correct_responses,weighting,student_response,result,latency",
      _count: 1
    },
    evaluation: {
      comments: { _count: "0", _children: "content,location,time" }
    },
    _children: "core,suspend_data,launch_data,comments,objectives,student_data,student_preference,interactions",
    _version: "3.4",
    suspend_data:
      '{"lang":"en","completion":"-1111111","questions":"","_isCourseComplete":true,"_isAssessmentPassed":false}',
    launch_data: "",
    comments: "",
    comments_from_lms: "",
    interactions_0: {
      objectives: { _count: 0 },
      correct_responses: { _count: 0 },
      id: "5cd58e9cd35dedaa11771534",
      type: "matching",
      student_response: "1.2,2.1,3.1,4.1",
      result: "correct",
      time: "10:22:01"
    }
  }
});

describe("retrieveAllData", () => {
  it("should call `readQuery` and return non empty object for existing cache data and empty object for non existing cache.", () => {
    const existingDataMock = {
      scormBundles: {
        data: "mock_data"
      }
    };
    const client = useApolloClient();
    client.readQuery.mockImplementation(() => {
      return existingDataMock;
    });

    const result = retrieveAllData({ client });

    expect(client.readQuery).toBeCalled();
    expect(client.readQuery).not.toThrowError();
    expect(result).toMatchObject(existingDataMock.scormBundles);

    client.readQuery.mockImplementation(() => {
      throw new Error("no cache");
    });
    const nonExistingResult = retrieveAllData({ client });
    expect(client.readQuery).toBeCalled();
    expect(client.readQuery).toThrowError();
    expect(nonExistingResult).toMatchObject({});
  });
});

describe("saveInTheCache", () => {
  it("should call `writeQuery`for the cache data.", () => {
    const client = useApolloClient();
    const blankDataMock = {};
    saveInTheCache({ client, scormBundles: blankDataMock });
    expect(client.writeQuery).toBeCalledWith({
      query: scormActivitiesRecordsQuery,
      data: {
        scormBundles: blankDataMock
      }
    });
    const fullDataMock = {
      "1": {
        cmi: "data_cmi",
        commits: "data_commits",
        offlineAttempts: [{ attempt: 1, gradereported: 10 }]
      },
      completed_attempts: {
        "1": [1]
      }
    };
    saveInTheCache({ client, scormBundles: fullDataMock });
    expect(client.writeQuery).toBeCalledWith({
      query: scormActivitiesRecordsQuery,
      data: {
        scormBundles: fullDataMock
      }
    });
    saveInTheCache({ client, scormBundles: undefined });
    expect(client.writeQuery).toBeCalledWith({
      query: scormActivitiesRecordsQuery,
      data: {
        scormBundles: undefined
      }
    });
  });
});

describe("setScormActivityData", () => {
  const scormId = "18";
  const mockAttemptGrade = 10;
  const getGradeForAttemptMock = jest.fn(() => mockAttemptGrade);
  it("should return new formatted data non-existing cache.", () => {
    const { attempt, scoid, cmi, commit } = commitData();
    const expectedResult = {
      [scormId]: {
        cmi: {
          [attempt]: {
            [scoid]: cmi
          }
        },
        commits: {
          [attempt]: {
            [scoid]: commit
          }
        },
        offlineAttempts: [
          {
            attempt: attempt,
            gradereported: mockAttemptGrade
          }
        ]
      }
    };
    const receiedResult = setScormActivityData({
      scormBundles: {},
      data: commitData(),
      maxGrade: null,
      gradeMethod: Grade.highest,
      onGetGradeForAttempt: getGradeForAttemptMock
    });
    expect(receiedResult).toMatchObject(expectedResult);
  });
  it("should return new formatted data by merging with existing cache.", () => {
    const mockExistingScormBundle = {
      [scormId]: {
        cmi: {
          [attempt - 1]: {
            [scoid]: cmi
          }
        },
        commits: {
          [attempt - 1]: {
            [scoid]: commit
          }
        },
        offlineAttempts: [
          {
            attempt: attempt - 1,
            gradereported: "0"
          }
        ]
      }
    };
    const { attempt, scoid, cmi, commit } = commitData();
    const expectedResult = {
      [scormId]: {
        cmi: {
          [attempt]: {
            [scoid]: cmi
          },
          ...mockExistingScormBundle[scormId].cmi
        },
        commits: {
          [attempt]: {
            [scoid]: commit
          },
          ...mockExistingScormBundle[scormId].commits
        },
        offlineAttempts: mockExistingScormBundle[scormId].offlineAttempts.concat({
          attempt: attempt,
          gradereported: mockAttemptGrade
        })
      }
    };
    const receiedResult = setScormActivityData({
      scormBundles: mockExistingScormBundle,
      data: commitData(),
      maxGrade: null,
      gradeMethod: Grade.highest,
      onGetGradeForAttempt: getGradeForAttemptMock
    });
    expect(receiedResult).toMatchObject(expectedResult);
  });
});

describe("setCompletedScormAttempt", () => {
  const attempt = 3;
  const scormId = "10";
  const offlinePackageScoIdentifiers = ["sco1", "sco2"];
  const cacheDataMock = {
    [scormId]: {
      cmi: {
        [attempt]: {
          sco1: { data: "mock data" },
          sco2: { data: "mock data" }
        }
      }
    }
  };

  it("should return new cache data set with adding attempt to the `completed_attempts`, if there is no any cache for it.", () => {
    const expectedResultData = {
      completed_attempts: {
        [scormId]: [attempt]
      },
      ...cacheDataMock
    };
    const recievedResult = setCompletedScormAttempt({
      scormId,
      attempt,
      scormBundles: cacheDataMock,
      offlinePackageScoIdentifiers
    });
    expect(recievedResult).toMatchObject(expectedResultData);
  });

  it("should return updated cache data set for non existing attempt in the `completed_attempt` with adding it of the existing cache.", () => {
    const existingCompletedAttempts = [1, 2];

    const cacheWithCompletedAttemptsMock = {
      completed_attempts: {
        [scormId]: existingCompletedAttempts
      },
      ...cacheDataMock
    };
    const expectedResultData = {
      completed_attempts: {
        [scormId]: existingCompletedAttempts.concat(attempt)
      },
      ...cacheWithCompletedAttemptsMock
    };
    const recievedResult = setCompletedScormAttempt({
      scormId,
      attempt,
      scormBundles: cacheWithCompletedAttemptsMock
    });
    expect(recievedResult).toMatchObject(expectedResultData);
  });

  it("should return same data set, if attempt number already exist in the `completed_attempts` list of the cache.", () => {
    const existingCompletedAttempts = [1, 2, 3];
    const cacheWithCompletedAttemptsMock = {
      completed_attempts: {
        [scormId]: existingCompletedAttempts
      },
      ...cacheDataMock
    };
    const recievedResult = setCompletedScormAttempt({
      scormId,
      attempt,
      scormBundles: cacheWithCompletedAttemptsMock
    });
    expect(recievedResult).toMatchObject(cacheWithCompletedAttemptsMock);
  });
});

describe("getOfflineLastActivityResult", () => {
  it("should return last attempt result of the offlineAttempts if exist.", () => {
    const scormId = 10;
    const existingAttempts = [
      { attempt: 1, gradereported: 10 },
      { attempt: 2, gradereported: 20 },
      { attempt: 3, gradereported: 30 },
      { attempt: 4, gradereported: 40 }
    ];
    const existingDataMock = {
      [scormId]: {
        offlineAttempts: existingAttempts
      }
    };
    const retrieveAllDataMock = jest.fn(() => existingDataMock);
    const client = useApolloClient();
    const result = getOfflineLastActivityResult({
      client,
      scormId,
      onRetrieveAllData: retrieveAllDataMock
    });
    expect(result).toMatchObject({ attempt: 4, gradereported: 40 });
  });
  it("should return undefined, if rhere is no any offline attempts.", () => {
    const scormId = 10;

    const existingDataMock = {
      [scormId]: {
        offlineAttempts: []
      }
    };
    const retrieveAllDataMock = jest.fn(() => existingDataMock);
    const client = useApolloClient();
    const result = getOfflineLastActivityResult({
      client,
      scormId,
      onRetrieveAllData: retrieveAllDataMock
    });
    expect(result).toBeUndefined();
  });
});

describe("getOfflineActivity", () => {
  it("should return offline activities if exist.", () => {
    const scormId = 10;
    const existingAttempts = [
      { attempt: 1, gradereported: 10 },
      { attempt: 2, gradereported: 20 },
      { attempt: 3, gradereported: 30 },
      { attempt: 4, gradereported: 40 }
    ];
    const existingDataMock = {
      [scormId]: {
        offlineAttempts: existingAttempts
      }
    };
    const retrieveAllDataMock = jest.fn(() => existingDataMock);
    const client = useApolloClient();
    const result = getOfflineActivity({
      client,
      scormId,
      onRetrieveAllData: retrieveAllDataMock
    });
    expect(result).toMatchObject(existingDataMock[scormId].offlineAttempts);
  });
  it("should return undefined, if rhere is no any offline activities.", () => {
    const scormId = 10;

    const existingDataMock = {
      [scormId]: {
        offlineAttempts: []
      }
    };
    const retrieveAllDataMock = jest.fn(() => existingDataMock);
    const client = useApolloClient();
    const result = getOfflineActivity({
      client,
      scormId,
      onRetrieveAllData: retrieveAllDataMock
    });
    expect(result).toBeUndefined();
  });
});

describe("getOfflineScormCommits", () => {
  it("should return completed attemps commits for all scormIds if exist.", () => {
    const existingDataMock = {
      10: {
        commits: {
          1: {
            scoId1: { data: "data for attemppt 1 sco 1" },
            scoId2: { data: "data for attemppt 1 sco 2" }
          },

          2: {
            scoId1: { data: "data for attemppt 2 sco 1" },
            scoId2: { data: "data for attemppt 2 sco 2" }
          }
        }
      },
      11: {
        commits: {
          1: {
            scoId1: { data: "data for attemppt 1 sco 1" },
            scoId2: { data: "data for attemppt 1 sco 2" }
          },

          2: {
            scoId1: { data: "data for attemppt 2 sco 1" },
            scoId2: { data: "data for attemppt 2 sco 2" }
          }
        }
      },
      completed_attempts: {
        10: [1, 2],
        11: [2]
      }
    };
    const retrieveAllDataMock = jest.fn(() => existingDataMock);
    const client = useApolloClient();
    const result = getOfflineScormCommits({
      client,
      onRetrieveAllData: retrieveAllDataMock
    });
    const expectedData = [
      {
        scormId: "10",
        attempt: 1,
        tracks: [{ data: "data for attemppt 1 sco 1" }, { data: "data for attemppt 1 sco 2" }]
      },
      {
        scormId: "10",
        attempt: 2,
        tracks: [{ data: "data for attemppt 2 sco 1" }, { data: "data for attemppt 2 sco 2" }]
      },
      {
        scormId: "11",
        attempt: 2,
        tracks: [{ data: "data for attemppt 2 sco 1" }, { data: "data for attemppt 2 sco 2" }]
      }
    ];

    expect(result).toMatchObject(expectedData);
  });
  it("should NOT return any data if there is no any completed attemps.", () => {
    const scormId = "10";
    const existingDataMock = {
      [scormId]: {
        commits: {
          1: {
            scoId1: { data: "data for attemppt 1 sco 1" },
            scoId2: { data: "data for attemppt 1 sco 2" }
          },

          2: {
            scoId1: { data: "data for attemppt 2 sco 1" },
            scoId2: { data: "data for attemppt 2 sco 2" }
          }
        }
      }
    };
    const retrieveAllDataMock = jest.fn(() => existingDataMock);
    const client = useApolloClient();
    const result = getOfflineScormCommits({
      client,
      onRetrieveAllData: retrieveAllDataMock
    });
    expect(result).toBeUndefined();
  });
});
describe("setCleanScormCommit", () => {
  const firstAttempt = 3;
  const secondAttempt = 4;

  const scormId = "10";
  const existingScormBundles = {
    [scormId]: {
      commits: {
        [firstAttempt]: { data: "commit_mock" },
        [secondAttempt]: { data: "commit_mock" }
      },
      cmi: {
        [firstAttempt]: { data: "cmi_mock" },
        [secondAttempt]: { data: "commit_mock" }
      },
      offlineAttempts: [{ attempt: firstAttempt }, { attempt: secondAttempt }]
    },
    completed_attempts: {
      [scormId]: [firstAttempt, secondAttempt]
    }
  };
  it("should remove all cached data for scormId and attempt, then returns updated data.", () => {
    const attempt = firstAttempt;
    const expectingScormBundles = {
      [scormId]: {
        commits: {
          [secondAttempt]: existingScormBundles[scormId].commits[secondAttempt]
        },
        cmi: {
          [secondAttempt]: existingScormBundles[scormId].cmi[secondAttempt]
        },
        offlineAttempts: [{ attempt: secondAttempt }]
      },
      completed_attempts: {
        [scormId]: [secondAttempt]
      }
    };
    const recievedResult = setCleanScormCommit({
      scormBundles: existingScormBundles,
      scormId,
      attempt
    });
    expect(recievedResult).toMatchObject(expectingScormBundles);
  });
  it("should NOT remove any data if attempt is mismatch and return same data.", () => {
    const attempt = 5;
    const recievedResult = setCleanScormCommit({
      scormBundles: existingScormBundles,
      scormId,
      attempt
    });
    expect(recievedResult).toMatchObject(existingScormBundles);
  });
});

describe("getScormAttemptData", () => {
  it("should return cmi data for scormId and attempt, if records exist.", () => {
    const scormId = 10;
    const attempt = 2;
    const existingCmis = {
      [attempt - 1]: {
        data: `mock_data_${attempt - 1}`
      },
      [attempt]: {
        data: "mock_data"
      },
      [attempt + 1]: {
        data: `mock_data_${attempt + 1}`
      }
    };
    const existingDataMock = {
      [scormId]: {
        cmi: existingCmis
      }
    };
    const retrieveAllDataMock = jest.fn(() => existingDataMock);
    const client = useApolloClient();
    const result = getScormAttemptData({
      client,
      scormId,
      attempt,
      onRetrieveAllData: retrieveAllDataMock
    });
    expect(result).toMatchObject(existingDataMock[scormId].cmi[attempt]);
  });
  it("should return undefined, if rhere is no any offline attempts for the scormId.", () => {
    const scormId = 10;
    const attempt = 2;

    const existingDataMock = {
      [scormId]: {
        offlineAttempts: [],
        cmi: {}
      }
    };
    const retrieveAllDataMock = jest.fn(() => existingDataMock);
    const client = useApolloClient();
    const result = getScormAttemptData({
      client,
      scormId,
      attempt,
      onRetrieveAllData: retrieveAllDataMock
    });
    expect(result).toBeUndefined();
  });
});
