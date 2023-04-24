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

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useFocusEffect } from "@react-navigation/native";
import { translate } from "@totara/locale";
import { fontSizes, fontWeights, paddings } from "@totara/theme/constants";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, Platform } from "react-native";
import Animated, { Extrapolate, interpolate, call, useCode } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const STATUSBAR_HEIGHT = 50;
const TOPNAVI_OFFSET = 250;
const ACTION_WIDTH = 40;
const HEIGHT = TOPNAVI_OFFSET + STATUSBAR_HEIGHT;

type AnimatedHeaderProps = { title: string; subTitle?: string; scrollValue?: any; leftAction: any };

const getIcon = () => Platform.OS === "ios" ? "chevron-left" : "arrow-left";

const AnimatedHeader = ({ title, subTitle, scrollValue, leftAction }: AnimatedHeaderProps) => {
  const safeArea = useSafeAreaInsets();
  const isFloating = !!scrollValue;
  const [dark, setDark] = useState(false);

  useCode(() => {
    return call([scrollValue], (values) => {
      const [value] = values;
      setDark(TOPNAVI_OFFSET < value);
    });
  }, [scrollValue]);

  const transparentToOpaqueInterpolate = interpolate(scrollValue, {
    inputRange: [TOPNAVI_OFFSET, TOPNAVI_OFFSET + STATUSBAR_HEIGHT],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });

  const opaqueToTransparentInterpolate = interpolate(scrollValue, {
    inputRange: [TOPNAVI_OFFSET, TOPNAVI_OFFSET + STATUSBAR_HEIGHT],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(dark ? "dark-content" : "light-content", true);
      return () => {
        StatusBar.setBarStyle("dark-content", true);
      };
    }, [])
  );

  return (
    <>
      <Animated.View
        testID={"animated-header-container"}
        style={{
          paddingTop: safeArea.top,
          marginBottom: isFloating ? -STATUSBAR_HEIGHT - safeArea.top : 0,
          height: STATUSBAR_HEIGHT + safeArea.top,
          backgroundColor: Animated.color(255, 255, 255, transparentToOpaqueInterpolate), //RGB color, 255 being white
          opacity: 1,
          zIndex: 200,
          flexDirection: "row"
        }}>
        <TouchableOpacity
          accessibilityLabel={translate("general.accessibility_go_back")}
          accessibilityRole={"button"}
          testID={"animated-header-backbutton"}
          onPress={leftAction}
          style={styles.leftAction}>
          <Animated.View
            testID={"animated-header-backbutton-black"}
            style={[styles.backIcon, { opacity: transparentToOpaqueInterpolate }]}>
            <FontAwesomeIcon icon={getIcon()} color={"black"} />
          </Animated.View>
          <Animated.View
            testID={"animated-header-backbutton-white"}
            style={[styles.backIcon, { opacity: opaqueToTransparentInterpolate }]}>
            <FontAwesomeIcon icon={getIcon()} color={"white"} />
          </Animated.View>
        </TouchableOpacity>

        <Animated.View
          testID={"animated-header-title-container"}
          style={{ flex: 1, opacity: transparentToOpaqueInterpolate }}>
          <Text numberOfLines={1} testID={"animated-header-title"} style={styles.title}>
            {title}
          </Text>
          {subTitle && (
            <Text testID={"animated-header-subtitle"} style={styles.subTitle}>
              {subTitle}
            </Text>
          )}
        </Animated.View>
        <View style={{ width: ACTION_WIDTH }}></View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    width: ACTION_WIDTH,
    paddingLeft: paddings.paddingL,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    textAlign: "center",
    fontWeight: fontWeights.fontWeightBold,
    fontSize: fontSizes.fontSizeM
  },
  subTitle: {
    textAlign: "center",
    fontSize: fontSizes.fontSizeS,
    paddingTop: paddings.paddingS
  },
  backIcon: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute"
  }
});

export { AnimatedHeader, HEIGHT };
