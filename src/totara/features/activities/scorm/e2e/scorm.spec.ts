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

import { by, element, waitFor } from "detox";
import { mockServerUrl, mockUsername, mockPassword } from "../../../../../../e2e/graphql/config";
import {
  TEST_IDS,
  CL_TEST_IDS,
  SCORM_TEST_IDS,
  NAVIGATION_TEST_IDS,
  RESOURCE_TEST_IDS,
  TAB_TEST_IDS,
  PROFILE_TEST_IDS
} from "../../../../lib/testIds";
import { startGraphQLServer, stopGraphQLServer } from "../../../../../../e2e/graphql/index";
import { defaultCoreId, defaultCoreDate, defaultString, defaultLI } from "../../../../../../e2e/graphql/mocks/scalars";
import { scorm } from "../../../../../../e2e/graphql/mocks/scorm";
import { currentLearning } from "../../../../../../e2e/graphql/mocks/currentLearning";
import { courseDetails } from "../../../../../../e2e/graphql/mocks/courseDetails";
import { mobileMe } from "../../../../../../e2e/graphql/mocks/me";
import { notifications } from "../../../../../../e2e/graphql/mocks/notifications";
import { lang } from "../../../../../../e2e/graphql/mocks/lang";

const customMocks = {
  ...defaultCoreId,
  ...defaultCoreDate,
  ...defaultString,
  ...defaultLI,

  Query: () => ({
    ...mobileMe.default,
    ...currentLearning.default,
    ...courseDetails.scorm,
    ...scorm.default,
    ...notifications.default,
    ...lang.default
  })
};
describe("Scorm test", () => {
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
    await element(by.id(TAB_TEST_IDS.PROFILE)).tap();
    await element(by.id(PROFILE_TEST_IDS.LOGOUT)).tap();
    await element(by.label("Yes").and(by.type("_UIAlertControllerActionView"))).tap();

    await stopGraphQLServer();
  });

  it("should navigate to the scorm summary screen and complete online work flow", async () => {
    const scormCourseTestId = `${CL_TEST_IDS.LEARNING_ITEM}1`;
    const sectionTestId = `${CL_TEST_IDS.ACTIVITY_SECTION}174`;
    const activityTestId = `${CL_TEST_IDS.ACTIVITY}462`;
    await waitFor(element(by.id(scormCourseTestId)))
      .toBeVisible()
      .whileElement(by.id(CL_TEST_IDS.CAROUSEL))
      .scroll(300, "right");
    await element(by.id(scormCourseTestId)).tap();
    await element(by.id(CL_TEST_IDS.TAB_2)).tap();
    await element(by.id(sectionTestId)).tap();
    await waitFor(element(by.id(activityTestId)))
      .toBeVisible()
      .whileElement(by.id(sectionTestId))
      .swipe("up", "slow", 0.5);
    await element(by.id(activityTestId)).tap();
    await element(by.id(SCORM_TEST_IDS.BUTTON_VIEW_ATTEMPTS)).tap();
    await element(by.id(NAVIGATION_TEST_IDS.BACK)).atIndex(1).tap();
    await element(by.id(SCORM_TEST_IDS.LAST_ATTEMPT)).tap();
    await element(by.id(NAVIGATION_TEST_IDS.BACK)).atIndex(1).tap();
    await element(by.label("Cancel").and(by.type("_UIAlertControllerActionView"))).tap();
    await element(by.id(NAVIGATION_TEST_IDS.BACK)).atIndex(1).tap();
    //TODO: this is for selecting alert confirmation action button and it needs to check for the android
    await element(by.label("Ok").and(by.type("_UIAlertControllerActionView"))).tap();
    await element(by.id(SCORM_TEST_IDS.NEW_ATTEMPT)).tap();
    await element(by.id(NAVIGATION_TEST_IDS.BACK)).atIndex(1).tap();
    //TODO: this is for selecting alert confirmation action button and it needs to check for the android
    await element(by.label("Cancel").and(by.type("_UIAlertControllerActionView"))).tap();
    await element(by.id(NAVIGATION_TEST_IDS.BACK)).atIndex(1).tap();
    //TODO: this is for selecting alert confirmation action button and it needs to check for the android
    await element(by.label("Ok").and(by.type("_UIAlertControllerActionView"))).tap();
    await element(by.id(NAVIGATION_TEST_IDS.BACK)).atIndex(0).tap();
  });

  it("should be able to follow full offline scorm activity flow", async () => {
    customMocks.Query = () => ({
      ...mobileMe.default,
      ...currentLearning.default,
      ...courseDetails.scorm,
      ...scorm.offline,
      ...notifications.default,
      ...lang.default
    });
    const activityTestId = `${CL_TEST_IDS.ACTIVITY}461`;
    await startGraphQLServer(customMocks);
    await element(by.id(activityTestId)).tap();
    await element(by.id(SCORM_TEST_IDS.DOWNLOAD)).tap();
    await waitFor(element(by.id(RESOURCE_TEST_IDS.DOWNLOADED)))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id(SCORM_TEST_IDS.NEW_ATTEMPT)).tap();

    await element(by.id(NAVIGATION_TEST_IDS.BACK)).atIndex(1).tap();
    //TODO: this is for selecting alert confirmation action button and it needs to check for the android
    await element(by.label("Cancel").and(by.type("_UIAlertControllerActionView"))).tap();
    await element(by.id(NAVIGATION_TEST_IDS.BACK)).atIndex(1).tap();
    //TODO: this is for selecting alert confirmation action button and it needs to check for the android
    await element(by.label("Ok").and(by.type("_UIAlertControllerActionView"))).tap();
    await element(by.id(SCORM_TEST_IDS.FEEDBACK_CLOSE)).tap();
    await element(by.id(NAVIGATION_TEST_IDS.BACK)).atIndex(0).tap();
  });
});
