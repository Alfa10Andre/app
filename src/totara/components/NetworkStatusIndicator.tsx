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
import MessageBar from "@totara/components/MessageBar";
import { View } from "react-native";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { useNetInfo } from "@react-native-community/netinfo";

const NetworkStatusIndicator = () => {
  const { isConnected, isInternetReachable } = useNetInfo();
  const messageNotConnected = "You are not connected to the internet";
  const messageConnecting = "Connecting...";
  return (
    <View testID={"test_container"}>
      {(!isConnected || (isConnected && !isInternetReachable)) && (
        <MessageBar
          testID={"test_messageBar"}
          text={!isConnected ? messageNotConnected : messageConnecting}
          icon={faBolt}
        />
      )}
    </View>
  );
};

export default NetworkStatusIndicator;
