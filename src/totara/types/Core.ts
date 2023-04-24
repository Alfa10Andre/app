/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2019 onwards Totara Learning Solutions LTD
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

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  lang: string;
}

export interface System {
  wwwroot: string;
  apiurl: string;
  release: string;
  request_policy_agreement: boolean;
  request_user_consent: boolean;
  request_user_fields: boolean;
  password_change_required: boolean;
}

/** @deprecated */
export interface Me {
  user: User;
  system: System;
}

export interface Core {
  user: User;
  system: System;
}
