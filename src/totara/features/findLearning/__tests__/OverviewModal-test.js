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
import { render, act } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/client/testing";
import { useRoute } from "@react-navigation/native";
import wait from "waait";

import { OverviewModal } from "./../OverviewModal";
import { enrolmentOptionsMock } from "./../../enrolment/api/enrolmentOptions.mock";
import { translate } from "@totara/locale";

describe("Find Learning - Overview Modal", () => {
  it("Should render loading state", async () => {
    useRoute.mockReturnValue({
      params: {
        itemid: 1
      }
    });

    const tree = (
      <MockedProvider mocks={enrolmentOptionsMock}>
        <OverviewModal />
      </MockedProvider>
    );
    const { getByTestId } = render(tree);

    const widget = await getByTestId("enrolment_modal_loading");
    expect(widget).toBeTruthy();
  });

  it("Should render 'You are enrolled to this course' and 'Go to course' button", async () => {
    useRoute.mockReturnValue({
      params: {
        itemid: 1
      }
    });

    const tree = (
      <MockedProvider mocks={enrolmentOptionsMock}>
        <OverviewModal />
      </MockedProvider>
    );
    const { getByTestId } = render(tree);

    await act(async () => {
      await wait(0);
    });

    const widgetEnrolmentStatus = await getByTestId("enrolment_modal_status_text");
    expect(widgetEnrolmentStatus.children[0]).toBe(translate("find_learning_overview.you_are_enrolled"));

    const widgetEnrolmentButton = await getByTestId("enrolment_modal_status_button");
    expect(widgetEnrolmentButton).toBeTruthy();
  });

  it("Should render 'You can enrol to this course' and 'Go to course' button", async () => {
    useRoute.mockReturnValue({
      params: {
        itemid: 2
      }
    });

    const tree = (
      <MockedProvider mocks={enrolmentOptionsMock}>
        <OverviewModal />
      </MockedProvider>
    );
    const { getByTestId, queryByTestId } = render(tree);

    await act(async () => {
      await wait(0);
    });

    const widgetEnrolmentStatus = await getByTestId("enrolment_modal_status_text");
    expect(widgetEnrolmentStatus.children[0]).toBe(translate("find_learning_overview.you_can_enrol"));

    const widgetEnrolmentButton = await queryByTestId("enrolment_modal_status_button");
    expect(widgetEnrolmentButton).toBeTruthy();
  });

  it("Should render 'You are not enroled to this course' and don't render 'Go to course' button", async () => {
    useRoute.mockReturnValue({
      params: {
        itemid: 3
      }
    });

    const tree = (
      <MockedProvider mocks={enrolmentOptionsMock}>
        <OverviewModal />
      </MockedProvider>
    );
    const { getByTestId, queryByTestId } = render(tree);

    await act(async () => {
      await wait(0);
    });

    const widgetEnrolmentStatus = await getByTestId("enrolment_modal_status_text");
    expect(widgetEnrolmentStatus.children[0]).toBe(translate("find_learning_overview.you_are_not_enrolled"));

    const widgetEnrolmentButton = await queryByTestId("enrolment_modal_status_button");
    expect(widgetEnrolmentButton).toBeNull();
  });

  it("Should render 'Go to course' for privileged user", async () => {
    useRoute.mockReturnValue({
      params: {
        itemid: 4
      }
    });

    const tree = (
      <MockedProvider mocks={enrolmentOptionsMock}>
        <OverviewModal />
      </MockedProvider>
    );
    const { getByTestId } = render(tree);

    await act(async () => {
      await wait(0);
    });

    const widgetEnrolmentButton = await getByTestId("enrolment_modal_status_button");
    expect(widgetEnrolmentButton).toBeTruthy();
  });

  it("Should render error state", async () => {
    useRoute.mockReturnValue({
      params: {
        itemid: 0
      }
    });

    const tree = (
      <MockedProvider mocks={enrolmentOptionsMock}>
        <OverviewModal />
      </MockedProvider>
    );
    const { getByTestId } = render(tree);

    await act(async () => {
      await wait(0);
    });

    const widget = await getByTestId("enrolment_modal_loading_error");
    expect(widget).toBeTruthy();
  });
});
