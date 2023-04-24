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

import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { WebView, WebViewMessageEvent, WebViewNavigation } from "react-native-webview";
import Orientation from "react-native-orientation-locker";

import { WebviewToolbar } from "@totara/components";
import { TotaraTheme } from "@totara/theme/Theme";
import { SCORM_TEST_IDS } from "@totara/lib/testIds";

type Props = {
  url: string;
  injectScript?: string;
  onMessageHandler?: (data: JSON) => void;
  onExitHandler?: () => void;
};

const { OFFLINE_PLAYER_ID } = SCORM_TEST_IDS;

const OfflineScormPlayer = ({ url, injectScript, onMessageHandler }: Props) => {
  const refWebview = useRef<WebView>(null);
  const [navState, setNavState] = useState<WebViewNavigation>();

  const didReceiveOnMessage = (event: WebViewMessageEvent) => {
    const eventdata = JSON.parse(event.nativeEvent.data);
    onMessageHandler && onMessageHandler(eventdata);
  };

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    setNavState(navState);
  };

  useEffect(() => {
    Orientation.unlockAllOrientations();
    return () => Orientation.lockToPortrait();
  }, []);

  return (
    <SafeAreaView style={styles.playerContainer} testID={OFFLINE_PLAYER_ID}>
      <WebView
        source={{ uri: url }}
        javaScriptEnabled={true}
        onMessage={didReceiveOnMessage}
        injectedJavaScript={injectScript}
        allowsInlineMediaPlayback={true}
        style={styles.player}
        ref={refWebview}
        onNavigationStateChange={onNavigationStateChange}
      />
      <WebviewToolbar refWebview={refWebview} navState={navState} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: TotaraTheme.colorSecondary1
  },
  player: {
    width: "100%"
  }
});

export default OfflineScormPlayer;
