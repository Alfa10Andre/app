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
import { act, cleanup, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import Downloads from "@totara/features/downloads/Downloads";
import * as ReactRedux from "react-redux";
import { downloadsOneItemMock, downloadsTwoItemsMock } from "@totara/features/downloads/__mocks__/downloadMock";
import wait from "waait";

const navigationMock = {
  navigation: {
    setOptions: jest.fn(),
    navigate: jest.fn()
  }
};

describe("Downloads", () => {
  afterEach(async () => {
    cleanup();
  });

  it("Should render Downloads empty state", async () => {
    jest.spyOn(ReactRedux, "useSelector").mockImplementation(() => {
      return [];
    });

    const { getByTestId } = render(<Downloads navigation={navigationMock.navigation} />);

    const test_DownloadsEmptyState = await getByTestId("test_DownloadsEmptyState");
    expect(test_DownloadsEmptyState).toBeTruthy();
  });

  it("Should render Downloads with two items state", async () => {
    jest.spyOn(ReactRedux, "useSelector").mockImplementation(() => {
      return downloadsTwoItemsMock;
    });

    const { getAllByTestId } = render(<Downloads navigation={navigationMock.navigation} />);

    const testItems = await getAllByTestId("test_DownloadsItem");
    expect(testItems.length).toBe(2);
  });

  it("Should item be able be pressed for navigation", async () => {
    const navigation = navigationMock.navigation;
    jest.spyOn(ReactRedux, "useSelector").mockImplementation(() => {
      return downloadsOneItemMock;
    });

    const { getByTestId } = render(<Downloads navigation={navigation} />);
    await act(async () => {
      await wait(0);
    });

    const itemTest = await getByTestId("test_DownloadsItem");
    fireEvent.press(itemTest);

    expect(navigation.navigate).toBeCalled();
  });

  it("Should item be able be long pressed for select", async () => {
    const navigation = navigationMock.navigation;
    jest.spyOn(ReactRedux, "useSelector").mockImplementation(() => {
      return downloadsOneItemMock;
    });

    const { getByTestId } = render(<Downloads navigation={navigation} />);
    await act(async () => {
      await wait(0);
    });

    const itemTest = await getByTestId("test_DownloadsItem");
    fireEvent(itemTest, "longPress");
  });
});
