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
import { ResourceState } from "@totara/types/Resource";

const downloadItemMockAdded = {
  id: "1",
  name: "Resource 1MB",
  state: ResourceState.Added,
  sizeInBytes: 1024 * 1024 //1MB
};

const downloadItemMockAddedWithKilo = {
  id: "2",
  name: "Resource 10KB",
  state: ResourceState.Added,
  sizeInBytes: 1024 * 10 //10KB
};

const downloadsOneItemMock = [downloadItemMockAdded];

const downloadsTwoItemsMock = [downloadItemMockAdded, downloadItemMockAddedWithKilo];

export { downloadItemMockAdded, downloadItemMockAddedWithKilo, downloadsOneItemMock, downloadsTwoItemsMock };
