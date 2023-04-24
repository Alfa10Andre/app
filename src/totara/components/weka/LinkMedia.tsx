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
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import { isEmpty } from "lodash";
import { TotaraTheme } from "@totara/theme/Theme";
import { useSession } from "@totara/core";
import { getHostnameFromRegex, getUrlLastComponentFromRegex } from "@totara/lib/tools";
import { ConfigProps } from "./Wekautils";
import ImageViewerWrapper from "./ImageViewerWrapper";
import styles from "./wekaStyle";
import EmbeddedMedia from "./EmbeddedMedia";
import { AUTH_HEADER_FIELD } from "@totara/lib/constants";

const VIMEO_URL_PREFIX = "https://player.vimeo.com/video/";

enum HostName {
  youtube = "www.youtube.com",
  vimeo = "vimeo.com"
}

const LinkMedia = ({ content = {}, textColor = TotaraTheme.colorNeutral8 }: ConfigProps) => {
  return (
    <View>
      {!isEmpty(content?.attrs?.title) && (
        <Text numberOfLines={2} style={[styles.linkMediaTitle, { color: textColor }]} testID="test_media_title">
          {content.attrs.title}
        </Text>
      )}
      {!isEmpty(content?.attrs?.url) && (
        <View testID="test_media_content">
          {content.attrs.url.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
            <ImageViewerWrapper url={content.attrs.url} fileName="" />
          ) : content.attrs.url.match(/\.(?:wav|mp3)$/i) != null ? (
            <EmbeddedMedia content={content.attrs} title="Audio file" />
          ) : (
            <WebViewWrapper content={content} />
          )}
        </View>
      )}
      {!isEmpty(content?.attrs?.description) && (
        <Text style={[styles.linkMediaDescription, { color: textColor }]} testID="test_media_description">
          {content.attrs.description}
        </Text>
      )}
    </View>
  );
};

const WebViewWrapper = ({ content = {} }: ConfigProps) => {
  const { apiKey } = useSession();

  let url = content.attrs.url;
  const hostName = getHostnameFromRegex(url);
  // App only support for youtube and vimeo video insert link, and there is configuration for make a full screen video
  hostName === HostName.youtube && (url = url.split("watch?v=").join("embed/"));
  hostName === HostName.vimeo && (url = VIMEO_URL_PREFIX + getUrlLastComponentFromRegex(url));

  const handleWebViewRequest = (request) => {
    if (url === request.url) {
      return true;
    } else return false;
  };
  return (
    <View style={styles.linkMediaContainer}>
      <WebView
        style={styles.webViewWrapper}
        javaScriptEnabled={true}
        domStorageEnabled={false}
        originWhitelist={["*"]}
        scrollEnabled={false}
        allowsInlineMediaPlayback={true}
        allowsFullscreenVideo={true}
        onShouldStartLoadWithRequest={(request) => {
          return handleWebViewRequest(request);
        }}
        source={{
          uri: url,
          headers: {
            [AUTH_HEADER_FIELD]: apiKey
          }
        }}
      />
    </View>
  );
};

export default LinkMedia;
