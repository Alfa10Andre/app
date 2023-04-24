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
import { paddings } from "@totara/theme/constants";
import { gutter } from "@totara/theme/index";
import { TotaraTheme } from "@totara/theme/Theme";

const headerStyles = StyleSheet.create({
  navigationHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: gutter,
    paddingVertical: paddings.paddingL,
    backgroundColor: TotaraTheme.colorSecondary1
  }
});

export default headerStyles;
