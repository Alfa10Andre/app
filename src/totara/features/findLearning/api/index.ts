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
import { gql } from "@apollo/client";

const queryFindLearning = gql`
  query mobile_findlearning_filter_catalog($pointer: Int, $filter_data: mobile_findlearning_filter_input!) {
    catalogPage: mobile_findlearning_filter_catalog(limit_from: $pointer, filter_data: $filter_data) {
      maxCount: max_count
      pointer: limit_from
      finalPage: final_records
      items {
        id
        itemid
        itemType: item_type
        title
        mobileImage: image_url
        summary(format: MOBILE)
        summaryFormat: summary_format
        __typename
      }
    }
  }
`;

const queryViewCatalog = gql`
  query mobile_findlearning_view_catalog($pointer: Int) {
    catalog_page: mobile_findlearning_view_catalog(limit_from: $pointer) {
      max_count
      pointer: limit_from
      final_page: final_records
      items {
        id
        itemid
        item_type
        title
        mobile_image: image_url
        description
        __typename
      }
    }
  }
`;

export { queryFindLearning, queryViewCatalog };
