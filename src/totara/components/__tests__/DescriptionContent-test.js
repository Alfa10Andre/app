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
import { render } from "@testing-library/react-native";

import { DescriptionContent } from "../DescriptionContent";
import { DescriptionFormat } from "@totara/types/LearningItem";
import { DESCRIPTIONCONTENT_TEST_IDS } from "@totara/lib/testIds";

describe("DescriptionContent", () => {
  describe("JSON_EDITOR type should render weka component or null", () => {
    it("empty content should not render anything", () => {
      const { queryByTestId } = render(<DescriptionContent contentType={DescriptionFormat.jsonEditor} />);
      const expectedResult = queryByTestId(DESCRIPTIONCONTENT_TEST_IDS.WEKA);

      expect(expectedResult).toBeNull();
    });
    it("non empty content should render weka component", () => {
      const { queryByTestId } = render(
        <DescriptionContent content={'{"doc": {}}'} contentType={DescriptionFormat.jsonEditor} />
      );
      const expectedResult = queryByTestId(DESCRIPTIONCONTENT_TEST_IDS.WEKA);
      expect(expectedResult).toBeTruthy();
    });
  });
  describe("HTML type should render web component or null", () => {
    it("empty source should render text component", () => {
      const { queryByTestId } = render(<DescriptionContent contentType={DescriptionFormat.html} content={"DUMMY"} />);
      const expectedResult = queryByTestId(DESCRIPTIONCONTENT_TEST_IDS.TEXT);

      expect(expectedResult).toBeTruthy();
    });
    it("non empty source should render web component", () => {
      const { queryByTestId } = render(
        <DescriptionContent contentType={DescriptionFormat.html} source={{ html: "DUMMY" }} />
      );
      const expectedResult = queryByTestId(DESCRIPTIONCONTENT_TEST_IDS.WEB);
      expect(expectedResult).toBeTruthy();
    });
  });

  describe("Default should render text component", () => {
    it("empty source should render Text component", () => {
      const { queryByTestId } = render(<DescriptionContent content={""} />);
      const expectedResult = queryByTestId(DESCRIPTIONCONTENT_TEST_IDS.TEXT);

      expect(expectedResult).toBeTruthy();
    });
  });
});
