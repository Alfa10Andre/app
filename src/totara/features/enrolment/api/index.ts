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

import { gql } from "@apollo/client";

export const enrolmentInfoQuery = gql`
  query mobile_findlearning_enrolment_info($courseid: core_id!) {
    enrolmentInfo: core_enrol_course_info(courseid: $courseid) {
      isComplete: is_complete
      isEnrolled: is_enrolled
      guestAccess: guest_access
      canEnrol: can_enrol
      priviledged: can_view
      enrolmentOptions: enrolment_options {
        id
        type
        roleName: role_name
        customName: custom_name
        sortOrder: sort_order
        passwordRequired: password_required
      }
    }
  }
`;

export const guestAccessQuery = gql`
  query mobile_findlearning_validate_guest_password($input: mobile_findlearning_guest_password_input!) {
    mobile_findlearning_validate_guest_password(input: $input) {
      success
      failureMessage: message
      __typename
    }
  }
`;

export const selfEnrolmentMutation = gql`
  mutation mobile_findlearning_attempt_self_enrolment($input: core_enrol_attempt_self_enrolment_input!) {
    mobile_findlearning_enrolment_result: core_enrol_attempt_self_enrolment(input: $input) {
      success
      msgKey: msg_key
      __typename
    }
  }
`;
