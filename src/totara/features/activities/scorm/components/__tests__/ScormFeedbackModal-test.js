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

import ScormFeedbackModal from "../ScormFeedbackModal";
import { Grade } from "@totara/types/Scorm";
import { SCORM_TEST_IDS } from "@totara/lib/testIds";
import { translate } from "@totara/locale";

const { ATTEMPT_FEEDBACK } = SCORM_TEST_IDS;

describe("ScormFeedbackModal", () => {
  it("Should render the feedback with the tick image because the score is not required", async () => {
    const navigation = {
      state: {
        params: {
          score: 10,
          showGrades: true,
          gradeMethod: Grade.objective,
          onClose: () => {}
        }
      }
    };
    const { getByTestId } = render(<ScormFeedbackModal navigation={navigation} />);
    const view = getByTestId(ATTEMPT_FEEDBACK);
    expect(view).toBeTruthy();
    const receivedScoreText = view.props.children.props.title;
    expect(receivedScoreText).toBe("");
  });

  it("Should render the feedback with the tick image because the showGrade is false", async () => {
    const navigation = {
      state: {
        params: {
          score: 10,
          showGrades: false,
          gradeMethod: Grade.highest,
          onClose: () => {}
        }
      }
    };
    const { getByTestId } = render(<ScormFeedbackModal navigation={navigation} />);
    const view = await getByTestId(ATTEMPT_FEEDBACK);
    expect(view).toBeTruthy();
    const receivedScoreText = view.props.children.props.title;
    expect(receivedScoreText).toBe("");
  });

  it("Should render the feedback with the marks with percentage because the score is required and grade method is not learning objective", async () => {
    const navigation = {
      state: {
        params: {
          score: 10,
          showGrades: true,
          gradeMethod: Grade.highest,
          onClose: () => {},
          completionScoreRequired: 1
        }
      }
    };
    const { getByTestId } = render(<ScormFeedbackModal navigation={navigation} />);
    const view = getByTestId(ATTEMPT_FEEDBACK);
    const receivedScoreText = view.props.children.props.title;
    const expectedScoreText = translate("scorm.feedback.grade_title", { score: "10%" });
    expect(receivedScoreText).toBe(expectedScoreText);
  });

  it("Should render the feedback with the marks without percentage because the score is required and grade method is learning objective", async () => {
    const navigation = {
      state: {
        params: {
          score: 10,
          showGrades: true,
          gradeMethod: Grade.objective,
          onClose: () => {},
          completionScoreRequired: 1
        }
      }
    };
    const { getByTestId } = render(<ScormFeedbackModal navigation={navigation} />);
    const view = getByTestId(ATTEMPT_FEEDBACK);
    const receivedScoreText = view.props.children.props.title;
    const expectedScoreText = translate("scorm.feedback.grade_title", { score: "10" });
    expect(receivedScoreText).toBe(expectedScoreText);
  });
});
