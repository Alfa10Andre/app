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

const mockDefaultCourseDetails = {
  course: {
    id: "45",
    format: "topics",
    fullname: "A Multi-disciplinary Training Day",
    shortname: "A Multi-disciplinary Training Day",
    summary:
      '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Without requirements or design, programming is the art of adding bugs to an empty text file. It\'s not a bug - it\'s an undocumented feature. They don\'t make bugs like Bunny anymore. Program testing can be used to show the presence of bugs, but never to show their absence! If debugging is the process of removing software bugs, then programming must be the process of putting them in. Measuring programming progress by lines of code is like measuring aircraft building progress by weight."}]}]}',
    summaryformat: "JSON_EDITOR",
    startdate: "2019-11-01T00:00:00+0000",
    enddate: null,
    lang: "",
    image: "https://mobile.demo.totara.software/pluginfile.php/859/course/images/1612212198/image",
    sections: [
      {
        id: "219",
        title: "General",
        available: true,
        availablereason: [],
        summary: "",
        summaryformat: "HTML",
        modules: [],
        __typename: "core_course_section"
      },
      {
        id: "220",
        title: "Who is this course for?",
        available: true,
        availablereason: [],
        summary: "",
        summaryformat: "JSON_EDITOR",
        modules: [
          {
            id: "463",
            instanceid: "224",
            modtype: "label",
            name: "The concept of multidisciplinary teamwork ...",
            available: true,
            availablereason: [],
            viewurl: null,
            completion: "tracking_manual",
            completionstatus: "complete",
            showdescription: true,
            description:
              "The concept of multidisciplinary teamwork originated with the Mayo brothers at the turn of the 20th century. Their Mayo Clinic Model of Care laid down a set of principles for how their organization would deliver coordinated patient care through a multidisciplinary team approach to treating the whole patient.\n\nHealthcare, by design, is a multidisciplinary profession in which doctors, nurses, and health professionals from various specialties must work together, communicate often, and share resources. A successful multidisciplinary health team strives to make the most comprehensive assessment of a patient’s situation and to follow it up with a full-range plan of treatment. Teams may also work together to create and promote health initiatives for diverse communities and to provide education to instill disease-prevention behaviors amongst patients.\n",
            gradefinal: 0,
            gradepercentage: 0,
            descriptionformat: "HTML",
            __typename: "core_course_module"
          }
        ],
        __typename: "core_course_section"
      },
      {
        id: "222",
        title: "Sign up for classroom sessions",
        available: true,
        availablereason: [],
        summary: "",
        summaryformat: "HTML",
        modules: [
          {
            id: "465",
            instanceid: "5",
            modtype: "facetoface",
            name: "Multi-disciplinary training day",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/facetoface/view.php?id=465",
            completion: "tracking_manual",
            completionstatus: "complete",
            showdescription: true,
            description:
              "Sign up to our Event and you can attend the sessions that you require for your annual updates. We will offer:\n\n-Infection control\n- Safeguarding Patients\n- Fire Safety \n- Mental Health\n- CPR\n- First Aid\n\n",
            gradefinal: null,
            gradepercentage: 0,
            descriptionformat: "HTML",
            __typename: "core_course_module"
          },
          {
            id: "945",
            instanceid: "23",
            modtype: "facetoface",
            name: "seminar test",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/facetoface/view.php?id=945",
            completion: "tracking_manual",
            completionstatus: "incomplete",
            showdescription: false,
            description: "test\n",
            gradefinal: null,
            gradepercentage: 0,
            descriptionformat: "JSON_EDITOR",
            __typename: "core_course_module"
          }
        ],
        __typename: "core_course_section"
      },
      {
        id: "278",
        title: "Feedback",
        available: true,
        availablereason: [],
        summary: "",
        summaryformat: "JSON_EDITOR",
        modules: [
          {
            id: "517",
            instanceid: "9",
            modtype: "feedback",
            name: "Tell us what you think",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/feedback/view.php?id=517",
            completion: "tracking_automatic",
            completionstatus: "incomplete",
            showdescription: false,
            description: "",
            gradefinal: 0,
            gradepercentage: 0,
            descriptionformat: "HTML",
            __typename: "core_course_module"
          }
        ],
        __typename: "core_course_section"
      }
    ],
    criteriaaggregation: "Any",
    criteria: [
      {
        id: "187",
        type: "Self completion",
        typeaggregation: "All",
        criteria: "Self completion",
        requirement: "Marking yourself complete",
        status: "",
        complete: false,
        completiondate: null,
        __typename: "core_course_criteria"
      }
    ],
    showgrades: false,
    completionenabled: true,
    completion: {
      id: 822,
      statuskey: "inprogress",
      progress: 0,
      timecompleted: null,
      __typename: "core_course_completion"
    },
    __typename: "core_course"
  },
  native: true,
  mobile_image: "https://mobile.demo.totara.software/pluginfile.php/859/course/images/1612212198/image",
  formatted_gradefinal: "",
  formatted_grademax: "100.00",
  __typename: "totara_mobile_course"
};
const mockScormCourseDetails = {
  course: {
    id: "36",
    fullname: "(BETA) Audiences in Totara",
    shortname: "(BETA) Audiences in Totara",
    summary:
      "GROUPINGG YOUR USERS TO PROVIDE A PERSONALISED LEARNING EXPERIENCE\n\nAudiences are a powerful tool in Totara Learn, allowing you to group your users in order to assign them learning and performance management activities.\n\nEnrol in this course to explore how to:\n\n\t* Create set and dynamic audiences\n\n\t* Assign learning to an audience \n\n The course will take you around one hour 15 minutes to complete.\n\n",
    summaryformat: "HTML",
    startdate: "2017-08-24T00:00:00+0100",
    enddate: null,
    lang: "",
    image: "https://mobile.demo.totara.software/totara/mobile/pluginfile.php/688/course/images/1612212198/image",
    format: "topics",
    sections: [
      {
        id: "174",
        title: "Ask Us",
        available: true,
        availablereason: [],
        summary: "Summary text for section.",
        summaryformat: "PLAIN",
        modules: [
          {
            id: "370",
            instanceid: "195",
            modtype: "label",
            name: "This is a space for anyone taking the course to...",
            available: false,
            availablereason: ["The activity Zoom is marked complete", "The activity validscorm is marked complete"],
            viewurl: "",
            completion: "tracking_none",
            completionstatus: "unknown",
            showdescription: false,
            description:
              "This is a space for anyone taking the course to ask questions of the Academy team or other learners. We encourage you to use the course forum as much as you can. If you have a question post it here so that everyone will benefit from seeing the answer. Please start a new thread for each new question.\n\n",
            descriptionformat: "HTML",
            gradefinal: 0,
            gradepercentage: 0,
            __typename: "core_course_module"
          },
          {
            id: "418",
            instanceid: "23",
            modtype: "forum",
            name: "Announcements",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/forum/view.php?id=418",
            completion: "tracking_none",
            completionstatus: "incomplete",
            showdescription: false,
            description: "General news and announcements",
            descriptionformat: "HTML",
            gradefinal: 0,
            gradepercentage: 0,
            __typename: "core_course_module"
          },
          {
            id: "938",
            instanceid: "91",
            modtype: "forum",
            name: "Course forum",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/forum/view.php?id=938",
            completion: "tracking_manual",
            completionstatus: "incomplete",
            showdescription: false,
            description: "",
            descriptionformat: "JSON_EDITOR",
            gradefinal: 0,
            gradepercentage: 0,
            __typename: "core_course_module"
          },
          {
            id: "441",
            instanceid: "5",
            modtype: "lti",
            name: "Zoom",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/lti/view.php?id=441",
            completion: "tracking_manual",
            completionstatus: "incomplete",
            showdescription: false,
            description: "",
            descriptionformat: "HTML",
            gradefinal: null,
            gradepercentage: 0,
            __typename: "core_course_module"
          },
          {
            id: "462",
            instanceid: "30",
            modtype: "scorm",
            name: "Report in Totara Learn",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/scorm/view.php?id=462",
            completion: "tracking_manual",
            completionstatus: "complete",
            showdescription: true,
            description:
              "In this brief tutorial, you’ll explore your options for reporting in Totara Learn and the benefits of report builder. Duration: 10 mins\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
            descriptionformat: "HTML",
            gradefinal: 1,
            gradepercentage: 100,
            __typename: "core_course_module"
          },
          {
            id: "461",
            instanceid: "29",
            modtype: "scorm",
            name: "Introduction to User Experience Design",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/scorm/view.php?id=461",
            completion: "tracking_manual",
            completionstatus: "complete",
            showdescription: true,
            description: "Blah test\n",
            descriptionformat: "HTML",
            gradefinal: 1,
            gradepercentage: 100,
            __typename: "core_course_module"
          },
          {
            id: "467",
            instanceid: "78",
            modtype: "resource",
            name: "PDF TEST",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/resource/view.php?id=467",
            completion: "tracking_manual",
            completionstatus: "complete",
            showdescription: false,
            description: "PDF TEST\n\n",
            descriptionformat: "HTML",
            gradefinal: 0,
            gradepercentage: 0,
            __typename: "core_course_module"
          }
        ],
        __typename: "core_course_section"
      },
      {
        id: "175",
        title: "The problem",
        available: false,
        availablereason: [
          "The activity (Missing activity) is marked complete",
          "The activity overview_test is marked complete",
          "The activity Zoom is marked complete",
          "The activity (Missing activity) is marked complete"
        ],
        summary: "",
        summaryformat: "HTML",
        data: [],
        __typename: "core_course_section"
      },
      {
        id: "176",
        title: "Site administration menu and development ",
        available: false,
        availablereason: ["Not available unless: The activity (Missing activity) is marked complete"],
        summary: "",
        summaryformat: "HTML",
        data: [],
        __typename: "core_course_section"
      },
      {
        id: "177",
        title: "Skill up",
        available: true,
        availablereason: [],
        summary: "",
        summaryformat: "HTML",
        modules: [
          {
            id: "381",
            instanceid: "70",
            modtype: "resource",
            name: "View a transcript of this video",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/resource/view.php?id=381",
            completion: "tracking_none",
            completionstatus: "incomplete",
            showdescription: false,
            description: "",
            descriptionformat: "HTML",
            gradefinal: 0,
            gradepercentage: 0,
            __typename: "core_course_module"
          },
          {
            id: "385",
            instanceid: "71",
            modtype: "resource",
            name: "View a transcript of this video",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/resource/view.php?id=385",
            completion: "tracking_none",
            completionstatus: "incomplete",
            showdescription: false,
            description: "",
            descriptionformat: "HTML",
            gradefinal: 0,
            gradepercentage: 0,
            __typename: "core_course_module"
          },
          {
            id: "389",
            instanceid: "72",
            modtype: "resource",
            name: "View a transcript of this video",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/resource/view.php?id=389",
            completion: "tracking_none",
            completionstatus: "incomplete",
            showdescription: false,
            description: "",
            descriptionformat: "HTML",
            gradefinal: 0,
            gradepercentage: 0,
            __typename: "core_course_module"
          },
          {
            id: "392",
            instanceid: "14",
            modtype: "scorm",
            name: "Being dynamic with Totara Learn",
            available: false,
            availablereason: ["Not available unless: The activity (Missing activity) is marked complete"],
            viewurl: "",
            completion: "tracking_none",
            completionstatus: "unknown",
            showdescription: false,
            description: "",
            descriptionformat: "HTML",
            gradefinal: 0,
            gradepercentage: 0,
            __typename: "core_course_module"
          }
        ],
        __typename: "core_course_section"
      },
      {
        id: "178",
        title: "Have a go",
        available: true,
        availablereason: [],
        summary: "",
        summaryformat: "HTML",
        modules: [
          {
            id: "395",
            instanceid: "31",
            modtype: "url",
            name: "Audiences",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/url/view.php?id=395",
            completion: "tracking_automatic",
            completionstatus: "complete",
            showdescription: false,
            description: "",
            descriptionformat: "HTML",
            gradefinal: 0,
            gradepercentage: 0,
            __typename: "core_course_module"
          },
          {
            id: "398",
            instanceid: "15",
            modtype: "scorm",
            name: "Creating a set audience",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/scorm/view.php?id=398",
            completion: "tracking_automatic",
            completionstatus: "complete",
            showdescription: false,
            description:
              "Complete this elearning to learn how to create a set audience. If debugging is the process of removing software bugs, then programming must be the process of putting them in. A good programmer is someone who always looks both ways before crossing a one-way street. Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live. When debugging, novices insert corrective code; experts remove defective code. Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it. I don't care if it works on your machine! We are not shipping your machine! Program testing can be used to show the presence of bugs, but never to show their absence! If something is worth doing once, it's worth building a tool to do it. Measuring programming progress by lines of code is like measuring aircraft building progress by weight. Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
            descriptionformat: "HTML",
            gradefinal: 0,
            gradepercentage: 0,
            __typename: "core_course_module"
          },
          {
            id: "400",
            instanceid: "16",
            modtype: "scorm",
            name: "Creating a dynamic audience",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/scorm/view.php?id=400",
            completion: "tracking_automatic",
            completionstatus: "incomplete",
            showdescription: false,
            description: "",
            descriptionformat: "HTML",
            gradefinal: null,
            gradepercentage: 0,
            __typename: "core_course_module"
          },
          {
            id: "403",
            instanceid: "6",
            modtype: "wiki",
            name: "Audiences best practice wiki",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/wiki/view.php?id=403",
            completion: "tracking_automatic",
            completionstatus: "complete",
            showdescription: false,
            description: "",
            descriptionformat: "HTML",
            gradefinal: 0,
            gradepercentage: 0,
            __typename: "core_course_module"
          }
        ],
        __typename: "core_course_section"
      },
      {
        id: "179",
        title: "Prove it",
        available: true,
        availablereason: [],
        summary: "",
        summaryformat: "HTML",
        modules: [
          {
            id: "406",
            instanceid: "8",
            modtype: "quiz",
            name: "Course quiz",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/quiz/view.php?id=406",
            completion: "tracking_automatic",
            completionstatus: "incomplete",
            showdescription: false,
            description: "",
            descriptionformat: "HTML",
            gradefinal: null,
            gradepercentage: 0,
            __typename: "core_course_module"
          }
        ],
        __typename: "core_course_section"
      },
      {
        id: "180",
        title: "Tell us what you think",
        available: true,
        availablereason: [],
        summary: "",
        summaryformat: "HTML",
        modules: [
          {
            id: "408",
            instanceid: "8",
            modtype: "feedback",
            name: "Feedback form",
            available: true,
            availablereason: [],
            viewurl: "https://mobile.demo.totara.software/mod/feedback/view.php?id=408",
            completion: "tracking_automatic",
            completionstatus: "complete",
            showdescription: true,
            description: "",
            descriptionformat: "HTML",
            gradefinal: 0,
            gradepercentage: 0,
            __typename: "core_course_module"
          }
        ],
        __typename: "core_course_section"
      }
    ],
    criteriaaggregation: "All",
    criteria: [
      {
        id: "141",
        type: "Activity completion",
        typeaggregation: "All",
        criteria: '<a href="https://mobile.demo.totara.software/mod/lti/view.php?id=441">Zoom</a>',
        requirement: "Marking yourself complete",
        status: "Completed",
        complete: true,
        completiondate: "2020-12-02T21:15:39+0000",
        __typename: "core_course_criteria"
      },
      {
        id: "132",
        type: "Activity completion",
        typeaggregation: "All",
        criteria: '<a href="https://mobile.demo.totara.software/mod/lti/view.php?id=434">Zoom</a>',
        requirement: "Marking yourself complete",
        status: "Not completed",
        complete: false,
        completiondate: null,
        __typename: "core_course_criteria"
      },
      {
        id: "133",
        type: "Activity completion",
        typeaggregation: "All",
        criteria: '<a href="https://mobile.demo.totara.software/mod/url/view.php?id=395">Audiences</a>',
        requirement: "Viewing the url",
        status: "Completed",
        complete: true,
        completiondate: "2020-03-03T03:21:13+0000",
        __typename: "core_course_criteria"
      },
      {
        id: "135",
        type: "Activity completion",
        typeaggregation: "All",
        criteria:
          '<a href="https://mobile.demo.totara.software/mod/wiki/view.php?id=403">Audiences best practice wiki</a>',
        requirement: "Viewing the wiki",
        status: "Completed",
        complete: true,
        completiondate: "2020-03-16T23:10:30+0000",
        __typename: "core_course_criteria"
      },
      {
        id: "136",
        type: "Activity completion",
        typeaggregation: "All",
        criteria: '<a href="https://mobile.demo.totara.software/mod/quiz/view.php?id=406">Course quiz</a>',
        requirement: "Achieving grade",
        status: "Has not achieved grade",
        complete: false,
        completiondate: null,
        __typename: "core_course_criteria"
      },
      {
        id: "134",
        type: "Completion of other courses",
        typeaggregation: "Any",
        criteria: '<a href="https://mobile.demo.totara.software/course/view.php?id=38">Simple Test Course</a>',
        requirement: "Course completed",
        status:
          '<a href="https://mobile.demo.totara.software/blocks/completionstatus/details.php?course=38&amp;user=53">See details</a>',
        complete: true,
        completiondate: "2020-08-27T22:31:06+0100",
        __typename: "core_course_criteria"
      }
    ],
    showgrades: true,
    completionenabled: true,
    completion: {
      id: 299,
      statuskey: "inprogress",
      progress: 66,
      timecompleted: null,
      __typename: "core_course_completion"
    },
    __typename: "core_course"
  },
  formatted_gradefinal: "27.87",
  formatted_grademax: "100.00",
  native: true,
  mobile_image: "https://mobile.demo.totara.software/totara/mobile/pluginfile.php/688/course/images/1612212198/image",
  __typename: "totara_mobile_course"
};
const courseDetails = {
  default: { totara_mobile_course: () => ({ ...mockDefaultCourseDetails }) },
  scorm: { totara_mobile_course: () => ({ ...mockScormCourseDetails }) }
};

module.exports = {
  courseDetails
};
