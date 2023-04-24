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
import { render } from "@testing-library/react-native";

import ScormSummary, { showScormFeedback, onExitActivityAttempt } from "../ScormSummary";
import { Grade } from "@totara/types/Scorm";
import { useApolloClient } from "@apollo/client";
import * as storageUtils from "../storageUtils";
import * as tools from "@totara/lib/tools";

describe("ScormSummary", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render the error on summary", async () => {
    const { getByTestId } = render(<ScormSummary error={true} />);

    const loadingView = await getByTestId("summary_error");
    expect(loadingView.children[0]).toBeTruthy();
  });

  it("Should render the summary view if it is not loading or error", async () => {
    const { getByTestId } = render(<ScormSummary scormBundle={{ scorm: "scorm data" }} />);

    const summaryContainerView = await getByTestId("scorm_summary_container");
    expect(summaryContainerView.children[0]).toBeTruthy();
  });

  it("Should render the loading error on summary", async () => {
    const { getByTestId } = render(<ScormSummary loading={true} />);
    const summaryContainerView = await getByTestId("summary_loading");
    expect(summaryContainerView.children[0]).toBeTruthy();
  });
});

describe("showScormFeedback", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should call navigateTo function", () => {
    const navigateMock = jest.fn();
    const navigateToMock = jest.fn();

    showScormFeedback({
      gradeMethod: Grade.highest,
      showGrades: false,
      score: 9,
      completionScoreRequired: 8,
      navigate: navigateMock,
      navigateTo: navigateToMock
    });
    expect(navigateToMock).toHaveBeenCalled();
  });
});

describe("onExitActivityAttempt", () => {
  jest.spyOn(storageUtils, "retrieveAllData").mockReturnValue({ data: "mock data retrieveAllData" });

  jest.spyOn(storageUtils, "setCompletedScormAttempt").mockReturnValue({ data: "mock data setCompletedScormAttempt" });

  const saveInTheCacheMock = jest.fn();
  storageUtils.saveInTheCache = saveInTheCacheMock;

  const showConfirmationMock = jest.fn();
  tools.showConfirmation = showConfirmationMock;
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should call showConfirmation", () => {
    const setIsLoadingCurretStatusMock = jest.fn();
    const navigationMock = jest.fn(() => ({ navigate: jest.fn() }));
    const navigateToMock = jest.fn();
    const client = useApolloClient();
    onExitActivityAttempt({
      id: "18",
      attempt: 1,
      gradeMethod: Grade.highest,
      completionScoreRequired: 8,
      client,
      host: "host",
      apiKey: "apikey",
      setIsLoadingCurretStatus: setIsLoadingCurretStatusMock,
      navigation: navigationMock,
      isDownloaded: true,
      offlinePackageScoIdentifiers: ["sco_1", "sco_2"],
      navigateTo: navigateToMock
    });
    expect(showConfirmationMock).toHaveBeenCalled();
  });
});
