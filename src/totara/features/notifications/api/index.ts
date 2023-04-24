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
import { NotificationMessage } from "@totara/types";
import { isEmpty } from "lodash";

const parser = (data) => {
  if (!data) return [];
  return data.message_popup_messages.map((message) => {
    const {
      id,
      subject,
      isread: isRead,
      fullmessage: fullMessage,
      fullmessageformat: fullMessageFormat,
      timecreated: timeCreated,
      contextUrl,
      fullmessageHTML: fullMessageHTML
    } = message;
    return {
      id,
      subject,
      isRead,
      fullMessage,
      timeCreated,
      fullMessageFormat,
      contextUrl,
      fullMessageHTML
    } as NotificationMessage;
  });
};

const countUnreadMessages = (data) => {
  if (data && !isEmpty(data.message_popup_messages))
    return data.message_popup_messages.filter((x) => x.isread === false).length;
  return 0;
};

const notificationsQuery = gql`
  query totara_mobile_messages {
    message_popup_messages {
      id
      subject
      fullmessage
      fullmessageformat
      timecreated
      isread
      fullmessageHTML: fullmessagehtml
      contextUrl: contexturl
      __typename
    }
  }
`;

const notificationQueryMarkRead = gql`
  mutation totara_mobile_mark_messages_read($input: message_popup_mark_messages_read_input!) {
    message_popup_mark_messages_read(input: $input) {
      read_message_ids
      __typename
    }
  }
`;

const mutationForToken = gql`
  mutation totara_mobile_set_fcmtoken($token: String) {
    set_fcmtoken: totara_mobile_set_fcmtoken(token: $token)
  }
`;

export { notificationsQuery, notificationQueryMarkRead, mutationForToken, parser, countUnreadMessages };
