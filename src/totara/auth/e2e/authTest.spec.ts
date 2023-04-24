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

import { by, element } from "detox";
import { PROFILE_TEST_IDS, TAB_TEST_IDS, TEST_IDS } from "../../lib/testIds";
import { startGraphQLServer, stopGraphQLServer } from "../../../../e2e/graphql/index";
import { mockServerUrl, mockUsername, mockPassword } from "../../../../e2e/graphql/config";
import { defaultCoreId, defaultCoreDate, defaultString } from "../../../../e2e/graphql/mocks/scalars";
import { mobileMe } from "../../../../e2e/graphql/mocks/me";

describe("User authentication", () => {
  beforeAll(async () => {
    const customMocks = {
      ...defaultCoreId,
      ...defaultCoreDate,
      ...defaultString,
      Query: () => ({
        ...mobileMe.default
      })
    };
    await startGraphQLServer(customMocks);
  });

  afterAll(async () => {
    await element(by.id(TAB_TEST_IDS.PROFILE)).tap();
    await element(by.id(PROFILE_TEST_IDS.LOGOUT)).tap();
    await element(by.label("Yes").and(by.type("_UIAlertControllerActionView"))).tap();
    await stopGraphQLServer();
  });

  it("should have organization url input and native login", async () => {
    await element(by.id(TEST_IDS.SITE_URL_INPUT)).clearText();
    await element(by.id(TEST_IDS.SITE_URL_INPUT)).typeText(mockServerUrl);
    await element(by.id(TEST_IDS.SUBMIT_URL)).tap();
    await element(by.id(TEST_IDS.USER_INPUT)).typeText(mockUsername);
    await element(by.id(TEST_IDS.USER_PW)).typeText(mockPassword);
    await element(by.id(TEST_IDS.LOGIN)).tap();
  });
});
