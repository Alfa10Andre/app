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
import { act, render } from "@testing-library/react-native";
import { currentLearningItemExample } from "../__mocks__/currentLearningListView.mock";
import wait from "waait";
import CurrentLearningListViewItem from "@totara/features/currentLearning/learningItems/CurrentLearningListViewItem";
import moment from "moment";
import { TotaraTheme } from "@totara/theme/Theme";
import { translate } from "@totara/locale";
import { capitalizeFirstLetter } from "@totara/lib/tools";

const navigation = {
  navigation: {
    navigate: jest.fn()
  }
};

describe("CurrentLearningListViewItem", () => {
  it("Should render Course item with title 'Example course' and 25% completed", async () => {
    const { getByTestId } = render(
      <CurrentLearningListViewItem item={currentLearningItemExample} navigation={navigation} />
    );

    await act(async () => {
      await wait(0);
    });

    const courseType = await getByTestId("test_CurrentLearningItem_Type");
    expect(courseType.children[0]).toBe(capitalizeFirstLetter(translate("learning_items.course")));

    const title = await getByTestId("test_CurrentLearningItem_Title");
    expect(title.children[0]).toBe("Example course fullname");

    const progress = await getByTestId("test_CurrentLearningItem_Progress");
    const progressPercentage = progress.children[1].children[0].children[0].children[0].children[0];
    expect(progressPercentage).toBe("25%");
  });

  it("Should render Program label type", async () => {
    const mocked = { ...currentLearningItemExample, itemtype: "program" };
    const { getByTestId } = render(<CurrentLearningListViewItem item={mocked} navigation={navigation} />);

    await act(async () => {
      await wait(0);
    });

    const programType = await getByTestId("test_CurrentLearningItem_Type");
    expect(programType.children[0]).toBe(capitalizeFirstLetter(translate("learning_items.program")));
  });

  it("Should render Program certification type", async () => {
    const mocked = { ...currentLearningItemExample, itemtype: "certification" };
    const { getByTestId } = render(<CurrentLearningListViewItem item={mocked} navigation={navigation} />);

    await act(async () => {
      await wait(0);
    });

    const programType = await getByTestId("test_CurrentLearningItem_Type");
    expect(programType.children[0]).toBe(capitalizeFirstLetter(translate("learning_items.certification")));
  });

  it("Should render Course item with due date expired (alert)", async () => {
    const oneDayAgo = moment().utc().add(-1, "day").format("YYYY-MM-DD-HH:mm:ssZZ");
    const mockExpired = { ...currentLearningItemExample, duedate: oneDayAgo, duedateState: "danger" };
    const { getByTestId } = render(<CurrentLearningListViewItem item={mockExpired} navigation={navigation} />);

    await act(async () => {
      await wait(0);
    });

    const duedateComponent = await getByTestId("test_dueDate");
    const color = duedateComponent.props.style.color;
    expect(color).toBe(TotaraTheme.colorAlert);
  });

  it("Should render Course item with about to expire soon (warning)", async () => {
    const aboutToExpireSoonDate = moment().utc().add(10, "day").format("YYYY-MM-DD-HH:mm:ssZZ");
    const mockExpired = { ...currentLearningItemExample, duedate: aboutToExpireSoonDate, duedateState: "warning" };
    const { getByTestId } = render(<CurrentLearningListViewItem item={mockExpired} navigation={navigation} />);

    await act(async () => {
      await wait(0);
    });

    const duedateComponent = await getByTestId("test_dueDate");
    const color = duedateComponent.props.style.color;
    expect(color).toBe(TotaraTheme.colorWarning);
  });

  it("Should render Course item with expire in the future (info)", async () => {
    const willExpireInTheFuture = moment().utc().add(10, "day").format("YYYY-MM-DD-HH:mm:ssZZ");
    const mockExpired = { ...currentLearningItemExample, duedate: willExpireInTheFuture, duedateState: "info" };
    const { getByTestId } = render(<CurrentLearningListViewItem item={mockExpired} navigation={navigation} />);

    await act(async () => {
      await wait(0);
    });

    const duedateComponent = await getByTestId("test_dueDate");
    const color = duedateComponent.props.style.color;
    expect(color).toBe(TotaraTheme.colorInfo);
  });
});
