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

import { render } from "@testing-library/react-native";
import React from "react";
import wait from "waait";
import * as coreSession from "@totara/core";
import * as redux from "react-redux";

import AdditionalAction from "../AdditionalAction";
import { ADDITIONALACTION_TEST_IDS } from "@totara/lib/testIds";

describe("AdditionalAction", () => {
  beforeAll(() => {
    jest.spyOn(coreSession, "useSession").mockImplementation(() => {
      return { host: "MOCKED-SESSION", endSession: jest.fn() };
    });
    jest.spyOn(redux, "useDispatch").mockImplementation(() => jest.fn());
  });

  it("Should render infor and two actions", async () => {
    const tree = <AdditionalAction />;
    const { getByTestId } = render(tree);
    expect(getByTestId(ADDITIONALACTION_TEST_IDS.INFOR)).toBeTruthy();
    await wait(() => expect(getByTestId(ADDITIONALACTION_TEST_IDS.PRIMARY_BUTTON)).toBeTruthy());
    await wait(() => expect(getByTestId(ADDITIONALACTION_TEST_IDS.TERTIARY_BUTTON)).toBeTruthy());
  });
});
