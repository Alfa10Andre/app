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

import { gql } from "@apollo/client";
import { config } from "@totara/lib";
import { AUTH_HEADER_FIELD } from "@totara/lib/constants";

//TODO: rename - use alias - when backend finishes TL-26268
const scormQuery = gql`
  query totara_mobile_scorm($scormid: core_id!) {
    scorm: mod_scorm_scorm(scormid: $scormid) {
      id
      courseid
      name
      scormtype
      reference
      intro(format: PLAIN)
      version
      maxgrade
      maxattempt
      forcecompleted
      forcenewattempt
      lastattemptlock
      masteryoverride
      displaycoursestructure
      skipview
      nav
      navpositionleft
      navpositiontop
      auto
      width
      height
      timeclose
      displayactivityname
      autocommit
      allowmobileoffline
      completion
      completionview
      completionstatusrequired
      completionstatusallscos
      packageUrl: package_url
      launchUrl: launch_url
      repeatUrl: repeat_url
      attemptsCurrent: attempts_current
      calculatedGrade: calculated_grade
      offlinePackageUrl: offline_package_url
      offlinePackageContentHash: offline_package_contenthash
      offlinePackageScoIdentifiers: offline_package_sco_identifiers
      attempts {
        attempt
        timestarted
        gradereported
      }
      # Deprecated properties
      type: scormtype
      description: intro(format: PLAIN)
      attemptsForceNew: forcenewattempt
      attemptsLockFinal: lastattemptlock
      autoContinue: auto
      offlineAttemptsAllowed: allowmobileoffline
      newAttemptDefaults: attempt_defaults
      whatgrade
      grademethod
      timeopen
      completionscorerequired
      attemptsMax: maxattempt
      showGrades: showgrades
      __typename
    }
  }
`;

/**
 * returns an map object with all scorms
 */
const scormActivitiesRecordsQuery = gql`
  query get_scorm_bundle {
    scormBundles @client
  }
`;

const scormFeedbackQuery = gql`
  query totara_mobile_scorm_current_status($scormid: core_id!) {
    status: mod_scorm_current_status(scormid: $scormid) {
      maxattempt
      attempts_current
      completion
      completionview
      completionstatusrequired
      completionscorerequired
      completionstatusallscos
      completionstatus
      gradefinal
      grademax
      gradepercentage
      __typename
    }
  }
`;

const mutationAttempts = gql`
  mutation mod_scorm_save_offline_attempts($scormid: core_id!, $attempts: [mod_scorm_attempt!]!) {
    attempts: mod_scorm_save_offline_attempts(scormid: $scormid, attempts: $attempts) {
      attempts_accepted
      maxattempt
      attempts_current
      completion
      completionview
      completionstatusrequired
      completionscorerequired
      completionstatusallscos
      completionstatus
      gradefinal
      grademax
      gradepercentage
      __typename
    }
  }
`;

const fetchLastAttemptResult = ({
  scormId,
  apiKey,
  host
}: {
  scormId: string;
  apiKey: string;
  host: string;
}): Promise<Response> => {
  // fetch from global
  // eslint-disable-next-line no-undef
  return fetch(config.apiUri(host), {
    method: "POST",
    body: JSON.stringify({
      operationName: "totara_mobile_scorm_current_status",
      variables: { scormid: scormId }
    }),
    headers: {
      Accept: "application/json",
      [AUTH_HEADER_FIELD]: apiKey
    }
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(response.status.toString());
    }
  });
};

export { scormQuery, scormFeedbackQuery, scormActivitiesRecordsQuery, mutationAttempts, fetchLastAttemptResult };
