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
import moment from "moment";
import * as ReactRedux from "react-redux";
import NotificationDetails from "@totara/features/notifications/NotificationDetail";

describe("NotificationDetails", () => {

  jest.spyOn(ReactRedux, "useSelector").mockImplementation(() => {
    return {
      siteInfo: {
        version: "1.0"
      },
      host: 'https://mobile.demo.totara.software'
    };
  });

  const defaultMockItem = {
    id: "123",
    isRead: false,
    subject: "subject text",
    fullMessage: "fullMessage text",
    timeCreated: moment().utc().unix(),
    fullMessageFormat: "PLAIN"
  };

  it("Should render with title, time ago, and full message", () => {
    const itemToBeTested = { ...defaultMockItem };

    const route = {
      params: {
        ...itemToBeTested
      }
    };

    const { getByTestId } = render(
      <NotificationDetails route={route} />
    );

    const labelTitle = getByTestId("test_title");
    expect(labelTitle.children[0]).toBe(itemToBeTested.subject);

    const labelTimeCreated = getByTestId("test_timeCreated");
    expect(labelTimeCreated.children[0]).toBe("a few seconds ago");

    const labelFullMessage = getByTestId("test_fullMessage");
    expect(labelFullMessage.children[0]).toBe(itemToBeTested.fullMessage);
  });
});
