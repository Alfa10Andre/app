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

import React, { ReactNode, useContext } from "react";
import { Text, StyleSheet, ViewStyle } from "react-native";
import { Button } from "native-base";
import { ThemeContext } from "@totara/theme";
import { borderRadius, paddings } from "@totara/theme/constants";

type Props = {
  children?: ReactNode;
  text?: string;
  style?: ViewStyle;
  onPress?: () => void;
  testID?: string;
};

const TertiaryButton = ({ text = "", style, onPress, testID, ...rest }: Props) => {
  const theme = useContext(ThemeContext);

  return (
    <Button block rounded transparent testID={testID} onPress={onPress} style={[styles.button, style]} {...rest}>
      <Text
        style={{
          color: theme.colorLink,
          fontSize: theme.textSmall.fontSize
        }}>
        {text}
      </Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    paddingHorizontal: paddings.paddingXL,
    borderRadius: borderRadius.borderRadiusXS
  }
});

export default TertiaryButton;
