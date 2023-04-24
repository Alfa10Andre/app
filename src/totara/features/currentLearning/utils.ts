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

import { includes } from "lodash";
import { sortBy, isEmpty } from "lodash";
import { completionStates } from "./course/courseDetailsStyle";
import { completionTrack, completionStatus, completionIconStateKey, learningItemEnum } from "../constants";
import { translate } from "@totara/locale";
import moment from "moment";

const extractTargetId = (id) => {
  return includes(id, "_") ? id.split("_")[1] : id;
};

const sortByDueDateThenTypeThenFullName = (toBeSorted) => {
  const typesForSorting = {
    [learningItemEnum.Certification]: 1,
    [learningItemEnum.Program]: 2,
    [learningItemEnum.Course]: 3
  };

  const withItemTypeMapped = toBeSorted.map((x) => {
    return {
      ...x,
      itemTypeMapped: typesForSorting[x.itemtype]
    };
  });

  return sortBy(withItemTypeMapped, ["duedate", "itemTypeMapped", "fullname"]);
};

const completionAccessibility = {
  notAvailable: {
    label: translate("course.course_details.accessibility_activity_unavailable"),
    role: "none",
    state: { disabled: true }
  },
  manualCompletion: {
    label: translate("course.course_details.accessibility_manual_completion"),
    state: { checked: false },
    role: "checkbox"
  },
  autoCompletion: {
    role: "checkbox",
    label: translate("course.course_details.accessibility_auto_completion"),
    state: { checked: false, disabled: true }
  },
  completeFail: {
    label: translate("course.course_details.accessibility_failed"),
    role: "none"
  }
};

type GetCompletionStatusProp = {
  completion?: string;
  status?: string;
  available: boolean;
};

const getCompletionStatus = ({ available, completion, status }: GetCompletionStatusProp) => {
  const { notAvailable, autoCompletion, manualCompletion, completeFail } = completionAccessibility;
  if (!available) {
    return {
      stateObj: completionStates[completionIconStateKey.notAvailable],
      accessibility: notAvailable
    };
  }
  if (completion !== completionTrack.trackingNone) {
    let accessibility;
    let stateObj;
    if (status === completionStatus.completePass || status === completionStatus.complete) {
      accessibility = completion === completionTrack.trackingAutomatic ? autoCompletion : manualCompletion;

      accessibility.state = { ...accessibility.state, checked: true };
      stateObj = completionStates[completionIconStateKey.completed];
    }
    if (status === completionStatus.incomplete) {
      if (completion === completionTrack.trackingAutomatic) {
        accessibility = autoCompletion;
        stateObj = completionStates[completionIconStateKey.autoIncomplete];
      } else {
        accessibility = manualCompletion;
        stateObj = completionStates[completionIconStateKey.manualIncomplete];
      }
    }
    if (status === completionStatus.completeFail) {
      accessibility = completeFail;
      stateObj = completionStates[completionIconStateKey.completeFail];
    }
    return {
      stateObj,
      accessibility
    };
  }
};

const isInvalidDueDate = ({ dueDate, dueDateState }: { dueDate?: Date; dueDateState?: String }) => {
  return isEmpty(dueDate) || (isEmpty(dueDateState) && moment().diff(moment(dueDate)) > 0);
};

export {
  extractTargetId,
  sortByDueDateThenTypeThenFullName,
  getCompletionStatus,
  completionAccessibility,
  isInvalidDueDate
};
