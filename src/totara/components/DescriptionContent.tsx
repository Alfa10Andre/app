/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2021 onwards Totara Learning Solutions LTD
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
import { Linking, StyleSheet, Text } from "react-native";

import { DescriptionFormat } from "@totara/types/LearningItem";
import { WekaContent } from "./weka/WekaContent";
import WebView from "react-native-webview";
import { isValidUrlText } from "@totara/lib/tools";
import { DESCRIPTIONCONTENT_TEST_IDS } from "@totara/lib/testIds";
import { TotaraTheme } from "@totara/theme/Theme";
import { margins } from "@totara/theme/constants";

type DescriptionContentProps = {
  contentType: DescriptionFormat;
  content?: any;
  testID?: string;
  source?: any;
};

const onLoadWithRequestExternalBrowser = (event) => {
  if (isValidUrlText(event.url)) {
    Linking.openURL(event.url);
    return false;
  }
  return true;
};

// This will return component accordingly contentType(HTML, JSON_EDITOR or PLAIN_TEXT)
export const DescriptionContent = ({ contentType, content, testID, source }: DescriptionContentProps) => {
  const { container } = styles;

  /*eslint no-fallthrough: ["error", { "commentPattern": "break[\\s\\w]*omitted" }]*/
  switch (contentType) {
    case DescriptionFormat.jsonEditor:
      return <WekaContent content={content} testID={testID || DESCRIPTIONCONTENT_TEST_IDS.WEKA} style={container} />;
    case DescriptionFormat.html:
      if (source && source.html) {
        return (
          <WebView
            source={source}
            style={container}
            onShouldStartLoadWithRequest={onLoadWithRequestExternalBrowser}
            testID={testID || DESCRIPTIONCONTENT_TEST_IDS.WEB}
          />
        );
      }
    // caution: break is omitted intentionally
    default:
      return (
        <Text testID={testID || DESCRIPTIONCONTENT_TEST_IDS.TEXT} style={{ ...TotaraTheme.textSmall, ...container }}>
          {content}
        </Text>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: margins.marginL
  }
});
