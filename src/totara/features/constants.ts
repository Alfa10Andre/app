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

import { deviceScreen } from "../lib/tools";

enum learningItemEnum {
  Course = "course",
  Program = "program",
  Certification = "certification",
  Playlist = "playlist",
  Resource = "engage_article"
}

enum completionTrack {
  trackingManual = "tracking_manual",
  trackingNone = "tracking_none",
  trackingAutomatic = "tracking_automatic"
}

enum completionStatus {
  incomplete = "incomplete",
  complete = "complete",
  completePass = "complete_pass",
  completeFail = "complete_fail",
  unknown = "unknown"
}

enum courseCriteria {
  selfComplete = "Self completion"
}

enum completionIconStateKey {
  notAvailable = "notAvailable",
  completed = "completed",
  autoIncomplete = "autoIncomplete",
  manualIncomplete = "manualIncomplete",
  completeFail = "completeFail"
}

enum viewHeight {
  learningItemCard = deviceScreen.height * 0.3
}

export { learningItemEnum, completionTrack, completionStatus, courseCriteria, completionIconStateKey, viewHeight };
