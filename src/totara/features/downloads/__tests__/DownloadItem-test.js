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

import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import DownloadItem from "@totara/features/downloads/DownloadItem";
import {
  downloadItemMockAdded,
  downloadItemMockAddedWithKilo
} from "@totara/features/downloads/__mocks__/downloadMock";
import { ResourceState } from "@totara/types/Resource";

describe("DownloadItem", () => {
  it("Should render DownloadItem added, with name, size in megabytes", async () => {
    const itemMega = { ...downloadItemMockAdded };

    const { getByTestId } = render(<DownloadItem item={itemMega} />);

    const test_DownloadItemItemID = await getByTestId("test_DownloadItemItemID");
    expect(test_DownloadItemItemID.props.testID).toBe("test_DownloadItemItemID");

    const test_DownloadItemName = getByTestId("test_DownloadItemName");
    expect(test_DownloadItemName.children[0]).toBe(itemMega.name);

    //TEST FOR MEGA
    const test_DownloadItemSize = getByTestId("test_DownloadItemSize");
    expect(test_DownloadItemSize.children[0]).toBe("1.00MB");
  });

  it("Should render DownloadItem size in kilobytes", async () => {
    const itemKilo = { ...downloadItemMockAddedWithKilo };
    const { getByTestId } = render(<DownloadItem item={itemKilo} />);
    const test_DownloadItemSizeKilo = await getByTestId("test_DownloadItemSize");
    expect(test_DownloadItemSizeKilo.children[0]).toBe("10KB");
  });

  it("Should render DownloadItem with no size defined", async () => {
    const item = { ...downloadItemMockAdded, sizeInBytes: undefined };
    const { getByTestId } = render(<DownloadItem item={item} />);
    const test_DownloadItemSizeKilo = await getByTestId("test_DownloadItemSize");
    expect(test_DownloadItemSizeKilo.children[0]).toBe("...");
  });

  it("Should render DownloadItem WITH NO select option", async () => {
    const item = { ...downloadItemMockAdded };
    const { queryByTestId } = render(<DownloadItem item={item} />);
    expect(await queryByTestId("test_DownloadItemSelectIcon")).toBeNull();
  });

  it("Should render DownloadItem WITH select option", async () => {
    const item = { ...downloadItemMockAdded };
    const { getByTestId } = render(<DownloadItem item={item} selectable={true} />);
    expect(await getByTestId("test_DownloadItemSelectIcon")).toBeTruthy();
  });

  it("Should render DownloadItem with downloading state", async () => {
    const item = { ...downloadItemMockAdded, state: ResourceState.Downloading };
    const { getByTestId } = render(<DownloadItem item={item} />);

    expect(await getByTestId("test_DownloadItemResourceDownloader")).toBeTruthy();
  });

  it("Should press DownloadItem and onItemPressCallback called once ", async () => {
    const item = { ...downloadItemMockAdded };

    const onItemPressCallback = jest.fn();
    const { getByTestId } = render(
      <DownloadItem item={item} onItemPress={onItemPressCallback} testID={"test_DownloadItem"} />
    );

    fireEvent.press(await getByTestId("test_DownloadItem"));

    expect(onItemPressCallback).toHaveBeenCalledTimes(1);
  });

  it("Should longPress DownloadItem and onItemPressCallback called once", async () => {
    const item = { ...downloadItemMockAdded };

    const onItemLongPressCallback = jest.fn();
    const { getByTestId } = render(
      <DownloadItem item={item} onItemLongPress={onItemLongPressCallback} testID={"test_DownloadItem"} />
    );

    fireEvent(await getByTestId("test_DownloadItem"), "longPress");
    expect(onItemLongPressCallback).toHaveBeenCalledTimes(1);
  });
});
