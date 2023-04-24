/**
 * This file is part of Totara Enterprise Extensions.
 *
 * Copyright (C) 2020 onwards Totara Learning Solutions LTD
 *
 * Totara Enterprise Extensions is provided only to Totara
 * Learning Solutions LTD's customers and partners, pursuant to
 * the terms and conditions of a separate agreement with Totara
 * Learning Solutions LTD or its affiliate.
 *
 * If you do not have an agreement with Totara Learning Solutions
 * LTD, you may not access, use, modify, or distribute this software.
 * Please contact [licensing@totaralearning.com] for more information.
 */

import { TOKEN_SENT, UPDATE_COUNT, UPDATE_TOKEN } from "./constants";

const updateToken = (payload) => ({
  type: UPDATE_TOKEN,
  payload: payload
});

const tokenSent = (payload) => ({
  type: TOKEN_SENT,
  payload: payload
});

const updateCount = (payload) => ({
  type: UPDATE_COUNT,
  payload: payload
});

export { updateToken, tokenSent, updateCount };
