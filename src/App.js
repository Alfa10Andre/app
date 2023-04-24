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

import React from "react";
import { StatusBar, Platform, LogBox } from "react-native";
import { Root } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Sentry from "@sentry/react-native";

import { config } from "@totara/lib";
import RootContainer from "./totara/RootContainer";
import FontAwesome from "@totara/lib/fontAwesome";
import { PLATFORM_ANDROID } from "./totara/lib/constants";
import { store, persistor } from "./totara/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import Loading from "@totara/components/Loading";
import { ThemeProvider } from "./totara/theme";
import { OrientationLocker, PORTRAIT } from "react-native-orientation-locker";
// this check will make sure we only use sentry for production flavors
if (!__DEV__ && config.sentryUri) {
  Sentry.init({
    dsn: config.sentryUri,
    environment: "production",
    beforeBreadcrumb(breadcrumb) {
      if (breadcrumb.category === "xhr") {
        return null;
      }
      return breadcrumb;
    }
  });
}

if (Platform.OS === PLATFORM_ANDROID) {
  StatusBar.setBackgroundColor("rgba(0,0,0,0)");
  StatusBar.setBarStyle("dark-content");
  StatusBar.setTranslucent(true);
}

FontAwesome.init();
if (config.disableConsoleYellowBox){
  LogBox.ignoreAllLogs();
}
LogBox.ignoreLogs(['new NativeEventEmitter']);

const App: () => React$Node = () => {
  return (
    <SafeAreaProvider>
      <Root>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <OrientationLocker orientation={PORTRAIT} />
            <ThemeProvider>
              <RootContainer />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </Root>
    </SafeAreaProvider>
  );
};

export default App;
