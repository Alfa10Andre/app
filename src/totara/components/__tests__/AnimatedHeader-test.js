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
import { render, cleanup } from "@testing-library/react-native";
import { AnimatedHeader } from "@totara/components/AnimatedHeader";

describe("AnimatedHeader", () => {

  afterEach(cleanup);

  test("Should render the header with title and no subtitle", async () => {
    const titleValue = "header title";
    const tree = <AnimatedHeader title={titleValue} />;

    const { getByTestId, queryByTestId } = render(tree);

    // const container = getByTestId("animated-header-container");
    const title = await getByTestId("animated-header-title");
    expect(title.props.children).toBe(titleValue);

    const subtitle = await queryByTestId("animated-header-subtitle")
    expect(subtitle).toBeNull();
  });

  test("Should render the header with subtitle", async () => {
    const titleValue = "header title";
    const subtitleValue = "header subtitle";
    const tree = <AnimatedHeader title={titleValue} subTitle={subtitleValue} />;

    const { getByTestId } = render(tree);

    const subtitle = await getByTestId("animated-header-subtitle")
    expect(subtitle.props.children).toBe(subtitleValue);
  });
})
