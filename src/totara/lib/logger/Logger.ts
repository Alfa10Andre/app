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

/**
 * Logger an interface for logging systems used by the app.  There can be different implementations
 * of logging and it should be abstracted away from the other parts of the app
 */
export interface Logger {
  /**
   * Implementations that require initialization before logging can be used by the app should implement this
   * @param params
   */
  init: (params: any[]) => void;

  /**
   * Implementations that require cleanup, teardown during shutdown of the app should implement this
   * @param params
   */
  close: (params: any[]) => void;

  /**
   * Used for debugging level message
   */
  debug: (message: string, ...others: any[]) => void;

  /**
   * Used for info level message
   */
  info: (message: string, ...others: any[]) => void;

  /**
   * Used for warning level message
   */
  warn: (message: string, ...others: any[]) => void;

  /**
   * Used for error level message.  Do NOT use this for error handling
   * @param message
   * @param error - the Error being reported
   * @param others
   */
  error: (message: string, error: Error, ...others: any[]) => void;
}
