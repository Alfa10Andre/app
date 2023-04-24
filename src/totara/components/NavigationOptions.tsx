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

import { StackNavigationOptions } from "@react-navigation/stack";
import { ANDROID_STATUSBAR_HEIGHT, PLATFORM_ANDROID } from "@totara/lib/constants";
import { TotaraTheme } from "@totara/theme/Theme";
import { Platform } from "react-native";

type navigationOptionsProps = {
  title?: string;
  backTitle?: string;
  opacity?: number;
  headerRight?: any;
  headerShown?: boolean
};

const TotaraNavigationOptions = ({ opacity, title = "", backTitle, headerRight, headerShown = true }: navigationOptionsProps) => {
  const options: StackNavigationOptions = {
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: TotaraTheme.colorNeutral2,
      shadowOpacity: 0,
      elevation: 0,
      ...Platform.OS === PLATFORM_ANDROID && { height: ANDROID_STATUSBAR_HEIGHT }
    },
    headerTitleStyle: {
      color: TotaraTheme.colorNeutral7,
      fontSize: TotaraTheme.textRegular.fontSize,
      opacity: opacity,

    },
    title: title,
    headerBackTitle: backTitle,
    headerTintColor: TotaraTheme.colorNeutral7,
    headerRight: headerRight,
    headerShown: headerShown,
  };
  return options;
};

export default TotaraNavigationOptions;
