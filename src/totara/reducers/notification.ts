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

import { TOKEN_SENT, UPDATE_COUNT, UPDATE_TOKEN } from "../actions/constants";

type notificationType = {
  token: string;
  tokenSent: boolean;
  count: number;
};

const initialState: notificationType = {
  token: "",
  tokenSent: false,
  count: 0
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN: {
      const { token } = action.payload;

      if (state.token === token) return state;

      return {
        ...state,
        token,
        tokenSent: false
      };
    }
    case TOKEN_SENT: {
      const { tokenSent } = action.payload;
      return {
        ...state,
        tokenSent
      };
    }
    case UPDATE_COUNT: {
      const { count } = action.payload;
      return {
        ...state,
        ...{ count: count }
      };
    }
    default: {
      return state;
    }
  }
};

export default notificationReducer;
