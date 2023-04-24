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

import { Icons } from "@resources/icons";
import { paddings } from "@totara/theme/constants";
import React from "react";
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity } from "react-native";

const CloseButton = ({ onPress, testID, disabled }: { onPress; disabled?: boolean; testID?: string }) => {
  return (
    <TouchableOpacity testID={testID} onPress={onPress} disabled={disabled} style={style.icon}>
      <Image source={Icons.closeIcon as ImageSourcePropType} />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  icon: {
    paddingLeft: paddings.paddingL
  }
});

export default CloseButton;
