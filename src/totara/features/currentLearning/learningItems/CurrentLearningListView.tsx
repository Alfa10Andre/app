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
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import CurrentLearningListViewItem from "@totara/features/currentLearning/learningItems/CurrentLearningListViewItem";
import listViewStyles from "@totara/theme/listView";

type CurrentLearningListViewProps = {
  currentLearning?: any;
  onRefresh: () => void;
};

const CurrentLearningListView = ({ currentLearning, onRefresh }: CurrentLearningListViewProps) => {
  const renderItem = ({ item, index }: any) => {
    return <CurrentLearningListViewItem item={item} itemTestID={`learningItem_${index}`} />;
  };

  return (
    <View style={currentLearningListViewStyles.container}>
      <FlatList
        ItemSeparatorComponent={() => <View style={listViewStyles.itemSeparator} />}
        testID={"test_currentLearningListView"}
        data={currentLearning}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const currentLearningListViewStyles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default CurrentLearningListView;
