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

import { StyleSheet, Dimensions } from "react-native";
import { borderRadius, margins, paddings, shadow, fontWeights } from "@totara/theme/constants";
import { TotaraTheme } from "@totara/theme/Theme";

const overviewStyles = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal: paddings.paddingL
  },
  container: {
    ...shadow.ios,
    ...shadow.android,
    backgroundColor: TotaraTheme.colorNeutral1,
    borderRadius: borderRadius.borderRadiusM,
    marginVertical: margins.marginL,
    marginHorizontal: margins.marginXS
  },
  contentWrap: {
    borderRadius: borderRadius.borderRadiusM,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  innerViewWrap: {
    marginHorizontal: margins.marginL,
    alignContent: "center",
    justifyContent: "center"
  },
  carouselTextContainer: {
    justifyContent: "center",
    flexDirection: "column",
    marginVertical: margins.marginXL,
    marginHorizontal: margins.marginL,
    maxWidth: Dimensions.get("window").width * 0.6
  },
  gradeMaxTextWrap: {
    fontWeight: fontWeights.fontWeightNormal,
    alignSelf: "flex-end"
  },
  horizontalSeparator: {
    height: "60%",
    width: 0.5,
    alignSelf: "center",
    backgroundColor: TotaraTheme.colorNeutral5
  },
  summaryContainer: {
    marginLeft: margins.marginL,
    marginRight: margins.marginS,
    marginTop: margins.marginXL,
    paddingBottom: paddings.padding3XL
  },
  badgeContainer: {
    marginLeft: margins.margin2XL,
    marginBottom: margins.margin2XL
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: TotaraTheme.colorOpacity70
  },
  gradePrefixText: {
    ...TotaraTheme.textHeadline,
    fontWeight: fontWeights.fontWeightBold
  },
  labelWrap: {
    ...TotaraTheme.textRegular,
    textAlign: "center"
  }
});

export { overviewStyles };
