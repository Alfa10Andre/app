/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2021 onwards Totara Learning Solutions LTD
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

import { Session } from "@totara/types";
import { SETUP_HOST, INIT_SESSION, END_SESSION, SET_CORE} from "../actions/constants";

const initialState = {
  apiKey: undefined,
  host: undefined,
  user: undefined,
  siteInfo: undefined,
  core: undefined
} as Session;

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_SESSION: {
      return {
        ...state,
        apiKey: action.payload.apiKey,
        user: action.payload.user
      } as Session;
    }
    case SETUP_HOST: {
      return {
        ...state,
        host: action.payload.host,
        siteInfo: action.payload.siteInfo
      } as Session;
    }
    case SET_CORE:{
      return {
        ...state,
        core: action.payload
      } as Session;
    }
    case END_SESSION: {
      return {} as Session;
    }
    default: {
      return state;
    }
  }
};

export default sessionReducer;
