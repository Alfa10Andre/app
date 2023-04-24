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
import { config } from "@totara/lib";

const query = config.mobileApi.persistentQuery
  ? gql`
      query totara_mobile_current_learning {
        currentLearning: totara_mobile_current_learning {
          id
          itemtype
          itemcomponent
          shortname
          fullname
          summary: description(format: PLAIN)
          progress
          urlView: url_view
          duedate(format: ISO8601)
          duedateState: duedate_state
          native: mobile_coursecompat
          imageSrc: mobile_image
          summaryFormat: description_format
          __typename
        }
      }
    `
  : gql`
      query mobile_currentlearning_my_items {
        currentLearning: mobile_currentlearning_my_items {
          id
          itemtype
          itemcomponent
          shortname
          fullname
          summary: description(format: PLAIN)
          progress
          urlView: url_view
          duedate(format: ISO8601)
          duedateState: duedate_state
          native: mobile_coursecompat
          imageSrc: mobile_image
          summaryFormat: description_format
          __typename
        }
      }
    `;

export default query;
