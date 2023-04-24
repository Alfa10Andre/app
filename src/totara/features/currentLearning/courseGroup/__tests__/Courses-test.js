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
import { render, fireEvent, act } from "@testing-library/react-native";
import { courseSetMock, courseSetListMock } from "../api/courseGroup.mock";
import Courses from "../Courses";
import wait from "waait";

const goBack = jest.fn();
const navigation = {
  state: {
    params: {
      targetId: 5
    }
  },
  goBack: goBack
};

describe("Courses", () => {
  it("Should render course set when array return one course set", () => {
    const { getByTestId } = render(<Courses navigation={navigation} courseGroup={courseSetMock} />);
    const courseSet = getByTestId("test_course_set");
    expect(courseSet).toBeTruthy();
  });

  it("Should render course set list when array return list of course set", () => {
    const { getByTestId } = render(<Courses navigation={navigation} courseGroup={courseSetListMock} />);
    const courseSetList = getByTestId("test_course_set_list");
    expect(courseSetList).toBeTruthy();
  });
  it("Should render course when program is completed", async () => {
    const { getByTestId } = render(<Courses navigation={navigation} courseGroup={courseSetMock} />);
    const programCompleted = getByTestId("test_program_completed");
    const endnote = getByTestId("test_endnote");
    const goBackClicked = getByTestId("test_go_back_button");
    fireEvent.press(goBackClicked);
    expect(programCompleted).toBeTruthy();

    expect(endnote.children[0]).toBe(
      "Many dream, some try, but only a few achieve. You have made us all proud, keep up the good work."
    );
    await act(async () => {
      await wait(0);
      await expect(goBack).toHaveBeenCalled();
    });
  });
});
