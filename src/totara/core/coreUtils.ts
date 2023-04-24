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

import { config } from "@totara/lib";

enum Compatible {
  Api = 1
}

const isValidApiVersion = (apiVersoin?: string) => {
  const compatibilityList = isCompatible(apiVersoin);
  return compatibilityList.length > 0;
};

const isCompatible = (version?: string) => {
  const fullCompatible = [Compatible.Api];
  if (config.minApiVersion === "disabled") {
    return fullCompatible;
  } else {
    if (version && config.minApiVersion <= version) return [Compatible.Api];
    else return [];
  }
};

export { isValidApiVersion, isCompatible }