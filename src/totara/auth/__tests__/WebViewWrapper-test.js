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
import * as ReactRedux from "react-redux";
import { render } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/client/testing";
import WebViewWrapper from "../WebViewWrapper";

describe("WebViewWrapper", () => {
  beforeAll(() => {
    jest.spyOn(ReactRedux, "useSelector").mockImplementation(() => ({}));
  });

  it("Should render WebViewWrapper view", async () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <WebViewWrapper />
      </MockedProvider>
    );
    expect(container).toBeTruthy();
  });
});
