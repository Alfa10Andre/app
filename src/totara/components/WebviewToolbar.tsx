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
import { StyleSheet, View, Platform, Linking, Share } from "react-native";

import TouchableIcon from "@totara/components/TouchableIcon";
import { WebView, WebViewNavigation } from "react-native-webview";
import { showMessage } from "@totara/lib";
import { TotaraTheme } from "@totara/theme/Theme";
import { iconSizes } from "@totara/theme/constants";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faSafari, faChrome } from "@fortawesome/free-brands-svg-icons";

type WebviewToolbarProps = {
  refWebview: React.RefObject<WebView>;
  navState?: WebViewNavigation;
  viewUrl: string;
  showAllToolbarItems: boolean;
};

const WebviewToolbar = ({ refWebview, navState, viewUrl, showAllToolbarItems = false }: WebviewToolbarProps) => {
  const onShare = async () => {
    try {
      await Share.share({
        message: viewUrl
      });
    } catch (error) {
      showMessage({ text: error.message });
    }
  };

  const openExternalURL = () => {
    Linking.canOpenURL(viewUrl).then((supported) => {
      if (supported) {
        Linking.openURL(viewUrl);
      }
    });
  };

  return (
    <View style={styles.footer}>
      <View style={[styles.barNavigationContent, showAllToolbarItems && { justifyContent: "space-around" }]}>
        <TouchableIcon
          disabled={!navState?.canGoBack}
          icon={"chevron-left"}
          onPress={() => refWebview.current && refWebview.current!.goBack()}
          color={TotaraTheme.colorLink}
          size={iconSizes.sizeM}
        />
        <TouchableIcon
          disabled={!navState?.canGoForward}
          icon={"chevron-right"}
          onPress={() => refWebview.current && refWebview.current!.goForward()}
          color={TotaraTheme.colorLink}
          size={iconSizes.sizeM}
        />
      </View>
      {showAllToolbarItems && (
        <View style={styles.barExtraActionContent}>
          <TouchableIcon icon={faShareAlt} onPress={onShare} color={TotaraTheme.colorLink} size={iconSizes.sizeM} />
          <TouchableIcon
            icon={Platform.OS === "android" ? (faChrome as IconDefinition) : (faSafari as IconDefinition)}
            onPress={openExternalURL}
            color={TotaraTheme.colorLink}
            size={iconSizes.sizeM}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  footer: {
    backgroundColor: TotaraTheme.colorSecondary1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  barNavigationContent: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "flex-start"
  },
  barExtraActionContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1
  }
});

export default WebviewToolbar;
