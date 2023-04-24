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

import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

import { paddings } from "@totara/theme/constants";

type Props = {
  icon: IconDefinition | string;
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
  size?: number;
  style?: ViewStyle;
  testID?: string;
};

const TouchableIcon = ({ icon, onPress, disabled, size, style, testID, ...rest }: Props) => {
  return (
    <TouchableOpacity testID={testID} onPress={onPress} style={[styles.container, style]} disabled={disabled}>
      <FontAwesomeIcon icon={icon as IconDefinition} size={size} {...rest} style={{ opacity: disabled ? 0.5 : 1 }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: paddings.paddingL
  }
});

export default TouchableIcon;
