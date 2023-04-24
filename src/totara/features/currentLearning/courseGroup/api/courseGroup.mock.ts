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

import { GraphQLError } from "graphql";
import { coreProgram, coreCertification } from "./index";

const course = {
  id: "44",
  itemtype: "course",
  itemcomponent: "core_course",
  shortname: "Course Completion",
  fullname: "Course Completion",
  summary: "When my current learning content is complete.",
  summaryFormat: "HTML",
  progress: 0,
  urlView: "https://mobile.demo.totara.software/course/view.php?id=44",
  duedate: null,
  duedateState: null,
  native: true,
  imageSrc: null,
  __typename: "totara_mobile_learning_item"
};

const coursesList = [
  {
    id: "29",
    itemtype: "course",
    itemcomponent: "core_course",
    shortname: "Reports in Totara",
    fullname: "Reporting in Totara",
    summary:
      "Building, sharing and scheduling your own reports\n\nIt's vital to be able to report on the learning taking place in your business.\n\nEnrol in this course to explore how to:\n\n\t* Run administration reports\n\n\t* Create user generated reports\n\n\t* Customise embedded reports\n\n\t* Create graphs of your data\n\n\t* Share reports with other users \n\nThe course will take you around 90 minutes to complete.\n\n",
    summaryFormat: "HTML",
    progress: 20,
    urlView: "https://mobile.demo.totara.software/course/view.php?id=29",
    duedate: null,
    duedateState: null,
    native: true,
    imageSrc: null,
    __typename: "totara_mobile_learning_item"
  },
  course
];

const currentCourseSets = [
  {
    id: "10",
    label: "Course Set A",
    nextsetoperator: "AND",
    completionCriteria: ["All courses in this set must be completed (unless this is an optional set)."],
    courses: [course],
    __typename: "totara_mobile_program_courseset"
  },
  {
    id: "22",
    label: "Node Js",
    nextsetoperator: "THEN",
    completionCriteria: ["Any one course in this set must be completed."],
    courses: [coursesList],
    __typename: "totara_mobile_program_courseset"
  }
];

const currentCourseSet = [
  {
    id: "10",
    label: "Course Set A",
    nextsetoperator: "OR",
    completionCriteria: ["All courses in this set must be completed (unless this is an optional set)."],
    courses: [course],
    __typename: "totara_mobile_program_courseset"
  }
];

const courseDetails = {
  id: "5",
  idnumber: "",
  fullname: "Software Development",
  shortname: "Mobile",
  duedate: "2020-07-03T00:00:00+0100",
  duedateState: "danger",
  summary:
    "Swift Programming Training Overview Accelebrate's Swift training course provides a comprehensive introduction to version 5 of the Swift programming language. Location and Pricing Accelebrate courses are taught as private, customized training for groups of 3 or more at your site. In addition, we offer live, private online training for teams who may be in multiple locations or wish to save on travel costs. To receive a customized proposal and price quote for private on-site or online training, please contact us. In addition, some courses are available as live, online classes for individuals. See a schedule of online courses. Swift Programming Training Objectives Understand the purpose and benefits of Swift Gain experience using Swift’s data types and standard library Learn the proper use of optionals Implement a variety of user-defined types in Swift Learn about error handling and techniques in Swift Understand how to write Swift code that can interoperate with existing code written in C and Objective-C",
  summaryformat: "HTML",
  endnote:
    "Many dream, some try, but only a few achieve. You are an achiever. You have made us all proud, keep up the good work. Congratulations on your graduation",
  availablefrom: "2020-06-18T00:00:00+0100",
  availableuntil: "2022-06-18T23:59:59+0100",
  imageSrc: null,
  completion: {
    id: "24",
    statuskey: "incomplete",
    progress: 4,
    renewalstatuskey: "notdue",
    __typename: "totara_program_completion"
  },
  currentCourseSets: [currentCourseSet, currentCourseSets],
  countUnavailableSets: 3,
  courseSetHeader: "1 completed set"
};

const programMock = [
  {
    request: {
      query: coreProgram,
      variables: { programid: 5 }
    },
    result: {
      data: {
        totara_mobile_program: {
          ...courseDetails,
          __typename: "totara_mobile_program"
        }
      }
    }
  }
];

const certificationMock = [
  {
    request: {
      query: coreCertification,
      variables: { certificationid: 5 }
    },
    result: {
      data: {
        totara_mobile_certification: {
          ...courseDetails,
          __typename: "totara_mobile_certification"
        }
      }
    }
  }
];

const mockEmpty = [
  {
    request: {
      query: coreProgram,
      variables: { programid: 5 }
    },
    result: {
      data: {
        totara_mobile_program: []
      }
    }
  }
];

const mockError = [
  {
    request: {
      query: coreProgram,
      variables: { programid: 5 }
    },
    result: {
      errors: [new GraphQLError("Error!")]
    }
  }
];

const courseSetMock = {
  endnote: "Many dream, some try, but only a few achieve. You have made us all proud, keep up the good work.",
  completion: {
    statuskey: "completed",
    __typename: "totara_program_completion"
  },
  currentCourseSets: [currentCourseSet],
  countUnavailableSets: 3,
  __typename: "totara_mobile_program"
};

const courseSetListMock = {
  endnote:
    "Many dream, some try, but only a few achieve. You are an achiever. You have made us all proud, keep up the good work.",
  completion: {
    statusKey: "incomplete",
    __typename: "totara_program_completion"
  },
  currentCourseSets: [currentCourseSets],
  countUnavailableSets: 3,
  __typename: "totara_mobile_program"
};

export { programMock, certificationMock, mockEmpty, mockError, courseSetMock, courseSetListMock, course };
