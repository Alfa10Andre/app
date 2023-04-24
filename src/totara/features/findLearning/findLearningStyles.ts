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

import { TotaraTheme } from "@totara/theme/Theme";
import { margins, paddings, borderRadius } from "@totara/theme/constants";
import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const findLearningStyles = StyleSheet.create({
  mainWrapper: {
    flex: 1
  },
  headerWrapper: {
    paddingHorizontal: paddings.paddingL,
    marginTop: margins.margin2XL,
    marginBottom: margins.marginL
  },
  header: {
    ...TotaraTheme.textH2
  },
  searchBarContainer: {
    paddingBottom: 0,
    paddingTop: paddings.paddingL
  },
  searchBar: {
    backgroundColor: TotaraTheme.colorNeutral3,
    marginLeft: 0,
    paddingHorizontal: paddings.paddingL
  },
  clearSearch: {
    marginLeft: 0,
    marginRight: 0
  },
  result: {
    ...TotaraTheme.textHeadline,
    paddingTop: paddings.paddingXL
  },
  listWrapper: {
    paddingHorizontal: paddings.paddingL,
    flexGrow: 1
  },
  itemTitle: {
    textAlign: "center",
    flex: 1
  },
  skeletonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 0.5,
    height: 150,
    marginTop: margins.marginL,
    paddingHorizontal: paddings.paddingXL
  },
  skeletonContentWrapper: {
    flexDirection: "column",
    height: 150,
    justifyContent: "space-around"
  },
  imageSkeleton: {
    width: SCREEN_WIDTH / 2 - 10,
    height: 100,
    borderRadius: borderRadius.borderRadiusS
  },
  nameSkeleton: {
    width: "80%",
    height: 20,
    borderRadius: borderRadius.borderRadiusXS
  },
  typeSkeleton: {
    width: "50%",
    height: 20,
    borderRadius: borderRadius.borderRadiusXS
  },
  noLearningItemContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    flexGrow: 1
  },
  noLearningItemsText: {
    ...TotaraTheme.textHeadline,
    fontWeight: "bold",
    paddingTop: paddings.padding3XL
  }
});
