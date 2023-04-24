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
import { courseSetListMock } from "../api/courseGroup.mock";
import { LearningItems } from "../CourseSetList";

const navigate = jest.fn();

describe("Course set list", () => {
  it("Should render when learning items are in the course set list", async () => {
    const { getByTestId } = render(
      <LearningItems item={courseSetListMock.currentCourseSets[0][0]} navigate={navigate} />
    );
    const courseSet = getByTestId("test_learning_items");
    const headerTitle = getByTestId("test_header_title");
    expect(courseSet).toBeTruthy();
    expect(headerTitle.children[0]).toBe("Course Set A");
  });
});
