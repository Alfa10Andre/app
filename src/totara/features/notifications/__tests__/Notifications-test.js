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
import { MockedProvider } from "@apollo/client/testing";
import { render, act, fireEvent, waitFor } from "@testing-library/react-native";
import wait from "waait";

import Notifications from "@totara/features/notifications/Notifications";
import {
  notificationsMock,
  notificationsMockEmpty,
  notificationsMockUnRead,
  notificationsMockError
} from "@totara/features/notifications/api/notifications.mock";
import { fontWeights } from "@totara/theme/constants";
import { TEST_IDS } from "../../../lib/testIds";
import { notificationQueryMarkRead } from "@totara/features/notifications/api";

const navigationMock = {
  navigation: {
    setOptions: jest.fn(),
    navigate: jest.fn()
  }
};

describe("Notifications", () => {
  test("Should render loading", async () => {
    const tree = (
      <MockedProvider mocks={notificationsMock}>
        <Notifications navigation={navigationMock.navigation} />
      </MockedProvider>
    );

    const { getByTestId } = render(tree);
    const loading = await getByTestId("test_loading");
    expect(loading).toBeTruthy();
  });

  test("Should render message bar", async () => {
    const tree = (
      <MockedProvider mocks={notificationsMockError}>
        <Notifications navigation={navigationMock.navigation} />
      </MockedProvider>
    );

    const { getByTestId } = render(tree);
    await act(async () => {
      await wait(0);
    });
    const loadingError = await getByTestId(TEST_IDS.MESSAGE_ERROR_ID);
    expect(loadingError).toBeTruthy();
  });

  test("Should render empty list", async () => {
    const tree = (
      <MockedProvider mocks={notificationsMockEmpty}>
        <Notifications navigation={navigationMock.navigation} />
      </MockedProvider>
    );

    const { getByTestId } = render(tree);
    await act(async () => {
      await wait(0);
    });
    const emptyListContainer = await getByTestId("test_notificationsEmptyContainer");
    expect(emptyListContainer).toBeTruthy();
  });

  test("Should render result list", async () => {
    const tree = (
      <MockedProvider mocks={notificationsMock}>
        <Notifications navigation={navigationMock.navigation} />
      </MockedProvider>
    );

    const { getByTestId } = render(tree);
    await act(async () => {
      await wait(0);
    });
    const notificationsList = await getByTestId("test_notificationsList");
    expect(notificationsList).toBeTruthy();
  }, 30000); // Increased timeout to avoid concurrency related failures for slower workstations

  test("Should render unread item", async () => {
    const tree = (
      <MockedProvider mocks={notificationsMockUnRead}>
        <Notifications navigation={navigationMock.navigation} />
      </MockedProvider>
    );

    const { findAllByTestId } = render(tree);
    await act(async () => {
      await wait(0);
    });

    const [title1] = await findAllByTestId("test_title");

    const fontWeight = title1.props.style[0].fontWeight;
    expect(fontWeight).toBe(fontWeights.fontWeightBold);
  });

  test("Should should toggle selectable", async () => {
    const tree = (
      <MockedProvider mocks={notificationsMockUnRead}>
        <Notifications navigation={navigationMock.navigation} />
      </MockedProvider>
    );

    const { getAllByTestId } = render(tree);
    const [unReadItem1] = await waitFor(() => getAllByTestId("test_notificationItem"));
    fireEvent(unReadItem1, "longPress");
  });

  test("Should mark as read", async () => {
    const mocks = [
      ...notificationsMockUnRead,
      {
        request: {
          query: notificationQueryMarkRead,
          variables: {
            input: {
              message_ids: ["1"]
            }
          }
        },
        newData: jest.fn(() => {
          return { data: { ...notificationsMock[0].result.data } };
        })
      }
    ];

    const tree = (
      <MockedProvider mocks={mocks}>
        <Notifications navigation={navigationMock.navigation} />
      </MockedProvider>
    );

    const { getAllByTestId } = render(tree);
    await act(async () => {
      await wait(0);
    });
    const unReadItem1 = await getAllByTestId("test_notificationItem")[0];

    fireEvent.press(unReadItem1);
    await act(async () => {
      await wait(0);
      const readMutation = mocks[1].newData;
      await expect(readMutation).toHaveBeenCalledTimes(1);
    });
  });
});
