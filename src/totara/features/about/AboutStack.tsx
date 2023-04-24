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

import { createStackNavigator } from "@react-navigation/stack";
import { createCompatNavigatorFactory } from "@react-navigation/compat";
import React from "react";
import About from "@totara/features/about/About";
import CloseButton from "@totara/components/CloseButton";
import { NAVIGATION_TEST_IDS } from "@totara/lib/testIds";

const AboutStack = createCompatNavigatorFactory(createStackNavigator)(
  {
    About: {
      screen: About,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: () => <CloseButton onPress={() => navigation.goBack()} testID={NAVIGATION_TEST_IDS.BACK} />
        };
      }
    }
  },
  { initialRouteName: "About" }
);

export default AboutStack;
