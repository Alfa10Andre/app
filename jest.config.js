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
const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  verbose: true,
  ...tsjPreset,
  preset: "react-native",
  transform: {
    ...tsjPreset.transform,
    "\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js"
  },
  globals: {
    "ts-jest": {
      babelConfig: true,
      diagnostics: {
        warnOnly: true
      }
    }
  },
  cacheDirectory: ".jest/cache",
  moduleNameMapper: {
    // ".+\\.(png)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png)$": "<rootDir>/src/__mocks__/fileMock.js",
    "@totara/(.*)": "<rootDir>/src/totara/$1",
    "@resources/(.*)": "<rootDir>/src/resources/$1"
  },
  testPathIgnorePatterns: ["e2e"],
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js", "<rootDir>/jest.setup.js"],
  collectCoverageFrom: ["src/totara/**/*.{js,jsx,ts,tsx}"],
  setupFilesAfterEnv: ["<rootDir>setup-tests.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation)"
  ]
};
