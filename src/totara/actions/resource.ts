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
 */

import { store } from "../store";
import { ADD_RESOURCE, DELETE_RESOURCE, UPDATE_RESOURCE } from "./constants";

const addResource = (payload) => {
  store.dispatch({
    type: ADD_RESOURCE,
    payload: payload
  });
};

const updateResource = (payload) => {
  store.dispatch({
    type: UPDATE_RESOURCE,
    payload: payload
  });
};

const deleteResource = (ids: string[]) => {
  store.dispatch({
    type: DELETE_RESOURCE,
    payload: {
      ids: ids
    }
  });
};

export { addResource, updateResource, deleteResource };
