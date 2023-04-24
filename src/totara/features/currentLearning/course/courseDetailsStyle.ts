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
import { spacedFlexRow } from "@totara/lib/styles/base";
import { TotaraTheme } from "@totara/theme/Theme";
import { margins } from "@totara/theme/constants";
import { Images } from "@resources/images";
const { colorAccent, colorNeutral7, colorSuccess, colorNeutral6, colorAlert } = TotaraTheme;

const courseDetailsStyle = StyleSheet.create({
  expandContentWrap: {
    margin: margins.marginL,
    ...spacedFlexRow
  },
  expandTextWrap: {
    ...TotaraTheme.textMedium
  },
  scrollView: {
    flex: 1,
    backgroundColor: TotaraTheme.colorNeutral2
  }
});

const completionStates = {
  notAvailable: {
    icon: "lock",
    backgroundColor: colorAccent,
    iconColor: colorNeutral7,
    borderColor: colorNeutral7
  },
  completed: {
    icon: "check",
    backgroundColor: colorSuccess,
    iconColor: colorAccent,
    borderColor: colorSuccess
  },
  autoIncomplete: {
    icon: Images.autoCompleteTick,
    backgroundColor: colorAccent,
    iconColor: colorNeutral6,
    borderColor: colorNeutral6,
    fontAwesomeIcon: false
  },
  completeFail: {
    icon: "times",
    backgroundColor: colorAlert,
    iconColor: colorAccent,
    borderColor: colorAlert
  },
  manualIncomplete: {
    backgroundColor: colorAccent,
    iconColor: colorNeutral6,
    borderColor: colorNeutral6
  }
};

export default courseDetailsStyle;
export { completionStates };
