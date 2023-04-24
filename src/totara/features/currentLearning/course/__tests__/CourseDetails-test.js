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

import { MockedProvider } from '@apollo/client/testing';
import TestRenderer from "react-test-renderer";
import React from "react";
import wait from "waait";

import { coreCourse } from "../api";
import CourseDetails from "../CourseDetails";
import CourseCompletionModal from "../../CourseCompletionModal";
import { act } from "@testing-library/react-native";
const response = {
  course: course
};

const course = {
  completion: {
    gradefinal: 0,
    grademax: 100,
    id: 63,
    progress: 16,
    statuskey: "complete",
    timecompleted: null
  },
  criteria: [
    {
      complete: false,
      completiondate: null,
      criteria: "<a href=https://mobile.demo.totara.software/mod/scorm/view.php?id=398>Creating a set audience</a>",
      id: "106",
      requirement: "Achieving grade, Completed",
      status: "Has not achieved grade",
      type: "Activity completion",
      typeaggregation: "Any"
    }
  ],

  criteriaaggregation: "All",
  enddate: null,
  fullname: "(BETA) Audiences in Totara",
  id: "4",
  imageSrc: "https://mobile.demo.totara.software/totara/mobile/pluginfile.php/688/course/images/1588546858/image",
  lang: "",
  sections: [
    {
      available: true,
      availablereason: "",
      data: [
        {
          available: true,
          availablereason: "",
          completion: "tracking_manual",
          completionstatus: "complete",
          description:
            "Welcome to the Audiences forum. This area is for discussions on the course topic as well as questions about the course work_.",
          gradefinal: null,
          gradepercentage: 0,
          id: "371",
          instanceid: "22",
          modtype: "forum",
          name: "Course forum",
          showdescription: false,
          viewurl: "https://mobile.demo.totara.software/mod/forum/view.php?id=371"
        }
      ],
      id: "174",
      title: "Ask Us"
    }
  ],
  shortname: "(BETA) Audiences",
  startdate: "2017-08-24T00:00:00+0100",
  summary:
    "GROUPING YOUR USERS TO PROVIDE A PERSONALISED LEARNING EXPERIENCE↵↵Audiences are a powerful tool in Totara Learn, allowing you to group your users in order to assign them learning and performance management activities.↵↵Enrol in this course to explore how to:↵↵	* Create set and dynamic audiences↵↵	* Assign learning to an audience ↵↵ The course will take you around one hour 15 minutes to complete.↵↵"
};

const navigation = { getParam: jest.fn() };
const mocks = [
  {
    request: {
      query: coreCourse,
      variables: { courseId: 4 }
    },
    result: {
      data: response
    }
  }
];

const mocksError = [
  {
    request: {
      query: coreCourse,
      variables: { courseId: 8 }
    },
    error: new Error("Error")
  }
];

describe("Testing: Apollo MockedProvider should test three state such as loading, final and error", () => {
  it("Test result : Render loading state initially and return no component", async () => {
    let component;
    await TestRenderer.act(async () => {
      component = TestRenderer.create(
        <MockedProvider mocks={[]} addTypename={false}>
          <CourseDetails navigation={navigation} />
        </MockedProvider>
      );
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Test result : Once render, it will return child component", async () => {
    let component;
    await TestRenderer.act(async () => {
      component = TestRenderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CourseDetails navigation={navigation} />
        </MockedProvider>
      );
    });
    await act(async () => {
      await wait(0);
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Test result : Set mock-error response and return Error UI", async () => {
    let component;
    await TestRenderer.act(async () => {
      component = TestRenderer.create(
        <MockedProvider mocks={mocksError} addTypename={false}>
          <CourseDetails navigation={navigation} />
        </MockedProvider>
      );
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing: Course manual completion", () => {
  it("Test result : course complete and loading action modal to confirm", async () => {
    let component;
    await TestRenderer.act(async () => {
      component = TestRenderer.create(<CourseCompletionModal onClose={jest.fn()} />);
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
