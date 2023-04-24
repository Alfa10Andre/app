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

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { translate } from "../../locale";
import NotificationDetails from "./NotificationDetail";
import TotaraNavigationOptions from "../../components/NavigationOptions";
import Notifications from "./Notifications";

const Stack = createStackNavigator();
const detaultScreenOptions = TotaraNavigationOptions({ backTitle: translate("general.back") });

const NotificationsStack = () => {
  return (
    <Stack.Navigator screenOptions={detaultScreenOptions}>
      <Stack.Screen name="Notification" component={Notifications} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetails} />
    </Stack.Navigator>
  );
};

export default NotificationsStack;
