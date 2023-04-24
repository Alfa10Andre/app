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

import { FindLearningPage } from "@totara/types/FindLearning";

const formatPageData = ({
  pageData,
  previousPage
}: {
  pageData: FindLearningPage;
  previousPage?: FindLearningPage;
}) => {
  if (previousPage?.items) {
    if (pageData) {
      return { ...pageData, items: [...previousPage.items, ...pageData.items] } as FindLearningPage;
    }
    return { ...previousPage };
  }
  return { ...pageData } as FindLearningPage;
};

const onSearch = ({
  pointer,
  key,
  onSearchCallback
}: {
  pointer?: Number;
  key: String;
  onSearchCallback: Function;
}) => {
  if (pointer !== undefined) {
    onSearchCallback({
      variables: {
        pointer: pointer,
        filter_data: {
          catalog_fts: key
        }
      },
      notifyOnNetworkStatusChange: true
    });
  }
};

export { formatPageData, onSearch };
