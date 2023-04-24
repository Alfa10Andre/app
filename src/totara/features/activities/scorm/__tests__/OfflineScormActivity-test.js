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

import React from "react";
import * as redux from "react-redux";
import { render } from "@testing-library/react-native";
import { translate } from "@totara/locale";
import { useApolloClient } from "@apollo/client";

import OfflineScormActivity, {
  packageEffect,
  loadedScormEffect,
  stopServer,
  onPlayerMessageHandler
} from "../OfflineScormActivity";
import { SCORM_TEST_IDS } from "@totara/lib/testIds";
import * as utils from "../utils";
import * as storageUtils from "../storageUtils";
import { Grade } from "@totara/types/Scorm";
import { ScormLessonStatus } from "../constants";

describe("OfflineScormActivity", () => {
  const { NONE_EXIST_RESOURCE_ID, INVALID_SCORM_ID } = SCORM_TEST_IDS;
  const mockScormActivityNavigation = {
    attempt: 1,
    scoid: "1",
    backAction: jest.fn()
  };
  let useEffect;
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };
  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();
  });

  it("Should render TEXT general error for non existing scorm or scorm.id", async () => {
    const itemToBeTested = { ...mockScormActivityNavigation };
    const navigation = {
      state: {
        params: {
          ...itemToBeTested
        }
      }
    };
    const tree = <OfflineScormActivity navigation={navigation} />;
    const { getByTestId } = render(tree);
    const labelTitle = getByTestId(INVALID_SCORM_ID);
    expect(labelTitle.children[0]).toBe(translate("general.error_unknown"));
  });

  it("Should render TEXT general error for non downloaded scorm package.", async () => {
    const itemToBeTested = {
      ...mockScormActivityNavigation,
      scorm: { id: "10" }
    };

    const navigation = {
      state: {
        params: {
          ...itemToBeTested
        }
      }
    };
    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue([]);

    const tree = <OfflineScormActivity navigation={navigation} />;
    const { getByTestId } = render(tree);
    const labelTitleNo = await getByTestId(NONE_EXIST_RESOURCE_ID);
    expect(labelTitleNo.children[0]).toBe(translate("general.error_unknown"));
  });
});

describe("packageEffect", () => {
  const urlMock = "https://server.url";
  const scosMock = [{}];
  const scormMock = { id: "18", newAttemptDefaults: '{ "data": "mock" }' };
  const defaultScoMock = {};
  const setJsCodeMock = jest.fn();

  const utilsSpy = jest.spyOn(utils, "getScormPlayerInitialData");
  utilsSpy.mockReturnValue({ initialData: "mock intial data" });

  const storageUtilsSpy = jest.spyOn(storageUtils, "getScormAttemptData");
  storageUtilsSpy.mockReturnValue({ attmeptData: "mock attempt data" });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call setJsCode, if url and scos are availeble", () => {
    const client = useApolloClient();
    packageEffect({
      url: urlMock,
      scos: scosMock,
      scorm: scormMock,
      client,
      scoid: "scoid_1",
      defaultSco: defaultScoMock,
      setJsCode: setJsCodeMock
    })();
    expect(setJsCodeMock).toHaveBeenCalledTimes(1);
  });

  it("should not call setJsCode, if url or scos is unavaileble", () => {
    const client = useApolloClient();
    packageEffect({
      scos: scosMock,
      scorm: scormMock,
      client,
      scoid: "scoid_1",
      defaultSco: defaultScoMock,
      setJsCode: setJsCodeMock
    })();
    expect(setJsCodeMock).not.toHaveBeenCalled();

    packageEffect({
      url: urlMock,
      scorm: scormMock,
      client,
      scoid: "scoid_1",
      defaultSco: defaultScoMock,
      setJsCode: setJsCodeMock
    })();
    expect(setJsCodeMock).not.toHaveBeenCalled();

    packageEffect({
      scorm: scormMock,
      client,
      scoid: "scoid_1",
      defaultSco: defaultScoMock,
      setJsCode: setJsCodeMock
    })();
    expect(setJsCodeMock).not.toHaveBeenCalled();
  });
});

describe("loadedScormEffect", () => {
  const serverMock = "https://server.url";
  const scormPackageDataMock = { data: "package data" };
  const setUrlMock = jest.fn();
  const setScormPackageDataMock = jest.fn();
  const loadScormPackageDataReturnMock = Promise.resolve({
    data: "mock return loadScormPackageData"
  });
  const setupOfflineScormPlayerReturnMock = Promise.resolve("path://scormplayer/root");

  const setupOfflineScormPlayerSpy = jest.spyOn(utils, "setupOfflineScormPlayer");
  setupOfflineScormPlayerSpy.mockReturnValue(setupOfflineScormPlayerReturnMock);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call setScormPackageData, if loadScormPackageData promise resolved", async () => {
    const loadScormPackageDataSpy = jest.spyOn(utils, "loadScormPackageData");
    loadScormPackageDataSpy.mockReturnValue(loadScormPackageDataReturnMock);

    await loadedScormEffect({
      server: serverMock,
      setUrl: setUrlMock,
      scormPackageData: scormPackageDataMock,
      setScormPackageData: setScormPackageDataMock
    })();
    expect(setScormPackageDataMock).toHaveBeenCalled();
  });

  it("should not call setScormPackageData, if loadScormPackageData throws error", async () => {
    const loadScormPackageDataSpy = jest.spyOn(utils, "loadScormPackageData");
    loadScormPackageDataSpy.mockReturnValue(Promise.reject(new Error("load scorm error")));

    await loadedScormEffect({
      server: serverMock,
      setUrl: setUrlMock,
      scormPackageData: scormPackageDataMock,
      setScormPackageData: setScormPackageDataMock
    })();

    expect(setScormPackageDataMock).not.toHaveBeenCalled();
  });
});

describe("stopServer", () => {
  const setUrlMock = jest.fn();
  const stopMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call setUrl with undefined, after call stop function if server.current is defined.", () => {
    stopServer({ current: { stop: stopMock } }, setUrlMock);
    expect(stopMock).toHaveBeenCalled();
    expect(setUrlMock).toHaveBeenCalledWith(undefined);
  });
  it("should call setUrl with undefined, if server or server.current is undefined.", () => {
    stopServer({ current: undefined }, setUrlMock);
    expect(stopMock).not.toHaveBeenCalled();
    expect(setUrlMock).toHaveBeenCalledWith(undefined);

    stopServer(undefined, setUrlMock);
    expect(stopMock).not.toHaveBeenCalled();
    expect(setUrlMock).toHaveBeenCalledWith(undefined);
  });
});

describe("onPlayerMessageHandler", () => {
  const retrieveAllDataSpy = jest.spyOn(storageUtils, "retrieveAllData");
  retrieveAllDataSpy.mockReturnValue("retrieveAllData data");
  const setScormActivityDataMock = jest.fn();
  storageUtils.setScormActivityData = setScormActivityDataMock;

  const saveInTheCacheMock = jest.fn();
  storageUtils.saveInTheCache = saveInTheCacheMock;

  const client = useApolloClient();
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call saveInTheCach, if tmsevent = `SCORMCOMMIT` and result.cmi.core.lesson_status != `incomplete` of the messageData.", () => {
    const messageDataMock = {
      tmsevent: "SCORMCOMMIT",
      result: { cmi: { core: { lesson_status: ScormLessonStatus.passed } } }
    };
    onPlayerMessageHandler({
      client,
      maxGrade: 10,
      gradeMethod: Grade.highest
    })(messageDataMock);
    expect(saveInTheCacheMock).toHaveBeenCalled();
  });

  it("should not call saveInTheCach, if tmsevent != `SCORMCOMMIT` or result.cmi.core.lesson_status == `incomplete` of the messageData.", () => {
    let messageDataMock = {
      result: { cmi: { core: { lesson_status: ScormLessonStatus.passed } } }
    };
    onPlayerMessageHandler({
      client,
      maxGrade: 10,
      gradeMethod: Grade.highest
    })(messageDataMock);
    expect(saveInTheCacheMock).not.toHaveBeenCalled();

    messageDataMock = {
      tmsevent: "SCORMCOMMIT",
      result: { cmi: { core: { lesson_status: ScormLessonStatus.incomplete } } }
    };
    onPlayerMessageHandler({
      client,
      maxGrade: 10,
      gradeMethod: Grade.highest
    })(messageDataMock);
    expect(saveInTheCacheMock).not.toHaveBeenCalled();
  });
});
