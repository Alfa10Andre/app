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
import { TotaraTheme } from "@totara/theme/Theme";
import { margins, paddings, borderRadius, fontWeights, row, shadow } from "@totara/theme/constants";
import { deviceScreen } from "@totara/lib/tools";
import { spacedFlexRow } from "@totara/lib/styles/base";

const details = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TotaraTheme.colorNeutral2
  },
  activitiesContainer: {
    flex: 3,
    backgroundColor: TotaraTheme.colorNeutral1
  }
});

const courses = StyleSheet.create({
  container: {
    marginBottom: margins.marginXL
  },
  bottomView: {
    marginHorizontal: margins.marginXL,
    alignItems: "center",
    marginBottom: margins.marginXL
  },
  button: {
    borderRadius: borderRadius.borderRadiusXS,
    borderWidth: 1,
    justifyContent: "center",
    backgroundColor: TotaraTheme.colorAccent,
    borderColor: TotaraTheme.textColorDark
  },
  buttonTextTitle: {
    ...TotaraTheme.textRegular,
    textAlign: "center",
    fontWeight: fontWeights.fontWeightBold,
    paddingHorizontal: paddings.padding3XL,
    paddingVertical: paddings.paddingXL
  },
  completionInfoView: {
    borderRadius: borderRadius.borderRadiusS,
    marginHorizontal: margins.marginL,
    backgroundColor: TotaraTheme.colorNeutral2,
    marginTop: margins.marginXL,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  completionInfoTitle: {
    ...TotaraTheme.textRegular,
    textAlign: "center",
    paddingVertical: paddings.paddingXL,
    marginStart: margins.marginM
  },
  completedText: {
    ...TotaraTheme.textMedium,
    fontWeight: fontWeights.fontWeightSemiBold
  },
  endNoteText: {
    ...TotaraTheme.textSmall,
    marginVertical: margins.marginL
  },
  nextSet: {
    marginVertical: margins.marginL,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "space-between"
  },
  nextSetText: {
    ...TotaraTheme.textXSmall,
    textTransform: "uppercase",
    fontWeight: fontWeights.fontWeightBold
  }
});

const cardStyle = {
  borderRadius: borderRadius.borderRadiusM,
  margin: margins.marginL,
  width: deviceScreen.width * 0.8,
  backgroundColor: TotaraTheme.colorNeutral1
};

const courseSet = StyleSheet.create({
  courseSetHeader: {
    ...spacedFlexRow,
    flex: 1,
    marginHorizontal: margins.marginL
  },
  title: {
    ...TotaraTheme.textHeadline,
    fontWeight: fontWeights.fontWeightBold
  },
  container: {
    ...shadow.ios,
    ...shadow.android,
    ...cardStyle
  },
  noShadowContainer: {
    ...cardStyle,
    backgroundColor: TotaraTheme.colorNeutral2
  },
  itemContainer: {
    borderRadius: borderRadius.borderRadiusM,
    width: "100%"
  },
  courseTitle: {
    ...TotaraTheme.textRegular,
    fontWeight: fontWeights.fontWeightSemiBold
  },
  courseSetItemImage: {
    borderTopRightRadius: borderRadius.borderRadiusM,
    borderTopLeftRadius: borderRadius.borderRadiusM,
    width: deviceScreen.width * 0.8,
    aspectRatio: 8 / 3 //To Do: this aspectRatio will be changed later
  },
  absoluteItem: {
    position: "absolute",
    bottom: margins.marginL,
    left: margins.marginL,
    flexDirection: "row"
  },
  headerBar: {
    flex: 1,
    borderTopRightRadius: borderRadius.borderRadiusM,
    borderTopLeftRadius: borderRadius.borderRadiusM,
    backgroundColor: TotaraTheme.colorNeutral2,
    height: 54,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: paddings.paddingXL
  },
  headerTitle: {
    flex: 0.95,
    ...TotaraTheme.textRegular,
    fontWeight: fontWeights.fontWeightSemiBold
  },
  viewAllContent: {
    height: 35,
    alignItems: "center",
    justifyContent: "center"
  },
  viewAllTitle: {
    ...TotaraTheme.textXSmall,
    fontWeight: fontWeights.fontWeightNormal,
    color: TotaraTheme.colorLink,
    marginEnd: margins.marginXS
  },
  viewAllTouchableOpacity: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

const rowItem = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: paddings.paddingXL,
    borderRadius: borderRadius.borderRadiusM,
    alignItems: "center",
    justifyContent: "space-between"
  },
  imageWrapper: {
    backgroundColor: TotaraTheme.colorNeutral2,
    padding: paddings.paddingM,
    borderRadius: borderRadius.borderRadiusM
  },
  image: {
    height: row.icon.size,
    aspectRatio: 1
  },
  courseName: {
    ...TotaraTheme.textSmall,
    fontWeight: fontWeights.fontWeightNormal,
    marginHorizontal: margins.marginM
  },
  detailsWrapper: {
    flex: 1
  }
});

const horizontalList = StyleSheet.create({
  container: {
    backgroundColor: TotaraTheme.colorNeutral1,
    paddingVertical: paddings.paddingXL
  },
  listWrapper: {
    ...shadow.ios,
    ...shadow.android,
    marginBottom: margins.marginM,
    borderRadius: borderRadius.borderRadiusM,
    backgroundColor: TotaraTheme.colorNeutral1
  }
});

export { details, courses, courseSet, rowItem, horizontalList };
