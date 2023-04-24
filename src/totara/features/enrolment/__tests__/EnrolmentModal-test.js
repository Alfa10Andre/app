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
import { render, act, fireEvent } from "@testing-library/react-native";
import { EnrolmentModal } from "./../EnrolmentModal";
import { MockedProvider } from "@apollo/client/testing";
import { enrolmentOptionsMock, enrolmentOptionsMockError } from "./../api/enrolmentOptions.mock";
import wait from "waait";
import { useRoute } from "@react-navigation/native";
import { translate } from "@totara/locale";

describe("Enrolment Options", () => {
  test("Should render loading widget", async () => {
    useRoute.mockReturnValue({
      params: {
        targetId: 1
      }
    });

    const { getByTestId } = render(
      <MockedProvider mocks={enrolmentOptionsMock}>
        <EnrolmentModal />
      </MockedProvider>
    );

    const widget = getByTestId("loading_enrolment_data");
    expect(widget).toBeTruthy();
  });

  test("Should render loading error", async () => {
    useRoute.mockReturnValue({
      params: {
        targetId: 1
      }
    });

    const { getByTestId } = render(
      <MockedProvider mocks={enrolmentOptionsMockError}>
        <EnrolmentModal />
      </MockedProvider>
    );

    await act(async () => {
      await wait(0);
    });

    const widget = await getByTestId("loading_error");
    expect(widget).toBeTruthy();
  });

  test("Should render guest widget", async () => {
    useRoute.mockReturnValue({
      params: {
        targetId: 1
      }
    });

    const { getByTestId } = render(
      <MockedProvider mocks={enrolmentOptionsMock}>
        <EnrolmentModal />
      </MockedProvider>
    );

    await act(async () => {
      await wait(0);
    });

    const widget = getByTestId("guest_access_widget");
    expect(widget).toBeTruthy();
  });

  test("Should render self enrolment widget - learner", async () => {
    const id = 4;
    useRoute.mockReturnValue({
      params: {
        targetId: id
      }
    });

    const { getByTestId } = render(
      <MockedProvider mocks={enrolmentOptionsMock}>
        <EnrolmentModal />
      </MockedProvider>
    );

    await act(async () => {
      await wait(0);
    });

    const widgetTitle = getByTestId(`self_enrolment_title`);
    expect(widgetTitle.props.children).toBe(
      translate("enrolment_options.self_enrolment_title", { roleName: "Learner" })
    );
  });

  test("Should render self enrolment widget - requires enrolment key", async () => {
    const id = 4;
    useRoute.mockReturnValue({
      params: {
        targetId: id
      }
    });

    const { getByTestId } = render(
      <MockedProvider mocks={enrolmentOptionsMock}>
        <EnrolmentModal />
      </MockedProvider>
    );

    await act(async () => {
      await wait(0);
    });

    const widgetEnrolmentKey = getByTestId(`self_enrolment_key`);
    expect(widgetEnrolmentKey).toBeTruthy();
  });

  test("Should render two self enrolment widgets in sorting order", async () => {
    const id = 5;
    useRoute.mockReturnValue({
      params: {
        targetId: id
      }
    });

    const { findAllByTestId } = render(
      <MockedProvider mocks={enrolmentOptionsMock}>
        <EnrolmentModal />
      </MockedProvider>
    );

    await act(async () => {
      await wait(0);
    });

    const widgetEnrolmentTitle = await findAllByTestId("self_enrolment_title");
    expect(widgetEnrolmentTitle.length).toBe(2);

    const [firstTitle, secondTitle] = widgetEnrolmentTitle;

    expect(firstTitle.props.children).toBe("self enrolment 1");
    expect(secondTitle.props.children).toBe("self enrolment 2");
  });

  test("Should not allow enrolment to key be empty when required", async () => {
    const id = 4;
    useRoute.mockReturnValue({
      params: {
        targetId: id
      }
    });

    const { findByTestId } = render(
      <MockedProvider mocks={enrolmentOptionsMock}>
        <EnrolmentModal />
      </MockedProvider>
    );

    await act(async () => {
      await wait(0);
    });

    const container = await findByTestId("self_enrolment_widget");
    const enrolMeButton = container.findByProps({ testID: "self_enrolment_button" });
    const enrolmentKeyInputErrored = container.findByProps({ testID: "self_enrolment_key" });
    fireEvent.press(enrolMeButton);

    await act(async () => {
      await wait(0);
    });

    expect(enrolmentKeyInputErrored.props.errorMessage).toBe(translate("enrolment_options.required"));
  });

  test("Should not accept self enrolment with wrong key", async () => {
    const id = 4;
    useRoute.mockReturnValue({
      params: {
        targetId: id
      }
    });

    const { findByTestId } = render(
      <MockedProvider mocks={enrolmentOptionsMock}>
        <EnrolmentModal />
      </MockedProvider>
    );

    await act(async () => {
      await wait(0);
    });

    const container = await findByTestId("self_enrolment_widget");
    const keyInputField = container.findByProps({ testID: "self_enrolment_key" });
    const enrolMeButton = container.findByProps({ testID: "self_enrolment_button" });

    fireEvent.changeText(keyInputField, "wrongPwd");
    fireEvent.press(enrolMeButton);

    await act(async () => {
      await wait(0);
    });

    expect(keyInputField.props.errorMessage).toBe("Incorrect enrolment key, please try again");
  });

  test("Should not accept self enrolment with wrong key", async () => {
    const id = 4;
    useRoute.mockReturnValue({
      params: {
        targetId: id
      }
    });

    const { findByTestId } = render(
      <MockedProvider mocks={enrolmentOptionsMock}>
        <EnrolmentModal />
      </MockedProvider>
    );

    await act(async () => {
      await wait(0);
    });

    const container = await findByTestId("self_enrolment_widget");
    const keyInputField = container.findByProps({ testID: "self_enrolment_key" });
    const enrolMeButton = container.findByProps({ testID: "self_enrolment_button" });

    fireEvent.changeText(keyInputField, "correctPwd");
    fireEvent.press(enrolMeButton);

    await act(async () => {
      await wait(0);
    });

    expect(keyInputField.props.errorMessage).toBeNull();
  });
});
