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

import { Activity } from "./Activity";
import { learningItemEnum } from "@totara/features/constants";

export enum DescriptionFormat {
  jsonEditor = "JSON_EDITOR",
  html = "HTML"
}

export interface Section {
  id: number;
  title: string;
  available: boolean;
  availableReason?: [string];
  summary: string;
  data?: [Activity];
  summaryformat: string;
}

export interface LearningItem {
  id: number;
  itemComponent: string;
  itemtype: learningItemEnum.Program | learningItemEnum.Course | learningItemEnum.Certification;
  shortname: string;
  fullname?: string;
  summary?: string;
  summaryFormat?: DescriptionFormat;
  duedateState?: string;
  urlView?: string;
  duedate?: Date;
  progress?: number;
  native: boolean;
  imageSrc: string;
}
