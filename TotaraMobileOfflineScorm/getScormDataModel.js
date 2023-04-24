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

const CMIString256 = "^[\\u0000-\\uFFFF]{0,255}$";
const CMIString4096 = "^[\\u0000-\\uFFFF]{0,4096}$";
const CMITime = "^([0-2]{1}[0-9]{1}):([0-5]{1}[0-9]{1}):([0-5]{1}[0-9]{1})(.[0-9]{1,2})?$";
const CMITimespan = "^([0-9]{2,4}):([0-9]{2}):([0-9]{2})(.[0-9]{1,2})?$";
// const CMIInteger = "^\\d+$";
const CMISInteger = "^-?([0-9]+)$";
const CMIDecimal = "^-?([0-9]{0,3})(.[0-9]*)?$";
const CMIIdentifier = "^[\\u0021-\\u007E]{0,255}$";
const CMIFeedback = CMIString256; // This must be redefined
const CMIIndex = "[._](\\d+).";
// Vocabulary Data Type Definition
const CMIStatus = "^passed$|^completed$|^failed$|^incomplete$|^browsed$";
const CMIStatus2 = "^passed$|^completed$|^failed$|^incomplete$|^browsed$|^not attempted$";
const CMIExit = "^time-out$|^suspend$|^logout$|^$";
const CMIType = "^true-false$|^choice$|^fill-in$|^matching$|^performance$|^sequencing$|^likert$|^numeric$";
const CMIResult = "^correct$|^wrong$|^unanticipated$|^neutral$|^([0-9]{0,3})?(.[0-9]*)?$";
const NAVEvent = "^previous$|^continue$";
const cmi_children = "core,suspend_data,launch_data,comments,objectives,student_data,student_preference,interactions";
const core_children =
  "student_id,student_name,lesson_location,credit,lesson_status,entry,score,total_time,lesson_mode,exit,session_time";
const score_children = "raw,min,max";
const comments_children = "content,location,time";
const objectives_children = "id,score,status";
// const correct_responses_children = "pattern";
const student_data_children = "mastery_score,max_time_allowed,time_limit_action";
const student_preference_children = "audio,language,speed,text";
const interactions_children = "id,objectives,time,type,correct_responses,weighting,student_response,result,latency";
// Data ranges
const score_range = "0#100";
const audio_range = "-1#100";
const speed_range = "-100#100";
const weighting_range = "-100#100";
const text_range = "-1#1";

function getDataModel1_2(defaults) {
  return Object.keys(defaults).reduce((datamodel, id) => {
    const def = defaults[id];

    datamodel[id] = {
      "cmi._children": {
        defaultvalue: cmi_children,
        mod: "r",
        writeerror: "402"
      },
      "cmi._version": {
        defaultvalue: "3.4",
        mod: "r",
        writeerror: "402"
      },
      "cmi.core._children": {
        defaultvalue: core_children,
        mod: "r",
        writeerror: "402"
      },
      "cmi.core.student_id": {
        defaultvalue: def["cmi.core.student_id"],
        mod: "r",
        writeerror: "403"
      },
      "cmi.core.student_name": {
        defaultvalue: def["cmi.core.student_name"],
        mod: "r",
        writeerror: "403"
      },
      "cmi.core.lesson_location": {
        defaultvalue: def["cmi.core.lesson_location"],
        format: CMIString256,
        mod: "rw",
        writeerror: "405"
      },
      "cmi.core.credit": {
        defaultvalue: def["cmi.core.credit"],
        mod: "r",
        writeerror: "403"
      },
      "cmi.core.lesson_status": {
        defaultvalue: def["cmi.core.lesson_status"],
        format: CMIStatus,
        mod: "rw",
        writeerror: "405"
      },
      "cmi.core.entry": {
        defaultvalue: def["cmi.core.entry"],
        mod: "r",
        writeerror: "403"
      },
      "cmi.core.score._children": {
        defaultvalue: score_children,
        mod: "r",
        writeerror: "402"
      },
      "cmi.core.score.raw": {
        defaultvalue: def["cmi.core.score.raw"],
        format: CMIDecimal,
        range: score_range,
        mod: "rw",
        writeerror: "405"
      },
      "cmi.core.score.max": {
        defaultvalue: def["cmi.core.score.max"],
        format: CMIDecimal,
        range: score_range,
        mod: "rw",
        writeerror: "405"
      },
      "cmi.core.score.min": {
        defaultvalue: def["cmi.core.score.min"],
        format: CMIDecimal,
        range: score_range,
        mod: "rw",
        writeerror: "405"
      },
      "cmi.core.total_time": {
        defaultvalue: def["cmi.core.total_time"],
        mod: "r",
        writeerror: "403"
      },
      "cmi.core.lesson_mode": {
        defaultvalue: def["cmi.core.lesson_mode"],
        mod: "r",
        writeerror: "403"
      },
      "cmi.core.exit": {
        defaultvalue: def["cmi.core.exit"],
        format: CMIExit,
        mod: "w",
        readerror: "404",
        writeerror: "405"
      },
      "cmi.core.session_time": {
        format: CMITimespan,
        mod: "w",
        defaultvalue: "00:00:00",
        readerror: "404",
        writeerror: "405"
      },
      "cmi.suspend_data": {
        defaultvalue: def["cmi.suspend_data"],
        format: CMIString4096,
        mod: "rw",
        writeerror: "405"
      },
      "cmi.launch_data": {
        defaultvalue: def["cmi.launch_data"],
        mod: "r",
        writeerror: "403"
      },
      "cmi.comments": {
        defaultvalue: def["cmi.comments"],
        format: CMIString4096,
        mod: "rw",
        writeerror: "405"
      },
      // deprecated evaluation attributes
      "cmi.evaluation.comments._count": {
        defaultvalue: "0",
        mod: "r",
        writeerror: "402"
      },
      "cmi.evaluation.comments._children": {
        defaultvalue: comments_children,
        mod: "r",
        writeerror: "402"
      },
      "cmi.evaluation.comments.n.content": {
        defaultvalue: "",
        pattern: CMIIndex,
        format: CMIString256,
        mod: "rw",
        writeerror: "405"
      },
      "cmi.evaluation.comments.n.location": {
        defaultvalue: "",
        pattern: CMIIndex,
        format: CMIString256,
        mod: "rw",
        writeerror: "405"
      },
      "cmi.evaluation.comments.n.time": {
        defaultvalue: "",
        pattern: CMIIndex,
        format: CMITime,
        mod: "rw",
        writeerror: "405"
      },
      "cmi.comments_from_lms": { mod: "r", writeerror: "403" },

      "cmi.objectives._children": {
        defaultvalue: objectives_children,
        mod: "r",
        writeerror: "402"
      },
      "cmi.objectives._count": {
        mod: "r",
        defaultvalue: "0",
        writeerror: "402"
      },
      "cmi.objectives.n.id": {
        pattern: CMIIndex,
        format: CMIIdentifier,
        mod: "rw",
        writeerror: "405"
      },
      "cmi.objectives.n.score._children": {
        pattern: CMIIndex,
        mod: "r",
        writeerror: "402"
      },
      "cmi.objectives.n.score.raw": {
        defaultvalue: "",
        pattern: CMIIndex,
        format: CMIDecimal,
        range: score_range,
        mod: "rw",
        writeerror: "405"
      },
      "cmi.objectives.n.score.min": {
        defaultvalue: "",
        pattern: CMIIndex,
        format: CMIDecimal,
        range: score_range,
        mod: "rw",
        writeerror: "405"
      },
      "cmi.objectives.n.score.max": {
        defaultvalue: "",
        pattern: CMIIndex,
        format: CMIDecimal,
        range: score_range,
        mod: "rw",
        writeerror: "405"
      },
      "cmi.objectives.n.status": {
        pattern: CMIIndex,
        format: CMIStatus2,
        mod: "rw",
        writeerror: "405"
      },
      "cmi.student_data._children": {
        defaultvalue: student_data_children,
        mod: "r",
        writeerror: "402"
      },
      "cmi.student_data.mastery_score": {
        defaultvalue: def["cmi.student_data.mastery_score"],
        mod: "r",
        writeerror: "403"
      },
      "cmi.student_data.max_time_allowed": {
        defaultvalue: def["cmi.student_data.max_time_allowed"],
        mod: "r",
        writeerror: "403"
      },
      "cmi.student_data.time_limit_action": {
        defaultvalue: def["cmi.student_data.time_limit_action"],
        mod: "r",
        writeerror: "403"
      },
      "cmi.student_preference._children": {
        defaultvalue: student_preference_children,
        mod: "r",
        writeerror: "402"
      },
      "cmi.student_preference.audio": {
        defaultvalue: def["cmi.student_preference.audio"],
        format: CMISInteger,
        range: audio_range,
        mod: "rw",
        writeerror: "405"
      },
      "cmi.student_preference.language": {
        defaultvalue: def["cmi.student_preference.language"],
        format: CMIString256,
        mod: "rw",
        writeerror: "405"
      },
      "cmi.student_preference.speed": {
        defaultvalue: def["cmi.student_preference.speed"],
        format: CMISInteger,
        range: speed_range,
        mod: "rw",
        writeerror: "405"
      },
      "cmi.student_preference.text": {
        defaultvalue: def["cmi.student_preference.text"],
        format: CMISInteger,
        range: text_range,
        mod: "rw",
        writeerror: "405"
      },

      "cmi.interactions._children": {
        defaultvalue: interactions_children,
        mod: "r",
        writeerror: "402"
      },
      "cmi.interactions._count": {
        mod: "r",
        defaultvalue: "0",
        writeerror: "402"
      },
      "cmi.interactions.n.id": {
        pattern: CMIIndex,
        format: CMIIdentifier,
        mod: "w",
        readerror: "404",
        writeerror: "405"
      },
      "cmi.interactions.n.objectives._count": {
        pattern: CMIIndex,
        mod: "r",
        defaultvalue: "0",
        writeerror: "402"
      },
      "cmi.interactions.n.objectives.n.id": {
        pattern: CMIIndex,
        format: CMIIdentifier,
        mod: "w",
        readerror: "404",
        writeerror: "405"
      },
      "cmi.interactions.n.time": {
        pattern: CMIIndex,
        format: CMITime,
        mod: "w",
        readerror: "404",
        writeerror: "405"
      },
      "cmi.interactions.n.type": {
        pattern: CMIIndex,
        format: CMIType,
        mod: "w",
        readerror: "404",
        writeerror: "405"
      },
      "cmi.interactions.n.correct_responses._count": {
        pattern: CMIIndex,
        mod: "r",
        defaultvalue: "0",
        writeerror: "402"
      },
      "cmi.interactions.n.correct_responses.n.pattern": {
        pattern: CMIIndex,
        format: CMIFeedback,
        mod: "w",
        readerror: "404",
        writeerror: "405"
      },
      "cmi.interactions.n.weighting": {
        pattern: CMIIndex,
        format: CMIDecimal,
        range: weighting_range,
        mod: "w",
        readerror: "404",
        writeerror: "405"
      },
      "cmi.interactions.n.student_response": {
        pattern: CMIIndex,
        format: CMIFeedback,
        mod: "w",
        readerror: "404",
        writeerror: "405"
      },
      "cmi.interactions.n.result": {
        pattern: CMIIndex,
        format: CMIResult,
        mod: "w",
        readerror: "404",
        writeerror: "405"
      },
      "cmi.interactions.n.latency": {
        pattern: CMIIndex,
        format: CMITimespan,
        mod: "w",
        readerror: "404",
        writeerror: "405"
      },
      "nav.event": {
        defaultvalue: "",
        format: NAVEvent,
        mod: "w",
        readerror: "404",
        writeerror: "405"
      }
    };

    return datamodel;
  }, {});
}

export default getDataModel1_2;
