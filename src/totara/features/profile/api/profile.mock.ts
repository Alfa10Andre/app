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
import { userOwnProfile } from "@totara/features/profile/api/index";
import { GraphQLError } from "graphql";

const fullProfile = {
  profile: {
    __typename: "core_user",
    email: "totara.user@totaralearning.com",
    firstname: "Totara",
    id: "999",
    profileimage: "theme/image.php/basis/core/",
    surname: "User",
    username: "totarau"
  }
}

const shortProfile = {
  profile: {
    __typename: "core_user",
    firstname: "Totara",
    surname: "User"
  }
}

const profileMock = [
  {
    request: {
      query: userOwnProfile
    },
    result: {
      data: fullProfile
    }
  }
];

const shortProfileMock = [
  {
    request: {
      query: userOwnProfile
    },
    result: {
      data: shortProfile
    }
  }
];

const profileMockError = [
  {
    request: {
      query: userOwnProfile
    },
    result: {
      errors: [new GraphQLError("Error!")]
    }
  }
];

export { profileMock, shortProfileMock, profileMockError };
