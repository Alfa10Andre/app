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

import { Dimensions } from "react-native";
import {
  SCREEN_WIDTH_LARGE,
  SCREEN_WIDTH_MEDIUM,
  SCREEN_WIDTH_SMALL,
  SCREEN_WIDTH_X_LARGE
} from "@totara/lib/constants";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const deviceSize = () => {
  if (SCREEN_WIDTH > 414) {
    return SCREEN_WIDTH_X_LARGE;
  }
  if (SCREEN_WIDTH > 375) {
    return SCREEN_WIDTH_LARGE;
  }
  if (SCREEN_WIDTH > 320) {
    return SCREEN_WIDTH_MEDIUM;
  } else {
    return SCREEN_WIDTH_SMALL;
  }
};

const resizeByScreenSize = (smallSize: number, mediumSize: number, largeSize: number, xLargeSize: number) => {
  switch (deviceSize()) {
    case SCREEN_WIDTH_SMALL:
      return smallSize;
    case SCREEN_WIDTH_MEDIUM:
      return mediumSize;
    case SCREEN_WIDTH_LARGE:
      return largeSize;
    case SCREEN_WIDTH_X_LARGE:
      return xLargeSize;
    default:
      return mediumSize;
  }
};

export { resizeByScreenSize };
