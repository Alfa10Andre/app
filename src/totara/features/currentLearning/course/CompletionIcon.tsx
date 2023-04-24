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
import { StyleSheet, TouchableOpacity } from "react-native";
import { CircleIcon } from "@totara/components";
import { iconSizes, margins } from "@totara/theme/constants";
import { Spinner } from "native-base";
import { getCompletionStatus } from "../utils";

type BuildContentProps = {
  completion?: string;
  status?: string;
  available: boolean;
  loading?: boolean;
  onPress?: () => void;
  onGetCompletionStatus?: Function;
};

const CompletionIcon = ({
  completion,
  status,
  available,
  loading,
  onPress,
  onGetCompletionStatus = getCompletionStatus
}: BuildContentProps) => {
  const isDisabled = loading || !onPress;
  const completionStatusData = onGetCompletionStatus({
    available,
    completion,
    status
  });
  if (!completionStatusData) {
    return null;
  } else {
    const { stateObj, accessibility } = completionStatusData;

    const accessibleLable = accessibility?.label;
    const accessibleRole = accessibility?.role;
    const accessibleState = loading ? { busy: true } : accessibility?.state;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ marginRight: margins.marginL }}
        disabled={isDisabled}
        accessibilityLabel={accessibleLable}
        accessibilityRole={accessibleRole}
        accessibilityState={accessibleState}
        accessible={true}>
        {loading ? (
          <Spinner size={iconSizes.sizeM} style={styles.spinner} />
        ) : (
          <CircleIcon
            icon={stateObj.icon}
            backgroundColor={stateObj.backgroundColor}
            iconColor={stateObj.iconColor}
            borderColor={stateObj.borderColor}
            fontAwesomeIcon={stateObj.fontAwesomeIcon}
          />
        )}
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  spinner: {
    height: iconSizes.sizeM,
    width: iconSizes.sizeM
  }
});
export default CompletionIcon;
