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

import React, { useRef, useEffect } from "react";
import { View, Modal, TouchableOpacity, SectionList, Text, FlatList } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { groupBy } from "lodash";
import { TotaraTheme } from "@totara/theme/Theme";
import BottomSheet from "reanimated-bottom-sheet";
import listViewStyles from "@totara/theme/listView";
import { Criteria } from "@totara/types";
import criteriaSheetStyle from "./criteriaSheetStyle";
import { iconSizes } from "@totara/theme/constants";
import { TEST_IDS } from "@totara/lib/testIds";

type Props = {
  title: string;
  criteriaList?: [Criteria] | [string];
  onClose: () => void;
  isOverview?: boolean;
};

const ListItem = ({ item, isOverview }: any) => {
  // requirement and status return with URL and should replace the url and tags.
  const REGEX = /(<([^>]+)>)/gi;
  let description = isOverview && item.requirement!.replace(REGEX, "");
  isOverview &&
    item.status!.replace(REGEX, "") !== undefined &&
    item.status!.replace(REGEX, "").length > 0 &&
    (description += " | " + item.status!.replace(REGEX, ""));

  return isOverview ? (
    <View style={criteriaSheetStyle.renderOuterViewWrap}>
      <View style={criteriaSheetStyle.renderInnerViewWrap}>
        <View style={{ flex: 2 }}>
          <Text numberOfLines={1} style={criteriaSheetStyle.criteriaText}>
            {/* // item criteria return with URL and should replace the url and tags */}
            {item.criteria!.replace(REGEX, "")}
          </Text>
          <Text numberOfLines={1} style={criteriaSheetStyle.requirementText}>
            {description}
          </Text>
        </View>
      </View>
      <View style={listViewStyles.thinSeparator} />
    </View>
  ) : (
    <View>
      <Text numberOfLines={3} style={criteriaSheetStyle.availableReasonTextWrap}>
        {item}
      </Text>
      <View style={listViewStyles.thinSeparator} />
    </View>
  );
};

const SectionHeader = ({ title }: { title: string }) => {
  return (
    <View style={criteriaSheetStyle.container}>
      <Text numberOfLines={1} style={criteriaSheetStyle.nameViewWrap}>
        {title}
      </Text>
    </View>
  );
};

type ContentProps = {
  criteriaList?: [Criteria] | [string];
  isOverview: boolean;
};

const BottomSheetContent = ({ criteriaList, isOverview }: ContentProps) => {
  if (isOverview) {
    const groupedCriteriaList = groupBy(criteriaList, "type");
    const criteriaSectionList = Object.entries(groupedCriteriaList).map(([key, value]) => {
      return { title: key, data: value };
    });
    return (
      <View style={criteriaSheetStyle.listContent}>
        <SectionList
          style={criteriaSheetStyle.renderListWrap}
          sections={criteriaSectionList as []}
          renderItem={({ item }) => <ListItem item={item} isOverview={isOverview} />}
          renderSectionHeader={({ section }) => <SectionHeader title={section.title} />}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
  return (
    <View style={criteriaSheetStyle.listContent}>
      <FlatList
        data={criteriaList as [string]}
        renderItem={({ item }) => <ListItem item={item} isOverview={isOverview} />}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

type BottomSheetHeaderProps = {
  onClose: () => void;
  title: string;
};

const BottomSheetHeader = ({ onClose, title }: BottomSheetHeaderProps) => {
  return (
    <View style={criteriaSheetStyle.headerViewWrap}>
      <View style={criteriaSheetStyle.headerInnerViewWrap}>
        <TouchableOpacity
          style={criteriaSheetStyle.headerCloseButtonWrap}
          onPress={onClose}
          testID={TEST_IDS.CLICK_CLOSE}>
          <FontAwesomeIcon icon="times" size={iconSizes.sizeM} color={TotaraTheme.colorNeutral5} />
        </TouchableOpacity>
        <View style={criteriaSheetStyle.headerViewIndicatorWrap}>
          <View style={criteriaSheetStyle.indicatorWrap}></View>
        </View>
      </View>
      <Text style={criteriaSheetStyle.listHeader}>{title}</Text>
    </View>
  );
};

const CriteriaSheet = ({ criteriaList, onClose, isOverview = false, title }: Props) => {
  const bottomDrawerRef = useRef<any>(null);

  useEffect(() => {
    bottomDrawerRef.current.snapTo(0);
  }, [bottomDrawerRef]);

  return (
    <Modal transparent={true}>
      <View style={criteriaSheetStyle.transparentView}>
        <BottomSheet
          snapPoints={["95%", "50%", "50%"]}
          renderContent={() => <BottomSheetContent criteriaList={criteriaList} isOverview={isOverview} />}
          renderHeader={() => <BottomSheetHeader onClose={onClose} title={title} />}
          ref={bottomDrawerRef}
          enabledGestureInteraction={true}
          enabledBottomInitialAnimation={true}
        />
      </View>
    </Modal>
  );
};

export default CriteriaSheet;
