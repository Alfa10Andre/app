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

import ViewMoreText from "react-native-view-more-text";
import React, { useContext } from "react";
import { StyleSheet, Text, View, TextStyle } from "react-native";
import { ThemeContext } from "@totara/theme";
type MoreTextProps = {
  longText: string;
  style?: TextStyle;
};
const MoreText = ({ longText, style }: MoreTextProps) => {
  const theme = useContext(ThemeContext);
  const renderViewMore = (event: () => void) => {
    return (
      <View style={styles.moreLessContainer}>
        <Text onPress={event} style={{ color: theme.colorLink }}>
          more
        </Text>
      </View>
    );
  };

  const renderViewLess = (event: () => void) => {
    return (
      <View style={styles.moreLessContainer}>
        <Text style={{ color: theme.colorLink }} onPress={event}>
          less
        </Text>
      </View>
    );
  };

  return (
    <ViewMoreText
      numberOfLines={5}
      renderViewMore={renderViewMore}
      renderViewLess={renderViewLess}
      textStyle={{ textAlign: "justify" }}>
      <Text style={style}>{longText}</Text>
    </ViewMoreText>
  );
};

const styles = StyleSheet.create({
  moreLessContainer: {
    display: "flex",
    width: "100%",
    alignItems: "flex-end"
  }
});

export default MoreText;
