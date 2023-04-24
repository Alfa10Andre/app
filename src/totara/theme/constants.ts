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

import { Dimensions } from "react-native";
import { TotaraTheme } from "@totara/theme/Theme";

const textAttributes = {
  short_code_prefix: "0x"
};

const borderRadius = {
  borderRadiusXS: 4,
  borderRadiusS: 8,
  borderRadiusM: 10,
  borderRadiusL: 12,
  borderRadiusXL: 16
};

enum fontWeights {
  fontWeightRegular = "400",
  fontWeightNormal = "500",
  fontWeightSemiBold = "600",
  fontWeightBold = "700"
}

enum fontStyles {
  fontStyleItalic = "italic"
}

enum marksTypes {
  italic = "em",
  bold = "strong",
  link = "link"
}

const fontSizes = {
  fontSizeXS: 11,
  fontSizeS: 15,
  fontSizeM: 17,
  fontSizeL: 22,
  fontSizeXL: 32,
  fontSize2XL: 58,
  fontSize3XL: 68
};

const margins = {
  marginXS: 6,
  marginS: 8,
  marginM: 12,
  marginL: 16,
  marginXL: 24,
  margin2XL: 32,
  margin3XL: 48
};
const paddings = {
  paddingXS: 2,
  paddingS: 4,
  paddingM: 6,
  paddingL: 8,
  paddingXL: 16,
  padding2XL: 24,
  padding3XL: 32
};

const tabBar = {
  icon: {
    width: 24,
    height: 24
  }
};

const iconSizes = {
  sizeXS: 8,
  sizeS: 16,
  sizeM: 24,
  sizeL: 32,
  sizeXL: 40,
  sizeXXL: 48
};

// THESE VALUES WERE GENERATED USING THE FOLLOWING TOOL
// https://ethercreative.github.io/react-native-shadow-generator/
// PLEASE DON'T CHANGE IT BEFORE TALKING TO OTHER DEVELOPERS

const opacities = {
  opacityS: 0.2,
  opacityM: 0.5
};

const shadow = {
  android: {
    elevation: 6
  },
  ios: {
    shadowColor: TotaraTheme.colorNeutral7,
    shadowOpacity: opacities.opacityS,
    shadowRadius: borderRadius.borderRadiusM
  }
};

const header = {
  icon: {
    size: 24
  }
};

const row = {
  icon: {
    size: 40
  }
};

const modalSize = {
  width: Dimensions.get("window").width * 0.7,
  height: Dimensions.get("window").height * 0.7
};

const resultCircleSize = 185;
const resultWrapperScaleX = 2;

export {
  textAttributes,
  margins,
  paddings,
  fontSizes,
  fontWeights,
  borderRadius,
  tabBar,
  header,
  iconSizes,
  modalSize,
  resultCircleSize,
  resultWrapperScaleX,
  shadow,
  row,
  opacities,
  fontStyles,
  marksTypes,
};
