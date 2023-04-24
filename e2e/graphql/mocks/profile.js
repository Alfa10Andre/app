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

const defaultProfileData = {
  id: "61",
  idnumber: "",
  username: "tharakad",
  firstname: "Tharaka",
  lastname: "Dushmantha",
  middlename: "",
  alternatename: "",
  email: "tharaka@totara.com",
  profileimageurl: "https://mobile.demo.totara.software/theme/image.php/ventura/core/1612903609/u/f1",
  city: "",
  country: null,
  timezone: "Europe/London",
  description: "",
  descriptionformat: "HTML",
  webpage: "",
  skypeid: "",
  institution: "",
  department: "",
  phone: "",
  mobile: "",
  address: "",
  __typename: "core_user"
};
const profile = {
  default: {
    core_user_own_profile: () => ({ ...defaultProfileData })
  }
};
module.exports = {
  profile
};
