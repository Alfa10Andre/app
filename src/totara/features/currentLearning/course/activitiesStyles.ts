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
import { margins, fontWeights, paddings } from "@totara/theme/constants";
import { TotaraTheme } from "@totara/theme/Theme";
import { spacedFlexRow } from "@totara/lib/styles/base";

const { marginL, marginM } = margins;
const { textRegular, colorAccent, colorLink, textMedium, colorSecondary1 } = TotaraTheme;

const activitiesStyles = StyleSheet.create({
  itemTitle: {
    ...textRegular,
    justifyContent: "center",
    alignSelf: "flex-start"
  },
  sectionView: {
    ...spacedFlexRow,
    height: 58,
    marginHorizontal: marginL,
    alignItems: "center"
  },
  itemTouchableContent: {
    flexDirection: "column",
    flex: 1
  },
  itemContentWrapper: {
    minHeight: 68,
    justifyContent: "flex-start",
    flexDirection: "row",
    flex: 1,
    marginHorizontal: marginL
  },
  itemLockContentWrapper: {
    opacity: 0.25,
    alignItems: "center"
  },
  itemTextContainer: {
    height: 45,
    justifyContent: "center",
    marginRight: marginL
  },
  sectionNotAvailable: {
    ...textRegular,
    color: colorLink,
    flex: 1,
    textAlign: "right",
    margin: margins.marginS
  },
  sectionTitle: {
    ...textMedium,
    fontWeight: fontWeights.fontWeightSemiBold,
    flex: 2
  },
  labelContainer: {
    marginVertical: marginM,
    justifyContent: "center"
  },
  labelTextDescription: {
    textAlign: "left",
    ...textRegular,
    color: TotaraTheme.colorNeutral6
  },
  listItemLockContainer: {
    flex: 1,
    backgroundColor: colorAccent,
    paddingRight: paddings.padding3XL
  },
  activityList: {
    backgroundColor: colorSecondary1,
    marginHorizontal: marginL
  },
  labelSelfCompletionIcon: {
    alignSelf: "flex-start",
    marginTop: margins.marginM
  }
});

export default activitiesStyles;
