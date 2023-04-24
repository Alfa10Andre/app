/**
 * This file is part of Totara Enterprise Extensions.
 *
 * Copyright (C) 2021 onwards Totara Learning Solutions LTD
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

import { by, element } from "detox";
import { TAB_TEST_IDS, TEST_IDS, NAVIGATION_TEST_IDS, PROFILE_TEST_IDS } from "../../../lib/testIds";
import { defaultCoreId, defaultCoreDate, defaultString } from "../../../../../e2e/graphql/mocks/scalars";
import { startGraphQLServer, stopGraphQLServer } from "../../../../../e2e/graphql/index";
import { currentLearning } from "../../../../../e2e/graphql/mocks/currentLearning";
import { mobileMe } from "../../../../../e2e/graphql/mocks/me";
import { profile } from "../../../../../e2e/graphql/mocks/profile";
import { notifications } from "../../../../../e2e/graphql/mocks/notifications";
import { lang } from "../../../../../e2e/graphql/mocks/lang";
import { mockServerUrl, mockUsername, mockPassword } from "../../../../../e2e/graphql/config";

const customMocks = {
  ...defaultCoreId,
  ...defaultCoreDate,
  ...defaultString,

  Query: () => ({
    ...currentLearning.default,
    ...profile.default,
    ...mobileMe.default,
    ...notifications.default,
    ...lang.default
  })
};

describe("About test", () => {
  beforeAll(async () => {
    await startGraphQLServer(customMocks);
    await element(by.id(TEST_IDS.SITE_URL_INPUT)).clearText();
    await element(by.id(TEST_IDS.SITE_URL_INPUT)).typeText(mockServerUrl);
    await element(by.id(TEST_IDS.SUBMIT_URL)).tap();
    await element(by.id(TEST_IDS.USER_INPUT)).typeText(mockUsername);
    await element(by.id(TEST_IDS.USER_PW)).typeText(mockPassword);
    await element(by.id(TEST_IDS.LOGIN)).tap();
  });

  afterAll(async () => {
    await stopGraphQLServer();
  });

  it("should navigate user to the about screen", async () => {
    await element(by.id(TAB_TEST_IDS.PROFILE)).tap();
    await element(by.id(PROFILE_TEST_IDS.ABOUT)).tap();
    await element(by.id(NAVIGATION_TEST_IDS.BACK)).tap();
    await element(by.id(PROFILE_TEST_IDS.LOGOUT)).tap();
    //TODO: this is for selecting alert confirmation action button and it needs to check for the android
    await element(by.label("Cancel").and(by.type("_UIAlertControllerActionView"))).tap();
    await element(by.id(PROFILE_TEST_IDS.LOGOUT)).tap();
    await element(by.label("Yes").and(by.type("_UIAlertControllerActionView"))).tap();
  });
});
