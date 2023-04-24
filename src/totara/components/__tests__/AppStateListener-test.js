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
import AppStateListener from "../AppStateListener";

const onActive = jest.fn();
const onBackground = jest.fn();
const onInactive = jest.fn();

const stateListener = renderer
  .create(<AppStateListener onActive={onActive} onBackground={onBackground} onInactive={onInactive} />)
  .getInstance();

describe("App is in Active Foreground/active Mode", () => {
  it("Test result : App state should be changed to active state, in when user comes foreground", () => {
    stateListener.handleAppStateChange("active");
    expect(stateListener.state.appState).toBe("active");
    expect(onActive).toHaveBeenCalledTimes(1);
  });
});

describe("App is in Background Mode", () => {
  it("Test result : App state should be changed to background state, in when user comes background", () => {
    stateListener.handleAppStateChange("background");
    expect(stateListener.state.appState).toBe("background");
    expect(onBackground).toHaveBeenCalledTimes(1);
  });
});

describe("App is in inactive Mode", () => {
  it("Test result : App state should be changed to inactive state, in when user comes inactive", () => {
    stateListener.handleAppStateChange("inactive");
    expect(stateListener.state.appState).toBe("inactive");
    expect(onInactive).toHaveBeenCalledTimes(1);
  });
});
