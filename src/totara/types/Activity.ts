/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2019 onwards Totara Learning Solutions LTD
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

import { completionTrack, completionStatus } from "@totara/features/constants";
import { DescriptionFormat } from "./LearningItem";

export interface Activity {
  id: number;
  instanceid: number;
  name: string;
  modtype: string;
  viewurl?: string;
  completion?: completionTrack;
  completionstatus?: completionStatus;
  available: boolean;
  availablereason?: [string];
  description?: string;
  descriptionformat?: DescriptionFormat;
}

export interface ScormActivity extends Activity {
  modtype: "scorm";
  currentAttempt: number;
  maxAttempt: number;
  score: number;
  webEntryUrl?: string;
  isAvailable: boolean;
  offlineAttemptsAllowed: boolean;
  packageUrl: string;
  courseid: number;
}

export interface SeminarActivity extends Activity {
  modtype: "facetoface";
}

export interface ForumsActivity extends Activity {
  modtype: "forum";
}

export interface QuizActivity extends Activity {
  modtype: "quiz";
}

export interface AssignmentActivity extends Activity {
  modtype: "assign";
}

export type ActivityType = ScormActivity | SeminarActivity | ForumsActivity | QuizActivity | AssignmentActivity;
