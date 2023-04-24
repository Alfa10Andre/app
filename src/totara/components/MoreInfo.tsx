/**
 * This file is part of Totara Enterprise Extensions.
 *
 * Copyright (C) 2020 onwards Totara Learning Solutions LTD
 *
 * Totara Enterprise Extensions is provided only to Totara
 * Learning Solutions LTD's customers and partners, pursuant to
 * the terms and conditions of a separate agreement with Totara
 * Learning Solutions LTD or its affiliate.
 *
 * If you do not have an agreement with Totara Learning Solutions
 * LTD, you may not access, use, modify, or distribute this software.
 * Please contact [licensing@totaralearning.com] for more information.
 */

import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TotaraTheme } from "@totara/theme/Theme";
import { iconSizes, paddings } from "@totara/theme/constants";

type MoreInfoProps = {
  onPress(): void;
  testID?: string;
};

const MoreInfo = ({ onPress, testID }: MoreInfoProps) => {
  return (
    <TouchableOpacity onPress={onPress} testID={testID}>
      <View style={styles.rounded}>
        <FontAwesomeIcon icon={"info"} color={TotaraTheme.colorLink} size={iconSizes.sizeXS} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rounded: {
    borderRadius: iconSizes.sizeXS,
    borderWidth: 1,
    borderColor: TotaraTheme.colorLink,
    padding: paddings.paddingS
  }
});

export default MoreInfo;
