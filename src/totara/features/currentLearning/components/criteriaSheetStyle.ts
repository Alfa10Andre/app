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

import { StyleSheet } from "react-native";
import { margins, iconSizes, borderRadius, fontWeights } from "@totara/theme/constants";
import { TotaraTheme } from "@totara/theme/Theme";

const { marginL, marginS, margin2XL } = margins;
const { borderRadiusL, borderRadiusXS } = borderRadius;
const { colorOpacity70, textRegular, textSmall, colorAccent, colorNeutral8, textHeadline } = TotaraTheme;

const criteriaSheetStyle = StyleSheet.create({
  transparentView: {
    flex: 1,
    backgroundColor: colorOpacity70,
    justifyContent: "flex-end"
  },
  renderOuterViewWrap: {
    marginVertical: marginS
  },
  renderInnerViewWrap: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: marginL
  },
  criteriaText: {
    ...textRegular,
    alignSelf: "flex-start",
    color: TotaraTheme.colorNeutral8
  },
  requirementText: {
    marginTop: marginS,
    marginBottom: marginL,
    ...textSmall,
    opacity: 0.48,
    alignSelf: "flex-start",
    color: TotaraTheme.colorNeutral8
  },
  headerViewWrap: {
    backgroundColor: colorAccent,
    borderTopLeftRadius: borderRadiusL,
    borderTopRightRadius: borderRadiusL
  },
  headerCloseButtonWrap: {
    marginTop: marginS,
    height: iconSizes.sizeXL,
    width: iconSizes.sizeXL,
    alignItems: "center",
    justifyContent: "center"
  },
  headerInnerViewWrap: {
    flexDirection: "row",
    flex: 1
  },
  headerViewIndicatorWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: margin2XL,
    marginTop: marginS
  },
  indicatorWrap: {
    width: "20%",
    height: 5,
    opacity: 0.1,
    borderRadius: borderRadiusXS,
    backgroundColor: colorNeutral8,
    alignSelf: "center"
  },
  nameViewWrap: {
    alignSelf: "flex-start",
    ...textRegular,
    justifyContent: "center",
    color: TotaraTheme.colorNeutral8
  },
  container: {
    alignItems: "flex-start",
    margin: marginL
  },
  renderListWrap: {
    backgroundColor: colorAccent,
    marginBottom: "5%",
    height: "95%"
  },
  listHeader: {
    ...textHeadline,
    fontWeight: fontWeights.fontWeightBold,
    margin: marginL
  },
  listContent: {
    backgroundColor: colorAccent,
    height: "100%"
  },
  availableReasonTextWrap: {
    ...textRegular,
    alignSelf: "flex-start",
    color: colorNeutral8,
    backgroundColor: colorAccent,
    margin: marginL
  }
});

export default criteriaSheetStyle;
