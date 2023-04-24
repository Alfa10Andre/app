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
import { render } from "@testing-library/react-native";
import NetworkStatusIndicator from "@totara/components/NetworkStatusIndicator";
import { useNetInfo } from "@react-native-community/netinfo";

const offlineState = {
  isConnected: false,
  isInternetReachable: false
};

const onlineState = {
  isConnected: true,
  isInternetReachable: true
};

describe("NetworkStatus", () => {
  test("Should render as offline state", () => {
    useNetInfo.mockReturnValue(offlineState);
    const tree = <NetworkStatusIndicator />;
    const { getByTestId } = render(tree);
    const container = getByTestId("test_container");

    expect(container.children.length).toBe(1);
  });

  test("Should render as online state", async () => {
    useNetInfo.mockReturnValue(onlineState);
    const tree = <NetworkStatusIndicator />;
    const { findByTestId } = render(tree);
    const container = await findByTestId("test_container");

    expect(container.children.length).toBe(0);
  });
});
