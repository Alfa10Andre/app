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
import * as ReactRedux from "react-redux";
import { render, act, fireEvent } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/client/testing";
import { profileMock, shortProfileMock } from "@totara/features/profile/api/profile.mock";
import Profile from "@totara/features/profile/Profile";
import wait from "waait";
import { PROFILE_TEST_IDS } from "@totara/lib/testIds";

const navigationMock = {
  navigation: {
    navigate: jest.fn(),
    dispatch: jest.fn(),
    addListener: () => {
      return {
        remove: jest.fn()
      };
    }
  }
};

describe("Profile", () => {
  beforeAll(() => {
    jest.spyOn(ReactRedux, "useSelector").mockImplementation(() => ({}));
  });

  test("Should render loading", async () => {
    const tree = (
      <MockedProvider mocks={profileMock}>
        <Profile navigation={navigationMock.navigation} />
      </MockedProvider>
    );

    const { getByTestId } = render(tree);
    const loadingComponent = getByTestId("test_ProfileLoading");
    expect(loadingComponent).toBeTruthy();
  });
  
  test("Should render profile", async () => {
    const tree = (
      <MockedProvider mocks={profileMock}>
        <Profile navigation={navigationMock.navigation} />
      </MockedProvider>
    );

    const { getByTestId } = render(tree);
    await act(async () => {
      await wait(0);
    });

    const profile = profileMock[0].result.data.profile;

    const test_ProfileUserDetails = getByTestId("test_ProfileUserDetails");
    expect(test_ProfileUserDetails.children[0]).toBe(`${profile.firstname} ${profile.surname}`);

    const test_ProfileUserEmail = getByTestId("test_ProfileUserEmail");
    expect(test_ProfileUserEmail.children[0]).toBe(profile.email);
  });

  test("Should render short profile", async () => {
    const tree = (
      <MockedProvider mocks={shortProfileMock}>
        <Profile navigation={navigationMock.navigation} />
      </MockedProvider>
    );

    const { getByTestId } = render(tree);
    await act(async () => {
      await wait(0);
    });

    const profile = profileMock[0].result.data.profile;

    const test_ProfileUserDetails = getByTestId("test_ProfileUserDetails");
    expect(test_ProfileUserDetails.children[0]).toBe(`${profile.firstname} ${profile.surname}`);
  });

  test("Should tap on logout button", async () => {
    const tree = (
      <MockedProvider mocks={profileMock}>
        <Profile navigation={navigationMock.navigation} />
      </MockedProvider>
    );

    const { getByTestId } = render(tree);
    await act(async () => {
      await wait(0);
    });

    const logoutButton = getByTestId(PROFILE_TEST_IDS.LOGOUT);
    fireEvent.press(logoutButton);
  });

  test("Should tap on about button", async () => {
    const tree = (
      <MockedProvider mocks={profileMock}>
        <Profile navigation={navigationMock.navigation} />
      </MockedProvider>
    );

    const { getByTestId } = render(tree);
    await act(async () => {
      await wait(0);
    });

    const aboutButton = getByTestId(PROFILE_TEST_IDS.ABOUT);
    fireEvent.press(aboutButton);
  });
});
