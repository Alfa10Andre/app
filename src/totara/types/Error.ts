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

class NetworkError extends Error {}

class NetworkFailedError extends NetworkError {
  constructor(message = "Network failed Error") {
    super(message);
  }
}

class UnsupportedAuthFlow extends NetworkError {
  constructor(message = "UnsupportedAuthFlow") {
    super(message);
  }
}

export { NetworkError, NetworkFailedError, UnsupportedAuthFlow };
