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
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import createSensitiveStorage from "redux-persist-sensitive-storage";
import rootReducer, { RootState } from "./reducers";

const storage = createSensitiveStorage({
  keychainService: "myKeychain",
  sharedPreferencesName: "mySharedPrefs"
});

const persistConfig = {
  // Root
  key: "root",
  storage,
  whitelist: ["sessionReducer", "resourceReducer", "notificationReducer"]
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const createMiddleware = (logger: boolean) => {
  if (logger) return applyMiddleware(createLogger({ collapsed: true, level: "info" }));
  else applyMiddleware();
};

// eslint-disable-next-line no-undef
const store = createStore(persistedReducer, createMiddleware(__DEV__));
const persistor = persistStore(store);
export { store, persistor };
