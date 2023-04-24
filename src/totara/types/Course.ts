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

import { Section, LearningItem } from "./LearningItem";
import { Completion } from "./Completion";
import { Criteria } from "./Criteria";

export interface CourseContentDetails {
  course: Course;
  native: boolean;
  imageSrc: string;
  gradeMax: number;
  gradeFinal: number;
}

export interface Course extends LearningItem {
  startDate?: Date;
  endDate?: Date;
  lang: string;
  image?: string;
  sections: [Section];
  criteriaAggregation: string;
  criteria?: [Criteria];
  showGrades: boolean;
  completionEnabled: boolean;
  completion: Completion;
  format: string;
  summaryformat: string;
}

export enum CourseFormat {
  demo = "demo",
  singleActivity = "singleactivity",
  social = "social",
  topics = "topics",
  weeks = "weeks"
}
