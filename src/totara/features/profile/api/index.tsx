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

import { gql } from "@apollo/client";
import { UserProfile } from "@totara/types";

export type QueryResult = {
  loading: boolean;
  data: UserProfile;
  error: Error;
};

const userOwnProfile = gql`
  query totara_mobile_user_own_profile {
    profile: core_user_own_profile {
      id
      username
      firstname
      surname: lastname
      email
      profileimage: profileimageurl
    }
  }
`;

export { userOwnProfile };
