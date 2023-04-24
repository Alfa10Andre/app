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
import NotificationItem from "@totara/features/notifications/NotificationItem";
import { render } from "@testing-library/react-native";
import { fontWeights } from "@totara/theme/constants";
import moment from "moment";

describe("NotificationItem", () => {
  const defaultMockItem = {
    id: "123",
    isRead: false,
    subject: "subject text",
    fullMessage: "fullMessage text",
    timeCreated: 123,
    fullMessageFormat: "PLAIN"
  };

  it("Should show as not read", async () => {
    const itemToBeTested = { ...defaultMockItem };
    const { getByTestId } = render(<NotificationItem item={itemToBeTested} />);

    const titleLabel = await getByTestId("test_title");
    const secondStyleAdded = titleLabel.props.style[1];
    expect(secondStyleAdded).toBe(false);
  });

  it("Should show as read", async () => {
    const itemToBeTested = { ...defaultMockItem, isRead: true };
    const { getByTestId } = render(<NotificationItem item={itemToBeTested} />);

    const titleLabel = getByTestId("test_title");
    const secondStyleAdded = await titleLabel.props.style[1];
    expect(secondStyleAdded.fontWeight).toBe(fontWeights.fontWeightRegular);
  });

  it("Should match title", async () => {
    const targetValue = "this is a test";
    const itemToBeTested = { ...defaultMockItem, subject: targetValue };
    const { getByTestId } = render(<NotificationItem item={itemToBeTested} />);

    const titleLabel = await getByTestId("test_title");
    const childValue = titleLabel.children[0];
    expect(childValue).toBe(targetValue);
  });

  it("Should match 'time ago' with 'a few seconds ago'", async () => {
    const itemToBeTested = {
      ...defaultMockItem,
      timeCreated: moment().utc().unix()
    };

    const { getByTestId } = render(<NotificationItem item={itemToBeTested} />);
    const timeAgoLabel = await getByTestId("test_timeCreated");
    const childValue = timeAgoLabel.children[0];
    expect(childValue).toBe("a few seconds ago");
  });

  it("Should show checkbox option for the select action", async () => {
    const { getByTestId } = render(<NotificationItem item={defaultMockItem} selectable={true} />);
    const checkBoxView = await getByTestId("test_checkbox");
    expect(checkBoxView).toBeTruthy();
  });
});
