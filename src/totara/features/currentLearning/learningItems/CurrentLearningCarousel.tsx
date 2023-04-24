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

import React, { useState, useRef } from "react";
import { TouchableOpacity, View, ScrollView, RefreshControl } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { AddBadge } from "@totara/components";
import { navigateTo, learningItemToRouteMap } from "@totara/lib/navigation";
import NativeAccessRestriction from "../NativeAccessRestriction";
import { iconSizes, paddings } from "@totara/theme/constants";
import { deviceScreen } from "@totara/lib/tools";
import LearningItemCard from "../components/LearningItemCard";
import carouselItemStyles from "./carouselItemStyles";
import { extractTargetId } from "../utils";
import { activeOpacity } from "@totara/lib/styles/base";
import { CL_TEST_IDS } from "@totara/lib/testIds";

type CurrentLearningCarouselProps = {
  currentLearning?: any;
  onRefresh: () => void;
};

const CurrentLearningCarousel = ({ currentLearning, onRefresh }: CurrentLearningCarouselProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);

  const renderItem = ({ item, index }: any) => {
    return <LearningItems item={item} index={index} />;
  };
  return (
    <View>
      <Pagination
        activeDotIndex={activeSlide}
        dotsLength={currentLearning.length}
        containerStyle={carouselItemStyles.pagination}
        dotStyle={[carouselItemStyles.dot, { width: deviceScreen.width / currentLearning.length }]}
        dotContainerStyle={{
          marginHorizontal: 0
        }}
        carouselRef={sliderRef.current}
        tappableDots={sliderRef && !sliderRef.current}
        inactiveDotOpacity={0}
        inactiveDotScale={1}
      />
      <ScrollView
        style={{ height: "100%" }}
        contentContainerStyle={{ height: "100%" }}
        showsVerticalScrollIndicator={false}
        testID={CL_TEST_IDS.CAROUSEL_WRAPPER_ID}
        refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}>
        <Carousel
          inactiveSlideScale={1}
          ref={sliderRef}
          testID={CL_TEST_IDS.CAROUSEL}
          data={currentLearning}
          renderItem={renderItem}
          sliderWidth={deviceScreen.width}
          itemWidth={deviceScreen.width - paddings.paddingXL * 2}
          sliderHeight={deviceScreen.height}
          inactiveSlideOpacity={0.6}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
      </ScrollView>
    </View>
  );
};

const LearningItems = ({ item, index }: any) => {
  const navigation = useNavigation();
  return (
    <View style={carouselItemStyles.itemWithBadgeContainer} testID={`${CL_TEST_IDS.LEARNING_ITEM}${index}`}>
      <View style={carouselItemStyles.badgeContainer}>
        <LearningItemWithSummaryAndNavigation item={item} navigation={navigation} />
      </View>
      <View style={carouselItemStyles.learningItem}>
        <AddBadge status={item.progress} size={iconSizes.sizeM} />
      </View>
    </View>
  );
};

const LearningItemWithSummaryAndNavigation = ({ item }: any) => {
  const navigation = useNavigation();
  const [showRestriction, setShowRestriction] = useState(false);
  const clickedLearningItem = () => {
    if (item.native) {
      const targetId = extractTargetId(item.id);
      navigateTo({
        navigate: navigation.navigate,
        routeId: learningItemToRouteMap[item.itemtype],
        props: { targetId: targetId, courseGroupType: item.itemtype }
      });
    } else {
      setShowRestriction(true);
    }
  };

  const onClose = () => {
    setShowRestriction(!showRestriction);
  };

  return (
    <TouchableOpacity
      style={carouselItemStyles.container}
      key={item.id}
      onPress={clickedLearningItem}
      activeOpacity={activeOpacity}>
      <View style={carouselItemStyles.content}>
        <LearningItemCard item={item} />
      </View>
      {showRestriction && <NativeAccessRestriction onClose={onClose} urlView={item.urlView} />}
    </TouchableOpacity>
  );
};

export default CurrentLearningCarousel;
