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

import { syncScormAttempt, syncServerWithScormAttempt, netInfoEffect } from "../AttemptSynchronizer";
import * as storageUtils from "../storageUtils";

describe("syncScormAttempt", () => {
  const retrieveAllDataSpy = jest.spyOn(storageUtils, "retrieveAllData");
  retrieveAllDataSpy.mockReturnValue("retrieveAllData data");

  const setCleanScormCommitSpy = jest.spyOn(storageUtils, "setCleanScormCommit");
  setCleanScormCommitSpy.mockReturnValue("new_data");

  const saveInTheCacheSpy = jest.spyOn(storageUtils, "setCleanScormCommit");
  saveInTheCacheSpy.mockReturnValue();

  const client = useApolloClient();

  const unSyncDataMock = [{ data: "first data" }, { data: "second data" }, { data: "third data" }];
  const syncDataMock = unSyncDataMock[0];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return unsynced with removing synced data from unsynced data, if saveAttempt return array contains all true", async () => {
    const saveAttemptMock = jest.fn(() =>
      Promise.resolve({
        data: { attempts: { attempts_accepted: [true, true] } }
      })
    );
    const result = await syncScormAttempt({
      syncData: syncDataMock,
      unSyncData: unSyncDataMock,
      client,
      saveAttempt: saveAttemptMock
    });
    const expectedResult = [...unSyncDataMock];
    expectedResult.shift();
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error, if saveAttempt returned array contains any false", async () => {
    const saveAttemptMock = jest.fn(() =>
      Promise.resolve({
        data: { attempts: { attempts_accepted: [true, false, true] } }
      })
    );
    try {
      await syncScormAttempt({
        syncData: syncDataMock,
        unSyncData: unSyncDataMock,
        client,
        saveAttempt: saveAttemptMock
      });
    } catch (error) {
      expect(error.message).toEqual("Data sync failed.");
    }
  });
});

describe("syncServerWithScormAttempt", () => {
  const scormIdMock = "18";
  const tracksMock = ["first data set", "second data set", "third data set"];
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return true, if saveAttempt return array contains all true", async () => {
    const saveAttemptMock = jest.fn(() =>
      Promise.resolve({
        data: { attempts: { attempts_accepted: [true, true, true] } }
      })
    );
    const result = await syncServerWithScormAttempt({
      scormId: scormIdMock,
      tracks: tracksMock,
      saveAttempt: saveAttemptMock
    });
    expect(result).toStrictEqual(true);
  });

  it("should return true, if saveAttempt returned array contains any false or empty/undefined array", async () => {
    let saveAttemptFailMock = jest.fn(() =>
      Promise.resolve({
        data: { attempts: { attempts_accepted: [true, false, true] } }
      })
    );
    let result = await syncServerWithScormAttempt({
      scormId: scormIdMock,
      tracks: tracksMock,
      saveAttempt: saveAttemptFailMock
    });
    expect(result).toStrictEqual(false);

    saveAttemptFailMock = jest.fn(() => Promise.resolve([]));
    result = await syncServerWithScormAttempt({
      scormId: scormIdMock,
      tracks: tracksMock,
      saveAttempt: saveAttemptFailMock
    });
    expect(result).toStrictEqual(false);

    saveAttemptFailMock = jest.fn(() => Promise.resolve());
    result = await syncServerWithScormAttempt({
      scormId: scormIdMock,
      tracks: tracksMock,
      saveAttempt: saveAttemptFailMock
    });
    expect(result).toStrictEqual(false);
  });
});

describe("netInfoEffect", () => {
  const unSyncDataMock = [{ data: "first data" }, { data: "second data" }, { data: "third data" }];
  const client = useApolloClient();
  const setUnsyncDataMock = jest.fn();

  const retrieveAllDataSpy = jest.spyOn(storageUtils, "retrieveAllData");
  retrieveAllDataSpy.mockReturnValue("retrieveAllData data");

  const setCleanScormCommitSpy = jest.spyOn(storageUtils, "setCleanScormCommit");
  setCleanScormCommitSpy.mockReturnValue("new_data");

  const saveInTheCacheSpy = jest.spyOn(storageUtils, "setCleanScormCommit");
  saveInTheCacheSpy.mockReturnValue();

  const getOfflineScormCommitsSpy = jest.spyOn(storageUtils, "getOfflineScormCommits");
  getOfflineScormCommitsSpy.mockReturnValue(unSyncDataMock);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call setUnsyncData with removing synced data, if unSyncData is available.", async () => {
    const saveAttemptMock = jest.fn(() =>
      Promise.resolve({
        data: { attempts: { attempts_accepted: [true, true, true] } }
      })
    );
    const updatedUnSyncDataMock = [...unSyncDataMock];
    updatedUnSyncDataMock.shift();

    const syncScormAttemptMock = jest.fn(() => Promise.resolve(updatedUnSyncDataMock));

    await netInfoEffect({
      type: "wifi",
      isInternetReachable: true,
      unSyncData: unSyncDataMock,
      client,
      saveAttempt: saveAttemptMock,
      setUnsyncData: setUnsyncDataMock,
      onSyncScormAttempt: syncScormAttemptMock
    })();

    expect(syncScormAttemptMock).toHaveBeenCalled();
    expect(setUnsyncDataMock).toHaveBeenCalledWith(updatedUnSyncDataMock);
  });

  it("should call setUnsyncData with result of getOfflineScormCommits, if unSyncData is not available.", () => {
    const saveAttemptMock = jest.fn(() =>
      Promise.resolve({
        data: { attempts: { attempts_accepted: [true, true, true] } }
      })
    );
    netInfoEffect({
      type: "wifi",
      isInternetReachable: true,
      client,
      saveAttempt: saveAttemptMock,
      setUnsyncData: setUnsyncDataMock
    })();
    expect(setUnsyncDataMock).toHaveBeenCalledWith(unSyncDataMock);
  });
});
