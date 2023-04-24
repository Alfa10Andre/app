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

import localConfig from "./config.local";
import ConsoleLogger from "./logger/ConsoleLogger";

const defaultConfig = {
  urlProtocol: "https",
  mobileApi: {
    persistentQuery: true
  },
  userAgent: "TotaraMobileApp",
  apiUri: (host: string) => `${host}/totara/mobile/api.php`,
  infoUri: (host: string) => `${host}/totara/mobile/site_info.php`,
  loginUri: (host: string) => `${host}/login/index.php`,
  findLearningUri: (host: string) => `${host}/totara/catalog/index.php`,
  deviceRegisterUri: (host: string) => `${host}/totara/mobile/device_register.php`,
  webViewUri: (host: string) => `${host}/totara/mobile/device_webview.php`,
  forgotPasswordUri: (host: string) => `${host}/login/forgot_password.php`,
  nativeLoginSetupUri: (host: string) => `${host}/totara/mobile/login_setup.php`,
  nativeLoginUri: (host: string) => `${host}/totara/mobile/login.php`,
  appLinkDomain: "https://mobile.totaralearning.com",
  deepLinkSchema: "totara://",
  minApiVersion: "2020100100",
  rootOfflineScormPlayer: "html",
  sentryUri: "",
  disableConsoleYellowBox: false,
  devOrgUrl: "" // Default organization url only used in dev mode.
};

export const internalConfig = {
  logger: ConsoleLogger
};

let config = { ...defaultConfig, ...localConfig };

export default config;
