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
import { View, Text, StyleSheet, Linking } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { WebViewNavigation } from "react-native-webview";
import { NotificationMessage } from "@totara/types";
import { fontWeights, paddings } from "@totara/theme/constants";
import { TotaraTheme } from "@totara/theme/Theme";
import { decodeHtmlCharCodes, timeAgo } from "@totara/lib/tools";
import { DescriptionFormat } from "@totara/types/LearningItem";
import WebViewWrapper from "@totara/auth/WebViewWrapper";
import { useSession } from "@totara/core";
import { DescriptionContent } from "@totara/components/DescriptionContent";

type ParamList = {
  messageDetails: NotificationMessage;
};

type NotificationDetailProps = StackScreenProps<ParamList, "messageDetails">;

const NotificationDetails = ({ route }: NotificationDetailProps) => {
  const { subject, timeCreated, fullMessage, contextUrl, fullMessageFormat, fullMessageHTML } = route.params;
  const { host } = useSession();

  const onLoadWithRequest = (navState: WebViewNavigation) => {
    if (navState.url.indexOf(host!) < 0 && navState.loading) {
      Linking.openURL(navState.url);
      return false;
    }
    return true;
  };

  if (contextUrl) return <WebViewWrapper uri={contextUrl} onShouldStartLoadWithRequest={onLoadWithRequest} />;
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text testID={"test_title"} style={styles.title}>
          {decodeHtmlCharCodes(subject)}
        </Text>
        <Text testID={"test_timeCreated"} style={styles.timeCreated}>
          {timeAgo(timeCreated)}
        </Text>
      </View>
      <DescriptionContent
        content={fullMessage}
        contentType={fullMessageFormat as DescriptionFormat}
        testID={"test_fullMessage"}
        source={{ html: fullMessageHTML }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    ...TotaraTheme.viewContainer,
    padding: paddings.paddingXL
  },
  timeCreated: {
    ...TotaraTheme.textSmall,
    color: TotaraTheme.colorNeutral6
  },
  title: {
    ...TotaraTheme.textRegular,
    fontWeight: fontWeights.fontWeightSemiBold
  }
});

export default NotificationDetails;
