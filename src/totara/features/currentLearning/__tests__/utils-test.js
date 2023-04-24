/**
 * This file is part of Totara Enterprise Extensions.
 *
 * Copyright (C) 2020 onwards Totara Learning Solutions LTD
 *
 * Totara Enterprise Extensions is provided only to Totara
 * Learning Solutions LTD's customers and partners, pursuant to
 * the terms and conditions of a separate agreement with Totara
 * Learning Solutions LTD or its affiliate.
 *
 * If you do not have an agreement with Totara Learning Solutions
 * LTD, you may not access, use, modify, or distribute this software.
 * Please contact [licensing@totaralearning.com] for more information.
 */

import { extractTargetId, getCompletionStatus, completionAccessibility, isInvalidDueDate } from "../utils";
import { completionStates } from "../course/courseDetailsStyle";
import { completionTrack, completionStatus } from "@totara/features/constants";
import moment from "moment";

describe("Utils", () => {
  it("Should extract targetId with character '_' provided", () => {
    const result = extractTargetId("course_81");
    expect(result).toBe("81");
  });

  it("Should extract targetId with no character '_' provided", () => {
    const result = extractTargetId("18");
    expect(result).toBe("18");
  });

  describe("getCompletionStatus", () => {
    it("Should return notAvailable status data for not available activity", () => {
      const result = getCompletionStatus({ available: false });
      expect(result).toMatchObject({
        stateObj: completionStates.notAvailable,
        accessibility: completionAccessibility.notAvailable
      });
    });

    it("Should return completion(auto/manual) status data for completed activity", () => {
      const resultAuto = getCompletionStatus({
        available: true,
        status: completionStatus.completePass,
        completion: completionTrack.trackingAutomatic
      });
      expect(resultAuto).toMatchObject({
        stateObj: completionStates.completed,
        accessibility: completionAccessibility.autoCompletion
      });
      const resultManual = getCompletionStatus({
        available: true,
        status: completionStatus.complete,
        completion: completionTrack.trackingManual
      });
      expect(resultManual).toMatchObject({
        stateObj: completionStates.completed,
        accessibility: completionAccessibility.manualCompletion
      });
    });

    it("Should return incomplete(auto/manual) status data for incomplete activity", () => {
      const resultAuto = getCompletionStatus({
        available: true,
        status: completionStatus.incomplete,
        completion: completionTrack.trackingAutomatic
      });
      expect(resultAuto).toEqual({
        stateObj: completionStates.autoIncomplete,
        accessibility: completionAccessibility.autoCompletion
      });
      const resultManual = getCompletionStatus({
        available: true,
        status: completionStatus.incomplete,
        completion: completionTrack.trackingManual
      });
      expect(resultManual).toMatchObject({
        stateObj: completionStates.manualIncomplete,
        accessibility: completionAccessibility.manualCompletion
      });
    });

    it("Should return failed status data for completion failed activity", () => {
      const result = getCompletionStatus({
        available: true,
        status: completionStatus.completeFail,
        completion: completionTrack.trackingAutomatic
      });
      expect(result).toMatchObject({
        stateObj: completionStates.completeFail,
        accessibility: completionAccessibility.completeFail
      });
    });
  });
  describe("isInvalidDueDate", () => {
    it("Should return true for invalid(past dueDate without dueDateStatus) duedate", () => {
      expect(isInvalidDueDate({})).toBeTruthy();
      expect(isInvalidDueDate({ dueDate: "1970-01-01T00:59:59+0100", dueDateState: null })).toBeTruthy();
    });
    it("Should return false for valid duedate", () => {
      expect(isInvalidDueDate({})).toBeTruthy();
      expect(isInvalidDueDate({ dueDate: "1990-01-01T00:59:59+0100", dueDateState: "danger" })).toBeFalsy();
      expect(isInvalidDueDate({ dueDate: moment(), dueDateState: null })).toBeFalsy();
    });
  });
});
