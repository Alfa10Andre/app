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

import { ResourceState } from "./Resource";

export enum Grade {
  objective = "0", //= "Learning objects",
  highest = "1", // = "Highest grade",
  average = "2", // = "Average grade",
  sum = "3" // = "Sum grade"
}

export enum AttemptGrade {
  highest = "0", // = "Highest attempt",
  average = "1", // = "Average attempts",
  first = "2", // = "First attempt",
  last = "3" // = "Last completed attempt"
}

export enum Completion {
  none = 0, //"Do not indicate activity completion"
  manual, //"Learners can manually mark the activity as completed"
  conditional //"Show activity as complete when conditions are met"
}

export type Scorm = {
  id: string;
  courseid: string;
  name: string;
  description: string;
  attemptsCurrent: number;
  attemptsForceNew: boolean;
  attemptsLockFinal: boolean;
  launchUrl: string;
  repeatUrl: string;
  calculatedGrade: string;

  offlineAttemptsAllowed: boolean;
  offlinePackageScoIdentifiers: [string];
  packageUrl?: string;
  offlinePackageUrl?: string;
  offlinePackageContentHash?: string;

  attempts: [Attempt];
  timeclose: number;

  maxgrade: number;

  completion: number;
  completionview: boolean;
  completionusegrade: boolean;
  completionstatusrequired: [string];
  completionstatusallscos: boolean;
  completionexpected: number;
  newAttemptDefaults: string;

  //TODO: rename when backend finishes TL-26268
  grademethod: string; //grademethod
  whatgrade: string; //attemptGrade
  // timeOpen: number;
  timeopen: number;
  // completionScoreRequired: number;
  completionscorerequired: number;
  // maxAttempts: number;
  attemptsMax: number;
  showGrades: boolean;
};

export type ScormBundle = {
  scorm?: Scorm;
  scormPackage?: Package;
  offlineAttempts?: [Attempt];
  // lastsynced: number;
};

export type Sco = {
  id: string;
  organizationId: string;
  launchSrc: string;
};

export type Package = {
  path: string;
  scos?: [Sco];
  defaultSco?: Sco;
};

export type Attempt = {
  attempt: number;
  gradereported: number;
  timestarted?: string;
};

export type ScormActivityParams = {
  id: string;
  title?: string;
  downloadProgress?: number;
  downloadState?: ResourceState;
  onDownloadPress?: Function;
  backIcon?: string;
  backAction?: () => void;
};

export type GradeForAttemptProps = {
  attemptCmi: any;
  maxGrade: number;
  gradeMethod: Grade;
};

export type ScormPlayerProps = {
  entrysrc: string;
  def: any;
  obj: any;
  int: any;
  scormdebugging: boolean;
  scormauto: number;
  scormid: string;
  scoid: string;
  attempt: number;
  autocommit: boolean;
  masteryoverride: boolean;
  hidetoc: number;
};
