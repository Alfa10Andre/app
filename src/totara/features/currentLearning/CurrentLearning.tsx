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

import React, { useContext, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { useQuery, NetworkStatus } from "@apollo/client";
import { ThemeContext } from "@totara/theme";
import { translate } from "@totara/locale";
import CurrentLearningCarousel from "./learningItems/CurrentLearningCarousel";
import CurrentLearningListView from "./learningItems/CurrentLearningListView";
import NoCurrentLearning from "./learningItems/NoCurrentLearning";
import query from "./api";
import { LoadingError, NetworkStatusIndicator, Loading, MessageBar } from "@totara/components";
import { currentLearningStyles } from "./currentLearningStyles";
import { paddings } from "@totara/theme/constants";
import { Switch, SwitchOption } from "@totara/components/Switch";
import { Icons } from "@resources/icons";
import { sortByDueDateThenTypeThenFullName } from "@totara/features/currentLearning/utils";
import { CL_TEST_IDS } from "@totara/lib/testIds";
import { NavigationEvents } from "@react-navigation/compat";

enum ListingOrientation {
  Carousel,
  ListView
}

const CurrentLearning = () => {
  const { networkStatus, error, data, refetch } = useQuery(query, { notifyOnNetworkStatusChange: true });
  const theme = useContext(ThemeContext);
  const [listingOrientation, setListingOrientation] = useState<ListingOrientation>(ListingOrientation.Carousel);
  // this is to make sure timing out errors are not shown for the functional error component
  const hasNotTimedOut = error?.networkError?.statusCode !== 408;

  const onContentRefresh = () => {
    refetch();
  };

  if (networkStatus === NetworkStatus.loading) return <Loading />;
  if (!data && error) {
    return <LoadingError onRefreshTap={onContentRefresh} error={error} />;
  }

  const toggleListingOrientation = () => {
    if (listingOrientation === ListingOrientation.Carousel) {
      setListingOrientation(ListingOrientation.ListView);
    } else setListingOrientation(ListingOrientation.Carousel);
  };

  if (data) {
    const { currentLearning: notSorted } = data;
    const currentLearning = sortByDueDateThenTypeThenFullName(notSorted);
    const accessibilityLabelText = translate("current_learning.accessibility_view_mode", {
      mode:
        listingOrientation === ListingOrientation.Carousel
          ? translate("current_learning.carousel")
          : translate("current_learning.list")
    });
    const accessibilityHintText = translate("current_learning.accessibility_view_mode_hint");

    return (
      <View style={[theme.viewContainer, { flex: 1 }]}>
        <NavigationEvents onWillFocus={onContentRefresh} />
        <View style={currentLearningStyles.headerViewWrap}>
          <View style={currentLearningStyles.headerWrapper}>
            <Text style={currentLearningStyles.title} numberOfLines={2}>
              {translate("current_learning.action_primary")}
            </Text>
            <View
              style={{
                paddingRight: paddings.paddingS,
                flexDirection: "row"
              }}
              accessible={true}
              accessibilityRole={"switch"}
              accessibilityLabel={accessibilityLabelText}
              accessibilityHint={accessibilityHintText}
              testID={CL_TEST_IDS.SWITCH}>
              <Switch onPress={toggleListingOrientation}>
                <SwitchOption icon={Icons.iconCarousel} selected={listingOrientation === ListingOrientation.Carousel} />
                <SwitchOption icon={Icons.iconList} selected={listingOrientation === ListingOrientation.ListView} />
              </Switch>
            </View>
          </View>
          <Text style={currentLearningStyles.headerViewSubTitleWrap}>
            {translate("current_learning.primary_info", {
              count: currentLearning && currentLearning.length ? currentLearning.length : 0
            })}
          </Text>
        </View>

        <View style={[currentLearningStyles.contentWrap]}>
          <NetworkStatusIndicator />
          {error && hasNotTimedOut && (
            <MessageBar mode={"alert"} text={translate("general.error_unknown")} icon={"exclamation-circle"} />
          )}
          {currentLearning && currentLearning.length > 0 ? (
            listingOrientation === ListingOrientation.Carousel ? (
              <CurrentLearningCarousel currentLearning={currentLearning} onRefresh={onContentRefresh} />
            ) : (
              <CurrentLearningListView currentLearning={currentLearning} onRefresh={onContentRefresh} />
            )
          ) : (
            <View
              style={{
                flex: 1
              }}>
              <ScrollView
                refreshControl={
                  <RefreshControl refreshing={networkStatus === NetworkStatus.refetch} onRefresh={onContentRefresh} />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "center"
                }}>
                <NoCurrentLearning testID={"test_NoCurrentLearning"} />
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    );
  }
};

export default CurrentLearning;
