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

import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock.js";
import "react-native-gesture-handler/jestSetup";
require("isomorphic-fetch");

global.console = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn()
};

jest.mock("@react-native-cookies/cookies", () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
    clearAll: jest.fn()
  };
});

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock("react-native-gesture-handler", () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn()
  };
});

jest.mock("reanimated-bottom-sheet", () => {
  return {
    snapPoints: jest.fn(),
    renderContent: jest.fn(),
    renderHeader: jest.fn()
  };
});

jest.mock("react-native-device-info", () => {
  return {
    getVersion: jest.fn(() => {
      return "UnknownVersion";
    }),
    getBuildNumber: jest.fn(() => {
      return "UnknownVersion";
    }),
    getUserAgent: jest.fn(() => {
      return "MockedUserAgent";
    })
  };
});

jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  useApolloClient: jest.fn(() => ({
    readQuery: jest.fn(() => {}),
    query: jest.fn(() => Promise.resolve({})),
    writeQuery: jest.fn()
  }))
}));

jest.mock("@react-native-community/netinfo", () => mockRNCNetInfo);

jest.mock("react-native-fs", () => ({
  mkdir: jest.fn(),
  moveFile: jest.fn(),
  copyFile: jest.fn(),
  pathForBundle: jest.fn(),
  pathForGroup: jest.fn(),
  getFSInfo: jest.fn(),
  getAllExternalFilesDirs: jest.fn(),
  unlink: jest.fn(),
  exists: jest.fn(),
  stopDownload: jest.fn(),
  resumeDownload: jest.fn(),
  isResumable: jest.fn(),
  stopUpload: jest.fn(),
  completeHandlerIOS: jest.fn(),
  readDir: jest.fn(),
  readDirAssets: jest.fn(),
  existsAssets: jest.fn(),
  readdir: jest.fn(),
  setReadable: jest.fn(),
  stat: jest.fn(),
  readFile: jest.fn(),
  read: jest.fn(),
  readFileAssets: jest.fn(),
  hash: jest.fn(),
  copyFileAssets: jest.fn(),
  copyFileAssetsIOS: jest.fn(),
  copyAssetsVideoIOS: jest.fn(),
  writeFile: jest.fn(),
  appendFile: jest.fn(),
  write: jest.fn(),
  downloadFile: jest.fn(),
  uploadFiles: jest.fn(),
  touch: jest.fn(),
  MainBundlePath: jest.fn(),
  CachesDirectoryPath: jest.fn(),
  DocumentDirectoryPath: jest.fn(),
  ExternalDirectoryPath: jest.fn(),
  ExternalStorageDirectoryPath: jest.fn(),
  TemporaryDirectoryPath: jest.fn(),
  LibraryDirectoryPath: jest.fn(),
  PicturesDirectoryPath: jest.fn()
}));

jest.mock("redux-persist", () => {
  const real = jest.requireActual("redux-persist");
  return {
    ...real,
    persistReducer: jest.fn().mockImplementation((config, reducers) => reducers)
  };
});

jest.mock("react-native-orientation-locker", () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    lockToPortrait: jest.fn(),
    lockToLandscapeLeft: jest.fn(),
    lockToLandscapeRight: jest.fn(),
    unlockAllOrientations: jest.fn()
  };
});

jest.mock("redux-persist-sensitive-storage", () => jest.fn());

jest.mock("@dr.pogodin/react-native-static-server", () => jest.fn());

jest.mock("@react-native-async-storage/async-storage", () => jest.fn());

jest.mock("react-native-zip-archive", () => ({
  unzip: jest.fn()
}));

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      navigate: jest.fn(),
      setOptions: jest.fn()
    }),
    useFocusEffect: jest.fn(),
    useRoute: jest.fn()
  };
});

jest.mock("react-native-safe-area-context", () => ({
  ...jest.requireActual("react-native-safe-area-context"),
  useSafeAreaInsets: () => ({ insets: null })
}));

jest.mock("@react-native-firebase/messaging", () => {
  return () => ({
    requestPermission: jest.fn(),
    getToken: jest.fn(),
    deleteToken: jest.fn()
  });
});

jest.mock("@codler/react-native-keyboard-aware-scroll-view", () => {
  return {
    KeyboardAwareScrollView: jest.fn().mockImplementation(({ children }) => children)
  };
});

/*jest.mock("react-native-localize", () => {
  return {
    findBestAvailableLanguage: jest.fn()
  };
});*/
