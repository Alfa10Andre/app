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
import { isDefined, getCurrentTimeStampInSeconds } from "./utils/index";
import { CMIIndex } from "./utils/index";

// main
function collectData({ dataModel, objectId, data, parent }) {
  let dataList = [];

  Object.keys(data).forEach((property) => {
    const value = data[property];

    if (typeof value == "object") {
      const subDataList = collectData({
        dataModel,
        objectId,
        data: value,
        parent: `${parent}.${property}`
      });

      dataList = dataList.concat(subDataList);
      return;
    }

    const pathString = `${parent}.${property}`;

    // ignore the session time element
    if (pathString === "cmi.core.session_time") {
      return;
    }

    const genericPath = pathString.replace(CMIIndex, ".n.");
    const modelValue = dataModel[objectId][pathString];
    const genericValue = dataModel[objectId][genericPath];

    if (!isDefined(modelValue) && isDefined(genericValue)) {
      dataModel[objectId][pathString] = Object.assign({}, genericValue);
    }

    if (!isDefined(modelValue)) {
      return;
    }

    // make sure this is not a read only element
    if (modelValue.mod && value.mod === "r") {
      return;
    }

    if (shouldUpdate(modelValue.defaultvalue, value)) {
      dataList.push({
        identifier: objectId,
        element: pathString,
        value,
        timemodified: getCurrentTimeStampInSeconds()
      });

      dataModel[objectId][pathString].defaultvalue = value;
    }
  });

  return dataList;
}

export default collectData;

// helpers
function shouldUpdate(defaultvalue, value) {
  if (!isDefined(defaultvalue)) {
    return true;
  }

  return defaultvalue !== value || typeof defaultvalue !== value;
}
