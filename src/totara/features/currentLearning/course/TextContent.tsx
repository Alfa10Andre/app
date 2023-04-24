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
import { Text, View } from "react-native";
import activitiesStyles from "./activitiesStyles";

type LabelProps = {
  label: string;
};
const TextContent = ({ label }: LabelProps) => {
  const text = validationProperty(label);
  return text ? (
    <View style={activitiesStyles.labelContainer}>
      <Text style={activitiesStyles.labelTextDescription}>{text}</Text>
    </View>
  ) : null;
};

const validationProperty = (label: string) => {
  return label && label.trim().length > 0 && label.trim();
};

export default TextContent;
