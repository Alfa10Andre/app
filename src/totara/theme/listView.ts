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
import { margins, paddings, opacities } from "@totara/theme/constants";
import { TotaraTheme } from "@totara/theme/Theme";

const separator = {
  opacity: opacities.opacityS,
  marginHorizontal: margins.marginL,
  backgroundColor: TotaraTheme.colorNeutral6
};

const regularSeparator = {
  margin: margins.marginXS,
  backgroundColor: TotaraTheme.colorNeutral3,
  height: 1
};

const listViewStyles = StyleSheet.create({
  contentContainerStyle: {
    paddingLeft: paddings.paddingL
  },
  rowItem: {
    flexDirection: "row",
    padding: paddings.paddingM,
    backgroundColor: TotaraTheme.colorNeutral1
  },
  itemSeparator: regularSeparator,
  thinSeparator: {
    ...separator,
    height: 0.5
  },
  thickSeparator: {
    ...separator,
    height: 2
  },
  noContent: {
    height: "100%",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  noContentTitle: {
    marginTop: margins.margin2XL,
    fontWeight: "bold"
  }
});

export default listViewStyles;
