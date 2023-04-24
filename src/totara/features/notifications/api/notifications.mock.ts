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

import { notificationsQuery } from "@totara/features/notifications/api/index";
import { GraphQLError } from "graphql";

const notificationsMock = [
  {
    request: {
      query: notificationsQuery
    },
    result: {
      data: {
        message_popup_messages: [
          {
            id: "1",
            subject: "Notification item",
            fullmessage: "Full message example",
            fullmessageformat: "PLAIN",
            isread: true,
            timecreated: 111,
            contextUrl: "http://dummy.url",
            fullmessageHTML: "dummy_data",
            __typename: "message_popup_messages"
          },
          {
            id: "2",
            subject: "Notification item 2",
            fullmessage: "Full message example 2",
            fullmessageformat: "PLAIN",
            isread: true,
            timecreated: 222,
            contextUrl: null,
            fullmessageHTML: null,
            __typename: "message_popup_messages"
          }
        ]
      }
    }
  }
];

const notificationsMockUnRead = [
  {
    request: {
      query: notificationsQuery
    },
    result: {
      data: {
        message_popup_messages: [
          {
            id: "1",
            subject: "Notification item",
            fullmessage: "Full message example",
            fullmessageformat: "PLAIN",
            isread: false,
            timecreated: 111,
            contextUrl: "http://dummy.url",
            fullmessageHTML: "dummy_data",
            __typename: "message_popup_messages"
          },
          {
            id: "2",
            subject: "Notification item 2",
            fullmessage: "Full message example 2",
            fullmessageformat: "PLAIN",
            isread: false,
            timecreated: 222,
            contextUrl: null,
            fullmessageHTML: null,
            __typename: "message_popup_messages"
          }
        ]
      }
    }
  }
];

const notificationsMockEmpty = [
  {
    request: {
      query: notificationsQuery
    },
    result: {
      data: {
        message_popup_messages: []
      }
    }
  }
];

const notificationsMockError = [
  {
    request: {
      query: notificationsQuery
    },
    result: {
      errors: [new GraphQLError("Error!")]
    }
  }
];

export { notificationsMock, notificationsMockEmpty, notificationsMockError, notificationsMockUnRead };
