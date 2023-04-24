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

import { StyleSheet, ViewStyle } from "react-native";
import { margins, paddings, borderRadius, fontWeights, fontSizes } from "@totara/theme/constants";
import { TotaraTheme } from "@totara/theme/Theme";
import { viewHeight } from "@totara/features/constants";
import { flexGrow } from "@totara/lib/styles/base";
const { colorOpacity70, textH2, textXSmall, textXXSmall, colorNeutral2, colorNeutral7, colorSecondary1 } = TotaraTheme;

const { marginL } = margins;

const viewHeader: ViewStyle = {
  padding: paddings.paddingL
};

const learningDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TotaraTheme.colorNeutral1
  },
  imageView: {
    flex: 1,
    minHeight: viewHeight.learningItemCard
  },
  imageViewContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300
  },
  imageViewGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100
  },
  itemCard: {
    padding: paddings.paddingXL,
    justifyContent: "flex-start",
    flex: 1,
    backgroundColor: colorNeutral2
  },
  learningTypeLabelWrap: {
    marginTop: margins.marginXS,
    borderRadius: borderRadius.borderRadiusM,
    borderStyle: "solid",
    borderWidth: 1,
    alignSelf: "flex-start",
    alignItems: "center",
    borderColor: colorNeutral7
  },
  tabBarContainer: {
    flex: 0.4,
    height: 50
  },
  programLabelText: {
    ...textXXSmall,
    textAlign: "center",
    padding: paddings.paddingL,
    paddingRight: paddings.paddingL,
    paddingTop: paddings.paddingXS,
    paddingBottom: paddings.paddingXS,
    color: colorNeutral7
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: colorOpacity70
  },
  tabNav: {
    flexDirection: "row",
    marginLeft: marginL,
    alignItems: "center",
    flex: 1
  },
  tabViewItem: {
    height: "100%",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent"
  },
  tabViewItemSelected: {
    borderBottomColor: TotaraTheme.colorNeutral7
  },

  tabViewTitle: {
    ...TotaraTheme.textRegular,
    color: TotaraTheme.colorNeutral6,
    fontWeight: fontWeights.fontWeightSemiBold
  },
  tabViewTitleSelected: {
    color: TotaraTheme.colorNeutral7
  },
  itemFullName: {
    flexWrap: "wrap",
    ...TotaraTheme.textHeadline,
    fontWeight: fontWeights.fontWeightSemiBold,
    fontSize: fontSizes.fontSizeL
  }
});

const currentLearningStyles = StyleSheet.create({
  viewHeader,
  spinnerContainer: {
    flex: 1,
    justifyContent: "center"
  },
  contentWrap: {
    flex: 1,
    backgroundColor: "transparent"
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  title: {
    ...textH2,
    ...flexGrow
  },
  headerViewSubTitleWrap: {
    ...textXSmall,
    color: colorNeutral7
  },
  headerViewWrap: {
    ...viewHeader,
    color: colorSecondary1,
    backgroundColor: colorNeutral2
  }
});

export { learningDetailsStyles, currentLearningStyles };
