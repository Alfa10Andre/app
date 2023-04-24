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

import { queryFindLearning } from "./index";

const catalogPageMock = (noOfItems) => ({
  catalogPage: {
    maxCount: noOfItems,
    pointer: 0,
    finalPage: false,
    items: Array.from(Array(noOfItems)).map((_, i) => ({
      id: i,
      itemid: i,
      itemType: "course",
      title: "Advanced explicit",
      mobileImage:
        "http://mobilefindlearning.sb.wlg.totaralms.com/theme/image.php/ventura/core/1627611234/course_defaultimage?preview=totara_catalog_medium&amp;theme=ventura",
      summary: "",
      summaryFormat: "HTML",
      __typename: "mobile_findlearning_catalog_item"
    }))
  }
});
const searchResult = ({ key, noOfItems = 20 }) => [
  {
    request: {
      query: queryFindLearning,
      variables: {
        pointer: 0,
        filter_data: {
          catalog_fts: key
        }
      }
    },
    result: {
      data: { ...catalogPageMock(noOfItems) }
    }
  }
];
export { catalogPageMock, searchResult };
