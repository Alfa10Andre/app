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
import { StyleSheet, View, Image } from "react-native";

import { iconSizes } from "@totara/theme/constants";
// @ts-ignore no types published yet for fortawesome react-native, they do have it react so check in future and remove this ignore
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TotaraTheme } from "@totara/theme/Theme";

type Props = {
  icon?: any;
  backgroundColor?: string;
  iconColor?: string;
  borderColor?: string;
  fontAwesomeIcon?: boolean;
};

const CircleIcon = ({ icon, backgroundColor, iconColor, borderColor, fontAwesomeIcon = true }: Props) => {
  return (
    <View
      style={[
        styles.iconCircle,
        {
          backgroundColor: backgroundColor == null ? TotaraTheme.textColorDark : backgroundColor,
          borderColor: borderColor == null ? TotaraTheme.textColorDark : borderColor
        }
      ]}>
      {icon &&
        (fontAwesomeIcon ? (
          <FontAwesomeIcon
            icon={icon}
            size={iconSizes.sizeM / 2}
            color={iconColor == null ? TotaraTheme.colorAccent : iconColor}
          />
        ) : (
          <Image source={icon}></Image>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  iconCircle: {
    borderRadius: iconSizes.sizeM / 2,
    borderWidth: 1,
    height: iconSizes.sizeM,
    width: iconSizes.sizeM,
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CircleIcon;
