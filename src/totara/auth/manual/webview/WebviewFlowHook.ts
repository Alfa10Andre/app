/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2019 onwards Totara Learning Solutions LTD
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

import { useState, useEffect } from "react";
import { WebViewMessageEvent, WebViewNavigation } from "react-native-webview/lib/WebViewTypes";
import CookieManager from "@react-native-cookies/cookies";

import { config } from "@totara/lib";
import { ManualFlowChildProps } from "@totara/auth/manual/ManualFlowChildProps";

export const useWebviewFlow = ({ siteUrl }: ManualFlowChildProps) => {
  const getProtocolEndpoint = (url: string) => url.split("://");

  const didReceiveOnMessage = (event: WebViewMessageEvent) => {
    const setupSecretValue = event.nativeEvent.data;
    if (typeof setupSecretValue !== "undefined" && setupSecretValue != "null" && setupSecretValue) {
      setsetupSecret(setupSecretValue);
    }
  };

  const onLogViewNavigate = (navState: WebViewNavigation) => {
    setCanWebGoBackward(navState.canGoBack);
    setCanWebGoForward(navState.canGoForward);
    const spiltedUrl = getProtocolEndpoint(navState.url);
    setNavProtocol(spiltedUrl[0]);
    setNavEndPoint(spiltedUrl[1]);
  };

  const loginUrl = config.loginUri(siteUrl);

  const spiltedLoginUrl = getProtocolEndpoint(loginUrl);
  const [navProtocol, setNavProtocol] = useState(spiltedLoginUrl[0]);
  const [navEndPoint, setNavEndPoint] = useState(spiltedLoginUrl[1]);

  const [canWebGoBackward, setCanWebGoBackward] = useState(false);
  const [canWebGoForward, setCanWebGoForward] = useState(false);
  const [setupSecret, setsetupSecret] = useState("");

  useEffect(() => {
    return () => {
      CookieManager.clearAll(true);
    };
  }, []);

  return {
    loginUrl,
    navProtocol,
    navEndPoint,
    canWebGoBackward,
    canWebGoForward,
    didReceiveOnMessage,
    onLogViewNavigate,
    setupSecret
  };
};
