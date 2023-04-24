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

import { margins, fontWeights, paddings } from "./constants";

const scormSummaryStyles = StyleSheet.create({
  expanded: {
    flex: 1,
    flexDirection: "column"
  },
  sectionTitle: {
    flexDirection: "row",
    paddingVertical: paddings.paddingL,
    justifyContent: "space-between",
    fontWeight: fontWeights.fontWeightBold
  },
  sectionField: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: paddings.paddingL
  },
  sectionArrow: { alignSelf: "center", marginLeft: margins.marginS },
  attemptContainer: {
    padding: paddings.paddingL,
    flexDirection: "column",
    alignItems: "stretch"
  }
});

const scormAttemptsStyles = StyleSheet.create({
  sectionTitle: {
    marginVertical: margins.marginL,
    paddingHorizontal: paddings.paddingXL,
    fontWeight: fontWeights.fontWeightBold
  },
  holder: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: margins.marginL,
    paddingHorizontal: paddings.paddingL
  },
  attempt: {
    flex: 2,
    alignSelf: "center",
    fontWeight: "normal"
  },
  result: {
    flex: 1,
    alignItems: "flex-end"
  }
});

const onlineScormActivityStyles = StyleSheet.create({
  playerContainer: { width: "100%", height: "100%" }
});

export { scormSummaryStyles, scormAttemptsStyles, onlineScormActivityStyles };
