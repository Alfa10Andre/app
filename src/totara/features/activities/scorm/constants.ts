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

import * as RNFS from "react-native-fs";
import { config } from "@totara/lib";

const DOWNLOAD_FOLDER = `${RNFS.DocumentDirectoryPath}`;

const FILE_EXTENSION = ".zip";
const OFFLINE_SCORM_PREFIX = "OfflineSCORM_";
const scormZipPackagePath = DOWNLOAD_FOLDER;
const offlineScormServerRoot = `${scormZipPackagePath}/${config.rootOfflineScormPlayer}`;

enum ScormLessonStatus {
  incomplete = "incomplete",
  passed = "passed",
  completed = "completed",
  failed = "failed"
}

export { FILE_EXTENSION, OFFLINE_SCORM_PREFIX, offlineScormServerRoot, scormZipPackagePath, ScormLessonStatus };
