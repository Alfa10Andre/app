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

const defaultMobileMeData = {
  user: {
    id: "61",
    firstname: "Tharaka",
    lastname: "Dushmantha",
    fullname: "Tharaka Dushmantha",
    lang: "en",
    email: "tharaka@totara.com",
    __typename: "core_user"
  },
  system: {
    wwwroot: "https://mobile.demo.totara.software/",
    apiurl: "https://mobile.demo.totara.software/totara/mobile/api.php",
    release: "13.4+ (Build: 20210126.00)",
    request_policy_agreement: false,
    request_user_consent: false,
    request_user_fields: false,
    password_change_required: false,
    view_own_profile: true,
    mobile_subplugins: [
      {
        pluginname: "currentlearning",
        version: "2021110500",
        __typename: "totara_mobile_subplugin"
      },
      {
        pluginname: "findlearning",
        version: "2021110500",
        __typename: "totara_mobile_subplugin"
      }
    ],
    __typename: "totara_mobile_system"
  },
  __typename: "totara_mobile_me"
};

const mobileMe = {
  default: { totara_mobile_me: () => ({ ...defaultMobileMeData }) }
};

module.exports = {
  mobileMe
};
