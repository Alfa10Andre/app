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
import BrowserLogin from "../BrowserLogin";
import { render } from "@testing-library/react-native";
import * as coreSession from "@totara/core";
import * as ReactRedux from "react-redux";
import * as nav from "@react-navigation/native";

describe("BrowserLogin", () => {
  beforeAll(() => {
    jest.spyOn(coreSession, "useSession").mockImplementation(() => jest.fn());
    jest.spyOn(ReactRedux, "useDispatch").mockImplementation(() => jest.fn());
    global.fetch = jest.fn().mockImplementation(() => jest.fn());
    jest.spyOn(nav, "useRoute").mockReturnValue({ params: { siteUrl: "http://abc.com" } });
  });
  it("should render BrowserLogin InforModal", async () => {
    const { container } = render(<BrowserLogin />);
    expect(container).toBeTruthy();
  });
});
