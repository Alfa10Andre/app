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

import { getCurrentTimeStampInSeconds } from './utils/index'

function addTime(first, second) {
  let sFirst = first.split(":");
  let sSecond = second.split(":");
  let cFirst = sFirst[2].split(".");
  let cSecond = sSecond[2].split(".");
  let change = 0;

  let FirstCents = 0; //Cents
  if (cFirst.length > 1) {
    FirstCents = parseInt(cFirst[1], 10);
  }
  let SecondCents = 0;
  if (cSecond.length > 1) {
    SecondCents = parseInt(cSecond[1], 10);
  }
  let cents = FirstCents + SecondCents;
  change = Math.floor(cents / 100);
  cents = cents - change * 100;
  if (Math.floor(cents) < 10) {
    cents = "0" + cents.toString();
  }

  let secs = parseInt(cFirst[0], 10) + parseInt(cSecond[0], 10) + change; //Seconds
  change = Math.floor(secs / 60);
  secs = secs - change * 60;
  if (Math.floor(secs) < 10) {
    secs = "0" + secs.toString();
  }

  let mins = parseInt(sFirst[1], 10) + parseInt(sSecond[1], 10) + change; //Minutes
  change = Math.floor(mins / 60);
  mins = mins - change * 60;
  if (mins < 10) {
    mins = "0" + mins.toString();
  }

  let hours = parseInt(sFirst[0], 10) + parseInt(sSecond[0], 10) + change; //Hours
  if (hours < 10) {
    hours = "0" + hours.toString();
  }

  if (cents != "0") {
    return hours + ":" + mins + ":" + secs + "." + cents;
  } else {
    return hours + ":" + mins + ":" + secs;
  }
}

function totalTime({ totalTime, sessionTime, objectId }) {
  return {
    identifier: objectId,
    element: "cmi.core.total_time",
    value: addTime(totalTime, sessionTime),
    timemodified: getCurrentTimeStampInSeconds()
  };
}

export default totalTime;
