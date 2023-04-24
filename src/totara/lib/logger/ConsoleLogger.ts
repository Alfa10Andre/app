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

import { Logger } from "./Logger";

/**
 * ConsoleLogger is a basic logger that outputs into JS console
 */
class ConsoleLogger implements Logger {
  init() {}

  close() {}

  debug(message: string, ...others: any[]) {
    console.debug("[DEBUG]", message, others);
  }

  info(message: string, ...others: any[]) {
    console.info("[INFO]", message, others);
  }

  warn(message: string, ...others: any[]) {
    console.warn("[WARN]", message, others);
  }

  error(message: string, error: Error, ...others: any[]) {
    // eslint-disable-next-line no-undef
    if (__DEV__) {
      // its ok to ignore __DEV__ not defined on TS.  It is defined globally
      console.error("[ERROR]", message, error, others); // only blow up on development mode
    } else {
      console.log("[ERROR]", message, error, others);
    }
  }
}

export default new ConsoleLogger();
