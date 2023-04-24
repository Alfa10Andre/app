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
import { shallow } from "enzyme";

import OfflineScormPlayer from "../OfflineScormPlayer";
import { SCORM_TEST_IDS } from "@totara/lib/testIds";

const { OFFLINE_PLAYER_ID } = SCORM_TEST_IDS;

const mockExitHandler = jest.fn(() => null);
const mockMessageHandler = jest.fn(() => null);
const mockInjectJs = "";

describe("OfflineScormPlayer", () => {
  let useEffect;
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };
  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();
  });
  it("Should render web player for given non-empty url", () => {
    const wrapper = shallow(
      <OfflineScormPlayer
        url={"http://site.url"}
        injectScript={mockInjectJs}
        onExitHandler={mockExitHandler}
        onMessageHandler={mockMessageHandler}
      />
    );
    expect(wrapper.findWhere((node) => node.prop("testID") === OFFLINE_PLAYER_ID)).toExist();
  });
});
