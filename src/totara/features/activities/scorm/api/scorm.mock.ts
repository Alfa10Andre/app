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

import { scormQuery } from ".";

const scormSuccessMock = [
  {
    request: {
      query: scormQuery
    },
    loading: true,
    result: {
      data: {
        scorm: {
          id: "1",
          courseid: "36",
          name: "Do not touch",
          scormtype: "local",
          reference: "test.zip",
          intro: "Blah",
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
          packageUrl: "https://site.package.url",
          launchUrl: "https://site.launch.url",
          repeatUrl: "https://site.repeat.url",
          attemptsCurrent: 2,
          calculatedGrade: "1",
          offlinePackageUrl: "https://site.offline.package.url.zip",
          offlinePackageContentHash: "b3fda4b2914aebdbc66fc288cfc693519e093332",
          offlinePackageScoIdentifiers: ["item_1"],
          newAttemptDefaults:
            '{"adapt_scorm":{"cmi.core.student_id":"kamala","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"ab-initio","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"},"item_1":{"cmi.core.student_id":"kamala","cmi.core.student_name":"Tennakoon, Kamala","cmi.core.credit":"credit","cmi.core.entry":"ab-initio","cmi.core.lesson_mode":"normal","cmi.launch_data":"","cmi.student_data.mastery_score":"","cmi.student_data.max_time_allowed":"","cmi.student_data.time_limit_action":"","cmi.core.total_time":"00:00:00","cmi.core.lesson_location":"","cmi.core.lesson_status":"","cmi.core.score.raw":"","cmi.core.score.max":"","cmi.core.score.min":"","cmi.core.exit":"","cmi.suspend_data":"","cmi.comments":"","cmi.student_preference.language":"","cmi.student_preference.audio":"0","cmi.student_preference.speed":"0","cmi.student_preference.text":"0"}}',
          attempts: [
            {
              attempt: 1,
              timestarted: "1594089275",
              gradereported: 1,
              __typename: "mod_scorm_scorm_attempt"
            },
            {
              attempt: 2,
              timestarted: "1594676524",
              gradereported: 1,
              __typename: "mod_scorm_scorm_attempt"
            }
          ],
          type: "local",
          description: "Blah",
          attemptsMax: null,
          attemptsForceNew: false,
          attemptsLockFinal: false,
          autoContinue: false,
          offlineAttemptsAllowed: true,
          __typename: "mod_scorm_scorm"
        }
      }
    }
  }
];

const scormEmptyMock = [
  {
    request: {
      query: scormQuery
    },
    loading: true,
    result: {
      data: {}
    }
  }
];

export { scormSuccessMock, scormEmptyMock };
