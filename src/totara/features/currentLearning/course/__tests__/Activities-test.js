/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2019 onwards Totara Learning Solutions LTD
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

import renderer from "react-test-renderer";
import React from "react";
import CompletionIcon from "../CompletionIcon";
import { completionStates } from "../courseDetailsStyle";

const theme = jest.fn();

describe("Activity-Icon, testing UI activity checkbox for self-completion or auto-completion", () => {
  it("Test result : Activity is available and completion, completionStatus undefined", () => {
    const jestGetCompletionStatus = jest.fn(() => ({
      stateObj: completionStates.notAvailable,
      accessibility: undefined
    }));
    const component = renderer.create(
      <CompletionIcon
        theme={theme}
        completion="tracking_none"
        completionStatus="unknown"
        available={false}
        onGetCompletionStatus={jestGetCompletionStatus}></CompletionIcon>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Test result : Activity is not available and completion, completionStatus undefined", () => {
    const jestGetCompletionStatus = jest.fn(() => ({
      stateObj: completionStates.notAvailable,
      accessibility: undefined
    }));
    const component = renderer.create(
      <CompletionIcon
        theme={theme}
        completion="tracking_none"
        completionStatus="unknown"
        available={true}
        onGetCompletionStatus={jestGetCompletionStatus}></CompletionIcon>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Test result : Activity is available and auto-completion, completionStatus complete, complete-pass", () => {
    const jestGetCompletionStatus = jest.fn(() => ({ stateObj: completionStates.completed, accessibility: undefined }));
    const component = renderer.create(
      <CompletionIcon
        theme={theme}
        completion="tracking_automatic"
        completionStatus="complete"
        available={true}
        onGetCompletionStatus={jestGetCompletionStatus}></CompletionIcon>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Test result : Activity is available and auto-completion, completionStatus incomplete", () => {
    const jestGetCompletionStatus = jest.fn(() => ({
      stateObj: completionStates.autoIncomplete,
      accessibility: undefined
    }));
    const component = renderer.create(
      <CompletionIcon
        theme={theme}
        completion="tracking_automatic"
        completionStatus="incomplete"
        available={true}
        onGetCompletionStatus={jestGetCompletionStatus}></CompletionIcon>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Test result : Activity is available and  completionStatus completeFail", () => {
    const jestGetCompletionStatus = jest.fn(() => ({
      stateObj: completionStates.completeFail,
      accessibility: undefined
    }));

    const component = renderer.create(
      <CompletionIcon
        theme={theme}
        completion="tracking_none"
        completionStatus="completeFail"
        available={true}
        onGetCompletionStatus={jestGetCompletionStatus}></CompletionIcon>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Test result : Activity is available and manual-completion, completionStatus incomplete", () => {
    const jestGetCompletionStatus = jest.fn(() => ({
      stateObj: completionStates.manualIncomplete,
      accessibility: undefined
    }));
    const component = renderer.create(
      <CompletionIcon
        theme={theme}
        completion="tracking_manual"
        completionStatus="incomplete"
        available={true}
        onGetCompletionStatus={jestGetCompletionStatus}></CompletionIcon>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Test result : Activity is available and manual-completion, completionStatus complete", () => {
    const jestGetCompletionStatus = jest.fn(() => ({
      stateObj: completionStates.completed,
      accessibility: undefined
    }));
    const component = renderer.create(
      <CompletionIcon
        theme={theme}
        completion="tracking_manual"
        completionStatus="complete"
        available={true}
        onGetCompletionStatus={jestGetCompletionStatus}></CompletionIcon>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("Test result : Activity is available and manual-completion is undefined, completionStatus is undefined", () => {
    const jestGetCompletionStatus = jest.fn(() => undefined);
    const component = renderer.create(
      <CompletionIcon
        theme={theme}
        completion="tracking_none"
        completionStatus="unknown"
        available={true}
        onGetCompletionStatus={jestGetCompletionStatus}></CompletionIcon>
    );
    expect(component).toMatchSnapshot();
  });
});
