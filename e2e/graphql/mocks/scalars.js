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

const date = {
  Date: () => new Date()
};

const defaultString = {
  String: () => "Mocked String"
};

const defaultCoreId = {
  core_id: () => "8"
};

const defaultFloat = {
  Float: () => 7
};

const defaultCoreDate = {
  core_date: () => new Date()
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const defaultLI = {
  mobile_currentlearning_item: () => ({
    id: `course_${getRandomInt(30)}`,
    itemtype: "course",
    itemcomponent: "totara_program",
    description_format: "HTML",
    url_view: "https://mobile.demo.totara.software/totara/program/view.php?id=12",
    duedate: "2020-09-10T00:00:00+0100",
    duedate_state: "danger",
    mobile_coursecompat: true,
    mobile_image: "https://mobile.demo.totara.software/theme/image.php/ventura/totara_program/1612212198/defaultimage",
    __typename: "mobile_currentlearning_item"
  })
};

module.exports = {
  date,
  defaultString,
  defaultCoreId,
  defaultCoreDate,
  defaultFloat,
  defaultLI
};
