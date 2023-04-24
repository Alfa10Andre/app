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
import { render } from "@testing-library/react-native";
import { course } from "../api/courseGroup.mock";
import Course from "../Course";

const navigate = jest.fn();

describe("Course", () => {
  it("Should render when learning item-row show default image", async () => {
    const { getByTestId } = render(<Course course={course} navigate={navigate} />);
    const defaultImage = getByTestId("test_default_image");
    expect(defaultImage).toBeTruthy();
  });

  it("Should render when learning item-row show full name", async () => {
    const { getByTestId } = render(<Course course={course} navigate={navigate} />);
    const fullName = getByTestId("test_course_full_name");
    expect(fullName.children[0]).toBe("Course Completion");
  });
});
