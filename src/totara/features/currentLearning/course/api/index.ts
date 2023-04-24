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

const coreCourse = gql`
  query totara_mobile_course($courseid: core_id!, $guestpw: String) {
    mobile_course: totara_mobile_course(courseid: $courseid, guestpw: $guestpw) {
      course(courseid: $courseid) {
        id
        format
        fullname
        shortname
        summary(format: PLAIN)
        summaryformat
        startdate(format: ISO8601)
        enddate(format: ISO8601)
        lang
        image
        sections {
          id
          title
          available
          availablereason(format: PLAIN)
          summary(format: PLAIN)
          summaryformat
          data: modules {
            id
            instanceid
            modtype
            name
            available
            availablereason(format: PLAIN)
            viewurl
            completion
            completionstatus
            showdescription
            description(format: PLAIN)
            gradefinal
            gradepercentage
            descriptionformat
            __typename
          }
          __typename
        }
        criteriaaggregation
        criteria {
          id
          type
          typeaggregation
          criteria
          requirement
          status
          complete
          completiondate(format: ISO8601)
          __typename
        }
        showGrades: showgrades
        completionEnabled: completionenabled
        completion {
          id
          statuskey
          progress
          timecompleted(format: ISO8601)
          __typename
        }
        __typename
      }
      native: mobile_coursecompat
      imageSrc: mobile_image
      gradeFinal: formatted_gradefinal
      gradeMax: formatted_grademax
      __typename
    }
  }
`;

const courseSelfComplete = gql`
  mutation totara_mobile_completion_course_self_complete($courseid: core_id!) {
    core_completion_course_self_complete(courseid: $courseid)
  }
`;

const activitySelfComplete = gql`
  mutation totara_mobile_completion_activity_self_complete($cmid: core_id!, $complete: Boolean!) {
    core_completion_activity_self_complete(cmid: $cmid, complete: $complete)
  }
`;

type FetchParam = {
  instanceId: number;
  apiKey: string;
  host: string;
  modtype?: string;
};

const XMLHttpRequestPostFetch = (host, body, apiKey) => {
  return new Promise(function (resolve, reject) {
    // We decided to use XMLHttpRequest instead of fetch because fetch seems to have an issue being blocked by some missing certificate
    // please check https://github.com/facebook/react-native/issues/32931 and MOB-1144
    // eslint-disable-next-line no-undef
    var request = new XMLHttpRequest();
    request.open("POST", config.apiUri(host));
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader(AUTH_HEADER_FIELD, apiKey);

    request.onload = function () {
      if (request.status >= 200 && request.status < 300) {
        resolve(request.response);
      } else {
        reject({
          status: request.status,
          statusText: request.statusText
        });
      }
    };

    request.onerror = function () {
      reject({
        status: request.status,
        statusText: request.statusText
      });
    };

    request.send(body);
  });
};

const fetchResource = ({ instanceId, apiKey, host }: FetchParam): Promise<unknown> => {
  return XMLHttpRequestPostFetch(
    host,
    JSON.stringify({
      operationName: "totara_mobile_resource",
      variables: { resourceid: instanceId }
    }),
    apiKey
  );
};

const updateStateViewResource = ({ instanceId, modtype, apiKey, host }: FetchParam): Promise<unknown> => {
  return XMLHttpRequestPostFetch(
    host,
    JSON.stringify({
      operationName: "totara_mobile_completion_activity_view",
      variables: { cmid: instanceId, activity: modtype }
    }),
    apiKey
  );
};

export { coreCourse, courseSelfComplete, activitySelfComplete, fetchResource, updateStateViewResource };
