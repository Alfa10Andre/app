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
import { combineReducers } from "redux";
import notificationReducer from "./notification";
import resourceReducer from "./resource";
import sessionReducer from "./session";
import { PURGE } from "../actions/constants";

const appReducer = combineReducers({
  notificationReducer,
  resourceReducer,
  sessionReducer
});

const rootReducer = (state, action) => {
  if (action.type === PURGE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
