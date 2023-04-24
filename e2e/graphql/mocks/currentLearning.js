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

const { MockList } = require("apollo-server-express");

const defaultCurrentLearningData = [
  {
    id: "program_12",
    itemtype: "program",
    itemcomponent: "totara_program",
    shortname: "(THEN ONLY) Simple Test Programme",
    fullname: "(THEN ONLY) Simple Test Programme",
    description: "\t* THEN rulesets only\n\t* One course per set\n\n",
    description_format: "HTML",
    progress: 0,
    url_view: "https://mobile.demo.totara.software/totara/program/view.php?id=12",
    duedate: "2020-09-10T00:00:00+0100",
    duedate_state: "danger",
    mobile_coursecompat: true,
    mobile_image: "https://mobile.demo.totara.software/theme/image.php/ventura/totara_program/1612212198/defaultimage",
    __typename: "totara_mobile_learning_item"
  },
  {
    id: "course_45",
    itemtype: "course",
    itemcomponent: "core_course",
    shortname: "A Multi-disciplinary Training Day",
    fullname: "A Multi-disciplinary Training Day",
    description:
      '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Without requirements or design, programming is the art of adding bugs to an empty text file. It\'s not a bug - it\'s an undocumented feature. They don\'t make bugs like Bunny anymore. Program testing can be used to show the presence of bugs, but never to show their absence! If debugging is the process of removing software bugs, then programming must be the process of putting them in. Measuring programming progress by lines of code is like measuring aircraft building progress by weight."}]}]}',
    description_format: "JSON_EDITOR",
    progress: 0,
    url_view: "https://mobile.demo.totara.software/course/view.php?id=45",
    duedate: null,
    duedate_state: null,
    mobile_coursecompat: true,
    mobile_image: "https://mobile.demo.totara.software/pluginfile.php/859/course/images/1612212198/image",
    __typename: "totara_mobile_learning_item"
  },
  {
    id: "course_36",
    itemtype: "course",
    itemcomponent: "core_course",
    shortname: "(BETA) Audiences in Totara",
    fullname: "(BETA) Audiences in Totara",
    description:
      "GROUPINGG YOUR USERS TO PROVIDE A PERSONALISED LEARNING EXPERIENCE\n\nAudiences are a powerful tool in Totara Learn, allowing you to group your users in order to assign them learning and performance management activities.\n\nEnrol in this course to explore how to:\n\n\t* Create set and dynamic audiences\n\n\t* Assign learning to an audience \n\n The course will take you around one hour 15 minutes to complete.\n\n",
    description_format: "HTML",
    progress: 66,
    url_view: "https://mobile.demo.totara.software/course/view.php?id=36",
    duedate: null,
    duedate_state: null,
    mobile_coursecompat: true,
    mobile_image: "https://mobile.demo.totara.software/pluginfile.php/688/course/images/1612212198/image",
    __typename: "totara_mobile_learning_item"
  }
];

const currentLearning = {
  default: { totara_mobile_current_learning: () => new MockList(3) }
};

module.exports = {
  currentLearning
};
