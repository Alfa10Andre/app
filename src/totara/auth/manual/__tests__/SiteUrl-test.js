/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2021 onwards Totara Learning Solutions LTD
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
import { render } from "@testing-library/react-native";
import * as coreSession from "@totara/core";
import * as redux from "react-redux";
import * as navigation from "@react-navigation/native";

import * as siteUrlHook from "../SiteUrlHook";
import SiteUrl from "../SiteUrl";
import { TEST_IDS } from "@totara/lib/testIds";

describe("SiteUrl", () => {
  beforeAll(() => {
    jest.spyOn(coreSession, "useSession").mockImplementation(() => {
      return { host: "MOCKED-HOST", setupHost: jest.fn() };
    });
    jest.spyOn(redux, "useDispatch").mockImplementation(() => jest.fn());
    jest.spyOn(navigation, "useNavigation").mockImplementation(() => {
      return {
        navigation: () => ({
          navigate: jest.fn()
        })
      };
    });
  });

  it("should render SiteUrl as default", () => {
    jest.spyOn(siteUrlHook, "useSiteUrl").mockImplementation(() => ({
      siteUrlState: { inputSiteUrl: "https://abc.com" },
      onSubmit: jest.fn(),
      reset: jest.fn(),
      onChangeInputSiteUrl: jest.fn()
    }));
    const tree = <SiteUrl />;
    const { getByTestId } = render(tree);
    expect(getByTestId(TEST_IDS.SITE_URL_INPUT)).toBeTruthy();
    expect(getByTestId(TEST_IDS.SUBMIT_URL)).toBeTruthy();
  });

  it("should render Error modal for error states", () => {
    jest.spyOn(siteUrlHook, "useSiteUrl").mockImplementation(() => ({
      siteUrlState: { inputSiteUrlStatus: "networkError" },
      onSubmit: jest.fn(),
      reset: jest.fn(),
      onChangeInputSiteUrl: jest.fn()
    }));
    const tree = <SiteUrl />;
    const { getByTestId } = render(tree);
    expect(getByTestId(TEST_IDS.SITE_ERROR_MODAL)).toBeTruthy();
  });

  it("should render Incompatiable Version modal for invalid totara version", () => {
    jest.spyOn(siteUrlHook, "useSiteUrl").mockImplementation(() => ({
      siteUrlState: { inputSiteUrlStatus: "minAPIVersionMismatch" },
      onSubmit: jest.fn(),
      reset: jest.fn(),
      onChangeInputSiteUrl: jest.fn()
    }));
    const tree = <SiteUrl />;
    const { getByTestId } = render(tree);
    expect(getByTestId(TEST_IDS.INCOMPATIBLE_API_MODAL)).toBeTruthy();
  });
});
