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

import { enrolmentInfoQuery, selfEnrolmentMutation } from "@totara/features/enrolment/api";
import { GraphQLError } from "graphql";

export const enrolmentOptionsMock = [
  {
    request: {
      query: enrolmentInfoQuery,
      variables: {
        courseid: 1
      }
    },
    result: {
      data: {
        enrolmentInfo: {
          isComplete: false,
          isEnrolled: true,
          guestAccess: true,
          canEnrol: true,
          privileged: false,
          enrolmentOptions: [
            {
              id: 1,
              type: "guest",
              roleName: "",
              customName: "",
              sortOrder: "",
              passwordRequired: true
            }
          ],
          __typename: "enrolment_options"
        }
      }
    }
  },
  {
    request: {
      query: enrolmentInfoQuery,
      variables: {
        courseid: 2
      }
    },
    result: {
      data: {
        enrolmentInfo: {
          isComplete: false,
          isEnrolled: false,
          guestAccess: true,
          canEnrol: true,
          privileged: false,
          enrolmentOptions: [
            {
              id: 1,
              type: "guest",
              roleName: "",
              customName: "",
              sortOrder: "",
              passwordRequired: true
            }
          ],
          __typename: "enrolment_options"
        }
      }
    }
  },
  {
    request: {
      query: enrolmentInfoQuery,
      variables: {
        courseid: 3
      }
    },
    result: {
      data: {
        enrolmentInfo: {
          isComplete: false,
          isEnrolled: false,
          guestAccess: false,
          canEnrol: false,
          privileged: false,
          enrolmentOptions: [
            {
              id: 1,
              type: "guest",
              roleName: "",
              customName: "",
              sortOrder: "",
              passwordRequired: true
            }
          ],
          __typename: "enrolment_options"
        }
      }
    }
  },
  {
    request: {
      query: enrolmentInfoQuery,
      variables: {
        courseid: 4
      }
    },
    result: {
      data: {
        enrolmentInfo: {
          isComplete: false,
          isEnrolled: false,
          guestAccess: false,
          canEnrol: true,
          privileged: false,
          enrolmentOptions: [
            {
              id: 1,
              type: "self",
              roleName: "Learner",
              customName: "",
              sortOrder: "",
              passwordRequired: true
            }
          ],
          __typename: "enrolment_options"
        }
      }
    }
  },
  {
    request: {
      query: enrolmentInfoQuery,
      variables: {
        courseid: 5
      }
    },
    result: {
      data: {
        enrolmentInfo: {
          isComplete: false,
          isEnrolled: false,
          guestAccess: false,
          canEnrol: true,
          privileged: false,
          enrolmentOptions: [
            {
              id: 1,
              type: "self",
              roleName: "",
              customName: "self enrolment 1",
              sortOrder: 1,
              passwordRequired: true
            },
            {
              id: 2,
              type: "self",
              roleName: "",
              customName: "self enrolment 2",
              sortOrder: 2,
              passwordRequired: true
            }
          ],
          __typename: "enrolment_options"
        }
      }
    }
  },
  {
    request: {
      query: enrolmentInfoQuery,
      variables: {
        courseid: 0
      }
    },
    result: {
      errors: [new GraphQLError("Error!")]
    }
  },
  {
    request: {
      query: selfEnrolmentMutation,
      variables: {
        input: {
          courseid: 4,
          instanceid: 1,
          password: "wrongPwd"
        }
      }
    },
    result: {
      data: {
        mobile_findlearning_enrolment_result: {
          success: false,
          msgKey: "Incorrect enrolment key, please try again",
          __typename: "core_enrol_attempt_self_enrolment_result"
        }
      }
    }
  },
  {
    request: {
      query: selfEnrolmentMutation,
      variables: {
        input: {
          courseid: 4,
          instanceid: 1,
          password: "correctPwd"
        }
      }
    },
    result: {
      data: {
        mobile_findlearning_enrolment_result: {
          success: true,
          msgKey: null,
          __typename: "core_enrol_attempt_self_enrolment_result"
        }
      }
    }
  }
];
