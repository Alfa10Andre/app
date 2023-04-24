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
const { mockServerUrl } = require("../config");
const defaultData = {
  id: "30",
  courseid: "36",
  name: "Report in Totara Learn",
  scormtype: "local",
  reference: "test.zip",
  intro:
    "In this brief tutorial, you’ll explore your options for reporting in Totara Learn and the benefits of report builder. Duration: 10 mins",
  version: "SCORM_1.2",
  maxgrade: 100,
  grademethod: "0",
  whatgrade: "0",
  maxattempt: null,
  forcecompleted: false,
  forcenewattempt: false,
  lastattemptlock: false,
  masteryoverride: true,
  displaycoursestructure: false,
  skipview: 0,
  nav: 1,
  navpositionleft: -100,
  navpositiontop: -100,
  auto: false,
  width: 100,
  height: 500,
  timeopen: null,
  timeclose: null,
  displayactivityname: true,
  autocommit: false,
  allowmobileoffline: false,
  completion: 1,
  completionview: false,
  completionstatusrequired: null,
  completionscorerequired: null,
  completionstatusallscos: false,
  package_url: "https://mobile.demo.totara.software/pluginfile.php/858/mod_scorm/package/0/test.zip?forcedownload=1",
  launch_url: "https://mobile.demo.totara.software/mod/scorm/player.php?mode=normal&newattempt=on&cm=462&scoid=0",
  repeat_url: "https://mobile.demo.totara.software/mod/scorm/player.php?mode=normal&newattempt=off&cm=462&scoid=0",
  attempts_current: 9,
  calculated_grade: "1",
  offline_package_url: null,
  offline_package_contenthash: null,
  offline_package_sco_identifiers: null,
  attempts: [
    {
      attempt: 1,
      timestarted: "1594673708",
      gradereported: 1,
      defaults:
        '{"adapt_scorm":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"ab-initio","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"},"item_1":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:46.18","cmi.core.lesson_location":"","cmi.core.lesson_status":"completed","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"{\\"lang\\":\\"en\\",\\"completion\\":\\"-1111111\\",\\"questions\\":\\"\\",\\"_isCourseComplete\\":true,\\"_isAssessmentPassed\\":false}","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"}}',
      objectives: '{"adapt_scorm":"","item_1":""}',
      interactions:
        '{"adapt_scorm":"","item_1":"    cmi.interactions_0 = new Object();\\n    cmi.interactions_0.objectives = new Object();\\n    cmi.interactions_0.objectives._children = objectives_children;\\n    cmi.interactions_0.correct_responses = new Object();\\n    cmi.interactions_0.correct_responses._children = correct_responses_children;\\n    cmi.interactions_0.id = \\"5cd58e9cd35dedaa11771534\\";\\n    cmi.interactions_0.result = \\"correct\\";\\n    cmi.interactions_0.student_response = \\"1.2,2.1,3.1,4.1\\";\\n    cmi.interactions_0.time = \\"11:18:55\\";\\n    cmi.interactions_0.type = \\"matching\\";\\n    cmi.interactions_1 = new Object();\\n    cmi.interactions_1.objectives = new Object();\\n    cmi.interactions_1.objectives._children = objectives_children;\\n    cmi.interactions_1.correct_responses = new Object();\\n    cmi.interactions_1.correct_responses._children = correct_responses_children;\\n    cmi.interactions_1.id = \\"5cd58e9cd35dedaa11771534\\";\\n    cmi.interactions_1.result = \\"correct\\";\\n    cmi.interactions_1.student_response = \\"1.2,2.1,3.1,4.1\\";\\n    cmi.interactions_1.time = \\"11:19:58\\";\\n    cmi.interactions_1.type = \\"matching\\";\\n    cmi.interactions._count = 2;\\n"}'
    },
    {
      attempt: 2,
      timestarted: "1595561104",
      gradereported: 1,
      defaults:
        '{"adapt_scorm":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"ab-initio","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"},"item_1":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"completed","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"{\\"lang\\":\\"en\\",\\"completion\\":\\"-1111111\\",\\"questions\\":\\"\\",\\"_isCourseComplete\\":true,\\"_isAssessmentPassed\\":false}","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"}}',
      objectives: '{"adapt_scorm":"","item_1":""}',
      interactions:
        '{"adapt_scorm":"","item_1":"    cmi.interactions_0 = new Object();\\n    cmi.interactions_0.objectives = new Object();\\n    cmi.interactions_0.objectives._children = objectives_children;\\n    cmi.interactions_0.correct_responses = new Object();\\n    cmi.interactions_0.correct_responses._children = correct_responses_children;\\n    cmi.interactions_0.id = \\"5cd58e9cd35dedaa11771534\\";\\n    cmi.interactions_0.result = \\"correct\\";\\n    cmi.interactions_0.student_response = \\"1.2,2.1,3.1,4.1\\";\\n    cmi.interactions_0.time = \\"15:52:10\\";\\n    cmi.interactions_0.type = \\"matching\\";\\n    cmi.interactions._count = 1;\\n"}'
    },
    {
      attempt: 3,
      timestarted: "1596599539",
      gradereported: 1,
      defaults:
        '{"adapt_scorm":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"ab-initio","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"},"item_1":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"completed","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"{\\"lang\\":\\"en\\",\\"completion\\":\\"-1111111\\",\\"questions\\":\\"\\",\\"_isCourseComplete\\":true,\\"_isAssessmentPassed\\":false}","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"}}',
      objectives: '{"adapt_scorm":"","item_1":""}',
      interactions:
        '{"adapt_scorm":"","item_1":"    cmi.interactions_0 = new Object();\\n    cmi.interactions_0.objectives = new Object();\\n    cmi.interactions_0.objectives._children = objectives_children;\\n    cmi.interactions_0.correct_responses = new Object();\\n    cmi.interactions_0.correct_responses._children = correct_responses_children;\\n    cmi.interactions_0.id = \\"5cd58e9cd35dedaa11771534\\";\\n    cmi.interactions_0.result = \\"correct\\";\\n    cmi.interactions_0.student_response = \\"1.2,2.1,3.1,4.1\\";\\n    cmi.interactions_0.time = \\"16:24:34\\";\\n    cmi.interactions_0.type = \\"matching\\";\\n    cmi.interactions._count = 1;\\n"}'
    },
    {
      attempt: 4,
      timestarted: "1596601484",
      gradereported: 1,
      defaults:
        '{"adapt_scorm":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"ab-initio","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"},"item_1":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:02:31.78","cmi.core.lesson_location":"","cmi.core.lesson_status":"completed","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"{\\"lang\\":\\"en\\",\\"completion\\":\\"-1111111\\",\\"questions\\":\\"\\",\\"_isCourseComplete\\":true,\\"_isAssessmentPassed\\":false}","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"}}',
      objectives: '{"adapt_scorm":"","item_1":""}',
      interactions:
        '{"adapt_scorm":"","item_1":"    cmi.interactions_0 = new Object();\\n    cmi.interactions_0.objectives = new Object();\\n    cmi.interactions_0.objectives._children = objectives_children;\\n    cmi.interactions_0.correct_responses = new Object();\\n    cmi.interactions_0.correct_responses._children = correct_responses_children;\\n    cmi.interactions_0.id = \\"5cd58e9cd35dedaa11771534\\";\\n    cmi.interactions_0.result = \\"correct\\";\\n    cmi.interactions_0.student_response = \\"1.2,2.1,3.1,4.1\\";\\n    cmi.interactions_0.time = \\"16:39:07\\";\\n    cmi.interactions_0.type = \\"matching\\";\\n    cmi.interactions._count = 1;\\n"}'
    },
    {
      attempt: 5,
      timestarted: "1597898419",
      gradereported: 1,
      defaults:
        '{"adapt_scorm":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"ab-initio","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"},"item_1":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"completed","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"{\\"lang\\":\\"en\\",\\"completion\\":\\"-1111111\\",\\"questions\\":\\"\\",\\"_isCourseComplete\\":true,\\"_isAssessmentPassed\\":false}","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"}}',
      objectives: '{"adapt_scorm":"","item_1":""}',
      interactions:
        '{"adapt_scorm":"","item_1":"    cmi.interactions_0 = new Object();\\n    cmi.interactions_0.objectives = new Object();\\n    cmi.interactions_0.objectives._children = objectives_children;\\n    cmi.interactions_0.correct_responses = new Object();\\n    cmi.interactions_0.correct_responses._children = correct_responses_children;\\n    cmi.interactions_0.id = \\"5cd58e9cd35dedaa11771534\\";\\n    cmi.interactions_0.result = \\"correct\\";\\n    cmi.interactions_0.student_response = \\"1.2,2.1,3.1,4.1\\";\\n    cmi.interactions_0.time = \\"16:40:50\\";\\n    cmi.interactions_0.type = \\"matching\\";\\n    cmi.interactions._count = 1;\\n"}'
    },
    {
      attempt: 6,
      timestarted: "1598227577",
      gradereported: 1,
      defaults:
        '{"adapt_scorm":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"ab-initio","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"},"item_1":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"completed","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"{\\"lang\\":\\"en\\",\\"completion\\":\\"-1111111\\",\\"questions\\":\\"\\",\\"_isCourseComplete\\":true,\\"_isAssessmentPassed\\":false}","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"}}',
      objectives: '{"adapt_scorm":"","item_1":""}',
      interactions:
        '{"adapt_scorm":"","item_1":"    cmi.interactions_0 = new Object();\\n    cmi.interactions_0.objectives = new Object();\\n    cmi.interactions_0.objectives._children = objectives_children;\\n    cmi.interactions_0.correct_responses = new Object();\\n    cmi.interactions_0.correct_responses._children = correct_responses_children;\\n    cmi.interactions_0.id = \\"5cd58e9cd35dedaa11771534\\";\\n    cmi.interactions_0.result = \\"correct\\";\\n    cmi.interactions_0.student_response = \\"1.2,2.1,3.1,4.1\\";\\n    cmi.interactions_0.time = \\"15:54:53\\";\\n    cmi.interactions_0.type = \\"matching\\";\\n    cmi.interactions._count = 1;\\n"}'
    },
    {
      attempt: 7,
      timestarted: "1598500508",
      gradereported: 1,
      defaults:
        '{"adapt_scorm":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"ab-initio","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"},"item_1":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"completed","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"{\\"lang\\":\\"en\\",\\"completion\\":\\"-1111111\\",\\"questions\\":\\"\\",\\"_isCourseComplete\\":true,\\"_isAssessmentPassed\\":false}","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"}}',
      objectives: '{"adapt_scorm":"","item_1":""}',
      interactions:
        '{"adapt_scorm":"","item_1":"    cmi.interactions_0 = new Object();\\n    cmi.interactions_0.objectives = new Object();\\n    cmi.interactions_0.objectives._children = objectives_children;\\n    cmi.interactions_0.correct_responses = new Object();\\n    cmi.interactions_0.correct_responses._children = correct_responses_children;\\n    cmi.interactions_0.id = \\"5cd58e9cd35dedaa11771534\\";\\n    cmi.interactions_0.result = \\"correct\\";\\n    cmi.interactions_0.student_response = \\"1.2,2.1,3.1,4.1\\";\\n    cmi.interactions_0.time = \\"15:55:22\\";\\n    cmi.interactions_0.type = \\"matching\\";\\n    cmi.interactions._count = 1;\\n"}'
    },
    {
      attempt: 8,
      timestarted: "1606711313",
      gradereported: 1,
      defaults:
        '{"adapt_scorm":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"ab-initio","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"},"item_1":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"completed","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"{\\"lang\\":\\"en\\",\\"completion\\":\\"-1111111\\",\\"questions\\":\\"\\",\\"_isCourseComplete\\":true,\\"_isAssessmentPassed\\":false}","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"}}',
      objectives: '{"adapt_scorm":"","item_1":""}',
      interactions:
        '{"adapt_scorm":"","item_1":"    cmi.interactions_0 = new Object();\\n    cmi.interactions_0.objectives = new Object();\\n    cmi.interactions_0.objectives._children = objectives_children;\\n    cmi.interactions_0.correct_responses = new Object();\\n    cmi.interactions_0.correct_responses._children = correct_responses_children;\\n    cmi.interactions_0.id = \\"5cd58e9cd35dedaa11771534\\";\\n    cmi.interactions_0.result = \\"wrong\\";\\n    cmi.interactions_0.student_response = \\"1.2,2.2,3.1,4.1\\";\\n    cmi.interactions_0.time = \\"17:42:18\\";\\n    cmi.interactions_0.type = \\"matching\\";\\n    cmi.interactions._count = 1;\\n"}'
    },
    {
      attempt: 9,
      timestarted: "1611612046",
      gradereported: 0,
      defaults:
        '{"adapt_scorm":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"ab-initio","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"},"item_1":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"incomplete","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"{\\"lang\\":\\"en\\",\\"completion\\":\\"-1111101\\",\\"questions\\":\\"\\",\\"_isCourseComplete\\":false,\\"_isAssessmentPassed\\":false}","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"}}',
      objectives: '{"adapt_scorm":"","item_1":""}',
      interactions: '{"adapt_scorm":"","item_1":""}'
    }
  ],
  showgrades: true,
  attempt_defaults:
    '{"adapt_scorm":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"ab-initio","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"},"item_1":{"cmi.core.student_id":"testuser","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"ab-initio","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"}}',
  __typename: "mod_scorm_scorm"
};
const offlineData = {
  id: "29",
  courseid: "36",
  showgrades: true,
  name: "Introduction to User Experience Design",
  scormtype: "local",
  reference: "test.zip",
  intro:
    'The focus of this course is to introduce the learner to User Experience (UX) Design\n\nUser Experience design is design that is user centered. The goal is to design artifacts that allow the users to meet their needs in the most effective efficient and satisfying manner. The course introduces the novice to a cycle of discovery and evaluation and a set of techniques that meet the user\'s needs. This course is geared toward the novice. It is for learners that have heard about "user experience" or "user interface" design but don\'t really know much about these disciplines. The course mantra is that “Design is a systematic and data driven process.” Design is systematic because it is based on a set of techniques and also on a cycle of discovery. In this course the learner is introduced to the four step user interface design cycle. Along the way learners are exposed to a set of techniques to gather information about a) what the user needs b)how to design and model interfaces based on these and then how to evaluate the design to ascertain that the user\'s goals are met. These techniques are tools that are used in a standardized manner and give us the data we use in our design. This means that anyone (regardless of their current training) that is willing to learn these techniques and follow the proposed cycle can be a UX designer!\n\n',
  introformat: "HTML",
  version: "SCORM_1.2",
  maxgrade: 100,
  grademethod: "0",
  whatgrade: "0",
  maxattempt: null,
  forcecompleted: false,
  forcenewattempt: false,
  lastattemptlock: false,
  masteryoverride: true,
  displaycoursestructure: false,
  skipview: 0,
  nav: 1,
  navpositionleft: -100,
  navpositiontop: -100,
  auto: false,
  width: 100,
  height: 500,
  timeopen: null,
  timeclose: null,
  displayactivityname: true,
  autocommit: false,
  allowmobileoffline: true,
  completion: 1,
  completionview: false,
  completionstatusrequired: null,
  completionscorerequired: null,
  completionstatusallscos: false,
  package_url:
    "https://mobile.demo.totara.software/totara/mobile/pluginfile.php/857/mod_scorm/package/0/test.zip?forcedownload=1",
  launch_url: "https://mobile.demo.totara.software/mod/scorm/player.php?mode=normal&newattempt=on&cm=461&scoid=0",
  repeat_url: "https://mobile.demo.totara.software/mod/scorm/player.php?mode=normal&newattempt=off&cm=461&scoid=0",
  attempts_current: 1,
  calculated_grade: "1",
  offline_package_url: `${mockServerUrl}/scorm/being-dynamic-with-totara-learn.zip`,
  offline_package_contenthash: "b3fda4b2914aebdbc66fc288cfc693519e093332",
  offline_package_sco_identifiers: ["item_1"],
  attempt_defaults:
    '{"adapt_scorm":{"cmi.core.student_id":"tharakad","cmi.core.student_name":"Dushmantha, Tharaka","cmi.core.credit":"credit","cmi.core.entry":"ab-initio","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"},"item_1":{"cmi.core.student_id":"tharakad","cmi.core.student_name":"Dushmantha, Tharaka","cmi.core.credit":"credit","cmi.core.entry":"ab-initio","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"}}',
  attempts: [
    {
      attempt: 1,
      timestarted: "1610596337",
      gradereported: 1,
      __typename: "mod_scorm_scorm_attempt"
    }
  ],
  description:
    'The focus of this course is to introduce the learner to User Experience (UX) Design\n\nUser Experience design is design that is user centered. The goal is to design artifacts that allow the users to meet their needs in the most effective efficient and satisfying manner. The course introduces the novice to a cycle of discovery and evaluation and a set of techniques that meet the user\'s needs. This course is geared toward the novice. It is for learners that have heard about "user experience" or "user interface" design but don\'t really know much about these disciplines. The course mantra is that “Design is a systematic and data driven process.” Design is systematic because it is based on a set of techniques and also on a cycle of discovery. In this course the learner is introduced to the four step user interface design cycle. Along the way learners are exposed to a set of techniques to gather information about a) what the user needs b)how to design and model interfaces based on these and then how to evaluate the design to ascertain that the user\'s goals are met. These techniques are tools that are used in a standardized manner and give us the data we use in our design. This means that anyone (regardless of their current training) that is willing to learn these techniques and follow the proposed cycle can be a UX designer!\n\n',

  autoContinue: false,
  __typename: "mod_scorm_scorm"
};
const scorm = {
  default: { mod_scorm_scorm: () => ({ ...defaultData }) },
  offline: { mod_scorm_scorm: () => ({ ...offlineData }) }
};
module.exports = {
  scorm
};
