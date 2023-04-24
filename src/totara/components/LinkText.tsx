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
import { Text, TextStyle, TouchableOpacity } from "react-native";

import { ThemeContext } from "@totara/theme";

type Props = {
  children?: Element;
  text?: string;
  style?: TextStyle;
  onPress?: () => void;
};

const LinkText = ({ text, style, onPress, children, ...rest }: Props) => {
  const theme = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[{ fontSize: 16, color: theme.colorLink }, style]} {...rest}>
        {children ? children : text}
      </Text>
    </TouchableOpacity>
  );
};
export default LinkText;
