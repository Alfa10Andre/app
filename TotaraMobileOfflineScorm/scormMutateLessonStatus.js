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

function lessonStatus(cmi, defaultvalue, masteryOverride) {
  if (cmi.core.lesson_mode == "browse") {
    if (defaultvalue == "" && cmi.core.lesson_status == "not attempted") {
      cmi.core.lesson_status = "browsed";
    }
  }

  if (cmi.core.lesson_mode == "normal") {
    if (cmi.core.credit == "credit") {
      if (masteryOverride && cmi.student_data.mastery_score !== "" && cmi.core.score.raw !== "") {
        if (parseFloat(cmi.core.score.raw) >= parseFloat(cmi.student_data.mastery_score)) {
          cmi.core.lesson_status = "passed";
        } else {
          cmi.core.lesson_status = "failed";
        }
      }
    }
  }

  if (cmi.core.lesson_status == "not attempted") {
    cmi.core.lesson_status = "completed";
  }

  return cmi;
}

export default lessonStatus;
