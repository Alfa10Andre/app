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

import React, { ReactNode } from "react";
import { AppState, AppStateStatus } from "react-native";
import { Log } from "@totara/lib";

type Props = {
  onActive?: () => void;
  onBackground?: () => void;
  onInactive?: () => void;
  children?: ReactNode;
};

class AppStateListener extends React.Component<Props> {
  static defaultProps = {
    onActive: () => Log.debug("App is in Active/Foreground Mode."),
    onBackground: () => Log.debug("App is in Background Mode."),
    onInactive: () => Log.debug("App is in Inactive mode.")
  };

  constructor(props: Props) {
    super(props);
  }
  state = {
    appState: AppState.currentState
  };

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  /**
   * @AppStateChange : Here, will trigger when app is background/inactive and foreground.
   * @parameter : When app goes background and foreground, next app state.
   * @return : null
   */

  handleAppStateChange = (nextAppState: AppStateStatus) => {
    this.setState({ appState: nextAppState });

    if (nextAppState === "active") {
      // Do something here on app active foreground mode.
      this.props.onActive!();
    }
    if (nextAppState === "background") {
      // Do something here on app background.
      this.props.onBackground!();
    }
    if (nextAppState === "inactive") {
      // Do something here on app inactive mode.
      this.props.onInactive!();
    }
  };

  render() {
    return this.props.children != null ? this.props.children : null;
  }
}

export default AppStateListener;
