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

import { LearningItem, DescriptionFormat } from "./LearningItem";

export interface CourseGroup {
  id: number;
  fullname?: string;
  shortname: string;
  duedate?: Date;
  duedateState?: string;
  summary?: string;
  summaryformat?: DescriptionFormat; // To-Do :- summaryformat should be camel-case, graphQL api query attribute need to be changed from back-end
  endnote?: string;
  availablefrom: Date;
  availableuntil?: Date;
  imageSrc?: string;
  completion: Completion;
  currentCourseSets: [[CourseSets]];
  countUnavailableSets: number;
  courseSetHeader: string;
}

export interface CourseSets {
  id: number;
  label: string;
  nextsetoperator: string;
  completionCriteria: [string];
  courses: [LearningItem];
}

export enum StatusKey {
  assigned = "assigned",
  completed = "completed",
  inProgress = "inprogress",
  expired = "expired"
}

export enum RenewalStatusKey {
  notDue = "notdue",
  dueForRenewal = "dueforrenewal",
  expired = "expired"
}

export interface Completion {
  id: number;
  statuskey: StatusKey;
  progress: number;
  renewalstatuskey?: RenewalStatusKey;
}
