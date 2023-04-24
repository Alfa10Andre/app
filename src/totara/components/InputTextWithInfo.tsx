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

import React, { useContext } from "react";
import { View, StyleSheet, ViewStyle, Text } from "react-native";
import { Item, Label } from "native-base";

import { ThemeContext } from "@totara/theme";

type Props = {
  children?: Element;
  placeholder?: string;
  value?: string;
  message?: string;
  onPress?: () => void;
  status?: "success" | "focus" | "error";
  style?: ViewStyle;
};

const InfoText = ({ status, message }: Props) => {
  const theme = useContext(ThemeContext);
  const stylesInfo = StyleSheet.create({
    hide: {
      opacity: 0
    },
    success: {
      color: theme.colorSuccess,
      opacity: 1
    },
    error: {
      color: theme.colorAlert,
      opacity: 1
    },
    focus: {
      color: theme.colorInfo,
      opacity: 0
    }
  });

  switch (status) {
    case "success":
      return <Text style={[theme.textSmall, stylesInfo.success]}>{message}</Text>;
    case "error":
      return <Text style={[theme.textSmall, stylesInfo.error]}>{message}</Text>;
    case "focus":
      return <Text style={[theme.textSmall, stylesInfo.focus]}>{message}</Text>;
    default:
      return <Text style={[theme.textSmall, stylesInfo.hide]}>{message}</Text>;
  }
};

const InputTextWithInfo = ({ children, placeholder, message, status, style, ...rest }: Props) => {
  const theme = useContext(ThemeContext);
  const floatingLabelStyles = StyleSheet.create({
    item: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 0,
      paddingRight: 0,
      borderBottomColor: status === "error" ? theme.colorAlert : theme.colorNeutral6
    }
  });

  return (
    <View style={{ marginBottom: 8 }}>
      <Item
        floatingLabel
        {...rest}
        success={status === "success"}
        error={status === "error"}
        style={[style, floatingLabelStyles.item]}>
        <Label
          style={{
            fontSize: theme.textXSmall.fontSize,
            color: theme.colorNeutral6
          }}>
          {placeholder}
        </Label>
        {children}
      </Item>
      <InfoText status={status} message={message} />
    </View>
  );
};

export default InputTextWithInfo;
