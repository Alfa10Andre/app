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

const { startGraphQLServer } = require("../e2e/graphql/index");

const {
  defaultCoreId,
  defaultCoreDate,
  defaultString,
  defaultFloat,
  defaultLI
} = require("../e2e/graphql/mocks/scalars");

const { mobileMe } = require("../e2e/graphql/mocks/me");
const { lang } = require("../e2e/graphql/mocks/lang");
const { notifications } = require("../e2e/graphql/mocks/notifications");
const { currentLearning } = require("../e2e/graphql/mocks/currentLearning");
const { courseDetails } = require("../e2e/graphql/mocks/courseDetails");
const { scorm } = require("../e2e/graphql/mocks/scorm");
const { profile } = require("../e2e/graphql/mocks/profile");

const customMocks = {
  ...defaultCoreId,
  ...defaultCoreDate,
  ...defaultString,
  ...defaultFloat,
  ...defaultLI,

  Query: () => ({
    ...mobileMe.default,
    ...currentLearning.default,
    ...courseDetails.default,
    ...scorm.default,
    ...profile.default,
    ...lang.default,
    ...notifications.default
  })
};

async function start() {
  await startGraphQLServer(customMocks);
}

start();
