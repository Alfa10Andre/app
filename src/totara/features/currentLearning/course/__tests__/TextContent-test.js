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

import renderer from "react-test-renderer";
import React from "react";
import TextContent from "../TextContent";

const mockLabel = "Some of the activities in this course make brief";

describe("Activity-Label-Type, testing UI with or without label", () => {
  it("Test result : label include value", () => {
    const component = renderer.create(<TextContent label={mockLabel}></TextContent>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
