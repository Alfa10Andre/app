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
 * 
 * @author Simon Tegg <simon.tegg@totaralearning.com>
 */

import { set } from "./utils/object";

function initializeCMI(model) {
  const newCMI = {
    core: {
      score: {},
      lesson_status: "not attempted"
    },
    objectives: {
      _count: 0
    },
    student_data: {},
    student_preference: {},
    interactions: {
      _count: 0
    },
    evaluation: {
      comments: {}
    }
  };
  return Object.keys(model).reduce((newCMI, pathString) => {
    // remove 'cmi' from the path
    const path = pathString.split(".").slice(1);

    // property specified as an array of objects
    if (path.includes("n")) {
      return newCMI;
    }

    // initialize cmi properties
    const { defaultvalue } = model[pathString];
    const val =
      pathString === "cmi.core.lesson_status"
        ? "not attempted"
        : typeof defaultvalue != "undefined"
        ? defaultvalue
        : "";

    set(newCMI, path, val);
    return newCMI;
  }, newCMI);
}

export default initializeCMI;
