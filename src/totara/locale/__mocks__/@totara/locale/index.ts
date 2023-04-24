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

import { Scope, TranslateOptions } from "i18n-js";

// don't use the real translate as it linked to a native function which checks the phone's locale
// on test we don't need to check translations
const translate = (scope: Scope, options?: TranslateOptions) => `translated ${scope} with ${options}`;

export { translate };
