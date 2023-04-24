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
import renderer from "react-test-renderer";
import * as ReactRedux from "react-redux";
import NoCurrentLearning from "../NoCurrentLearning";

describe("NoCurrentLearning, No current learning screen should launch when api return doesn't have courses", () => {
  it("Test result : take screen-shot when no current learning", () => {

    jest.spyOn(ReactRedux, "useSelector").mockImplementation(() => {
      return {
        host: 'https://mobile.demo.totara.software'
      };
    });

    const tree = renderer.create(<NoCurrentLearning />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
