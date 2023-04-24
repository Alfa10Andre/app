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
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TotaraTheme } from "@totara/theme/Theme";
import { translate } from "@totara/locale";
import moment from "moment";
import { learningItemToRouteMap, navigateTo } from "@totara/lib/navigation";
import { ImageWrapper, ProgressCircle } from "@totara/components";
import DefaultImage from "@totara/features/currentLearning/components/DefaultImage";
import { capitalizeFirstLetter } from "@totara/lib/tools";
import NativeAccessRestriction from "@totara/features/currentLearning/NativeAccessRestriction";
import { borderRadius, iconSizes, margins, paddings } from "@totara/theme/constants";
import { extractTargetId, isInvalidDueDate } from "../utils";
import { activeOpacity, flexGrow } from "@totara/lib/styles/base";
import { useNavigation } from "@react-navigation/native";

type ListViewItemProps = {
  item: any;
  itemTestID: string;
};

const CurrentLearningListViewItem = ({ item, itemTestID }: ListViewItemProps) => {
  const navigation = useNavigation();
  const [showRestriction, setShowRestriction] = useState(false);
  const { fullname, progress, itemtype, duedate, duedateState, id, native, imageSrc } = item;

  const DueDateWidget = (dueDate, dueDateState) => {
    if (isInvalidDueDate({ dueDate, dueDateState })) return <View testID={"test_noDueDate"} />;

    const color =
      dueDateState === "danger"
        ? TotaraTheme.colorAlert
        : dueDateState === "warning"
          ? TotaraTheme.colorWarning
          : TotaraTheme.colorInfo;
    const text =
      dueDateState === "danger" ? translate("current_learning.overdue_by") : translate("current_learning.due_in");

    return (
      <Text testID={"test_dueDate"} style={{ color: color }}>
        {`${text} ${moment(dueDate).toNow(true)}`}
      </Text>
    );
  };

  const onItemPress = () => {
    if (native) {
      const targetId = extractTargetId(id);

      navigateTo({
        navigate: navigation.navigate,
        routeId: learningItemToRouteMap[itemtype],
        props: { targetId: targetId, courseGroupType: item.itemtype }
      });
    } else {
      setShowRestriction(true);
    }
  };

  const onClose = () => {
    setShowRestriction(false);
  };

  return (
    <TouchableOpacity
      onPress={() => onItemPress()}
      testID={"test_currentLearningListViewItem"}
      activeOpacity={activeOpacity}>
      <View style={currentLearningListViewStyles.itemContainer} testID={itemTestID}>
        <View style={currentLearningListViewStyles.itemImage}>
          {imageSrc && imageSrc.length > 0 ? (
            <ImageWrapper url={imageSrc} style={currentLearningListViewStyles.imageWrap} />
          ) : (
            <DefaultImage itemType={itemtype} style={currentLearningListViewStyles.imageWrap} />
          )}
        </View>
        <View style={currentLearningListViewStyles.itemInfoWrapper}>
          <View style={currentLearningListViewStyles.itemInfoContainer}>
            <View style={flexGrow}>
              <Text
                style={currentLearningListViewStyles.itemTitle}
                testID={"test_CurrentLearningItem_Title"}
                numberOfLines={2}>
                {fullname}
              </Text>
              <Text
                style={currentLearningListViewStyles.itemLearningTypeLabel}
                testID={"test_CurrentLearningItem_Type"}>
                {capitalizeFirstLetter(translate(`learning_items.${itemtype}`))}
              </Text>
            </View>
            {progress !== null && (
              <ProgressCircle
                size={iconSizes.sizeXL}
                progress={progress}
                testID={"test_CurrentLearningItem_Progress"}
              />
            )}
          </View>
          {DueDateWidget(duedate, duedateState)}
        </View>
      </View>
      {showRestriction && <NativeAccessRestriction onClose={onClose} urlView={item.urlView} />}
    </TouchableOpacity>
  );
};

const currentLearningListViewStyles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    padding: paddings.paddingL
  },
  itemImage: {
    height: 80,
    aspectRatio: 4 / 3,
    borderRadius: borderRadius.borderRadiusM,
    backgroundColor: TotaraTheme.colorNeutral2
  },
  itemInfoWrapper: {
    ...flexGrow,
    marginLeft: margins.marginS
  },
  itemInfoContainer: {
    ...flexGrow,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  itemTitle: {
    ...TotaraTheme.textRegular,
    ...flexGrow,
    paddingRight: paddings.paddingXS
  },
  itemSubLine: {
    marginTop: margins.marginXS,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  itemProgress: {
    alignSelf: "flex-start",
    alignContent: "center"
  },
  imageWrap: {
    flex: 1,
    borderRadius: borderRadius.borderRadiusM
  },
  itemLearningTypeLabel: {
    ...TotaraTheme.textXXSmall,
    paddingHorizontal: paddings.paddingL,
    paddingVertical: paddings.paddingXS,
    borderWidth: 1,
    borderRadius: borderRadius.borderRadiusM,
    color: TotaraTheme.colorNeutral7,
    borderColor: TotaraTheme.colorNeutral6,
    alignSelf: "flex-start",
    marginVertical: margins.marginXS
  }
});

export default CurrentLearningListViewItem;
