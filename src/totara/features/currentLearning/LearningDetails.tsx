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

import React, { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { RefreshControl, Text, TouchableOpacity, View } from "react-native";
import ImageElement from "./components/ImageElement";
import { learningDetailsStyles } from "./currentLearningStyles";
import { TotaraTheme } from "@totara/theme/Theme";
import { CourseGroup, Course, LearningItem } from "@totara/types";
import { margins } from "@totara/theme/constants";
import { CL_TEST_IDS } from "@totara/lib/testIds";
import Animated, { interpolate, Extrapolate, Value, event } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import { AnimatedHeader, HEIGHT } from "@totara/components/AnimatedHeader";
import DueDateState from "./components/DueDateState";
import { useNavigation } from "@react-navigation/native";

const { marginXL } = margins;

type LearningDetailsProps = {
  item: Course | CourseGroup | LearningItem;
  itemType: string;
  children: ReactNode;
  tabBarLeftTitle: string;
  tabBarRightTitle: string;
  onPress: () => void;
  overviewIsShown: boolean;
  badgeTitle: string;
  image?: string;
  onPullToRefresh: () => void;
  navigation: any;
  loading: boolean;
};

type TitleBarProps = {
  item: LearningItem;
  badgeTitle: string;
};

const TitleBar = ({ item, badgeTitle }: TitleBarProps) => {
  return (
    <View style={learningDetailsStyles.itemCard}>
      <View style={{ flexDirection: "row" }}>
        <Text style={learningDetailsStyles.itemFullName}>{item.fullname}</Text>
      </View>
      <View style={learningDetailsStyles.learningTypeLabelWrap}>
        <Text style={learningDetailsStyles.programLabelText}>{badgeTitle}</Text>
      </View>
    </View>
  );
};

type TabBarProps = {
  onPress: () => void;
  overviewIsShown: boolean;
  tabBarLeftTitle: string;
  tabBarRightTitle: string;
};

const TabBar = ({ onPress, overviewIsShown, tabBarLeftTitle, tabBarRightTitle }: TabBarProps) => {
  return (
    <View style={[{ backgroundColor: TotaraTheme.colorNeutral2 }]}>
      <View style={[learningDetailsStyles.tabBarContainer]}>
        <View style={learningDetailsStyles.tabNav}>
          <TouchableOpacity
            style={[
              learningDetailsStyles.tabViewItem,
              overviewIsShown && { ...learningDetailsStyles.tabViewItemSelected }
            ]}
            testID={CL_TEST_IDS.TAB_1}
            accessibilityRole={"tab"}
            accessibilityState={overviewIsShown ? { selected: true } : {}}
            onPress={onPress}>
            <Text
              style={[
                learningDetailsStyles.tabViewTitle,
                overviewIsShown && learningDetailsStyles.tabViewTitleSelected
              ]}>
              {tabBarLeftTitle}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              learningDetailsStyles.tabViewItem,
              { marginLeft: marginXL },
              !overviewIsShown && { ...learningDetailsStyles.tabViewItemSelected }
            ]}
            accessibilityRole={"tab"}
            accessibilityState={!overviewIsShown ? { selected: true } : {}}
            onPress={onPress}
            testID={CL_TEST_IDS.TAB_2}>
            <Text
              style={[
                learningDetailsStyles.tabViewTitle,
                !overviewIsShown && { ...learningDetailsStyles.tabViewTitleSelected }
              ]}>
              {tabBarRightTitle}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const LearningDetails = ({
  item,
  itemType,
  children,
  tabBarLeftTitle,
  tabBarRightTitle,
  onPress,
  overviewIsShown,
  badgeTitle,
  image,
  onPullToRefresh,
  navigation,
  loading
}: LearningDetailsProps) => {
  const scrollValue = useRef(new Value(0)).current;
  const [isRefreshing, setRefreshing] = useState(false);

  const { fullname } = item;

  const onUserPullToRefresh = () => {
    setRefreshing(true);
    onPullToRefresh();
  };

  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false
    });

    return () => {};
  }, []);

  useEffect(() => {
    if (!loading) setRefreshing(false);
  }, [loading]);

  const gradientShadowZIndex = 100;

  return (
    <View style={learningDetailsStyles.container}>
      <AnimatedHeader
        scrollValue={scrollValue}
        title={fullname!}
        subTitle={badgeTitle}
        leftAction={() => navigation?.goBack()}
      />
      <Animated.ScrollView
        scrollIndicatorInsets={{ right: 0 }}
        contentInsetAdjustmentBehavior={"scrollableAxes"}
        refreshControl={
          <RefreshControl
            style={{ zIndex: gradientShadowZIndex + 100 }}
            refreshing={isRefreshing}
            tintColor={TotaraTheme.colorNeutral2}
            onRefresh={onUserPullToRefresh}></RefreshControl>
        }
        onScroll={event([{ nativeEvent: { contentOffset: { y: scrollValue } } }], {
          useNativeDriver: true
        })}
        scrollEventThrottle={16}>
        <Animated.View
          style={{
            flex: 1,
            alignItems: "center",
            height: HEIGHT,
            transform: [
              {
                scale: interpolate(scrollValue, {
                  inputRange: [-HEIGHT, 0],
                  outputRange: [3, 1],
                  extrapolate: Extrapolate.CLAMP
                })
              }
            ]
          }}>
          <View style={learningDetailsStyles.imageViewContainer}>
            <ImageElement image={image} itemType={itemType} imageStyle={learningDetailsStyles.imageView} />
          </View>
          <View style={learningDetailsStyles.imageViewGradient}>
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0)"]}
              style={{ height: HEIGHT / 2, zIndex: gradientShadowZIndex }}
            />
          </View>
        </Animated.View>
        {item.duedate && <DueDateState dueDateState={item.duedateState} dueDate={item.duedate} />}
        <TitleBar badgeTitle={badgeTitle} item={item as LearningItem} />

        <View>
          <TabBar
            onPress={onPress}
            overviewIsShown={overviewIsShown}
            tabBarLeftTitle={tabBarLeftTitle}
            tabBarRightTitle={tabBarRightTitle}
          />
        </View>
        <View>{children}</View>
      </Animated.ScrollView>
    </View>
  );
};

export default LearningDetails;
