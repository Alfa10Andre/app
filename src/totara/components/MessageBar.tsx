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
import { Text, TextStyle, StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { margins, paddings } from "@totara/theme/constants";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { TotaraTheme } from "@totara/theme/Theme";

type MessageBarProps = {
  text: string;
  icon?: IconProp;
  mode?: "info" | "alert";
  style?: TextStyle;
  testID?: string;
};

const MessageBar = ({ text, icon = faInfoCircle, mode = "info", style, testID }: MessageBarProps) => {
  let backgroundStyle = { backgroundColor: TotaraTheme.colorInfo };
  let textStyle = [TotaraTheme.textSmall, styles.content, { color: TotaraTheme.colorNeutral1 }];
  if (style) {
    textStyle.push(style);
  }
  if (mode === "alert") {
    backgroundStyle.backgroundColor = TotaraTheme.colorAlert;
  }

  return (
    <View style={[styles.container, backgroundStyle]} testID={testID}>
      {icon && <FontAwesomeIcon icon={icon} size={textStyle.fontSize} style={[styles.content, textStyle]} />}
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: paddings.paddingM,
    flexDirection: "row"
  },
  content: {
    marginRight: margins.marginS,
    alignSelf: "center"
  }
});

export default MessageBar;
