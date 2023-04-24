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

import { Resource } from "@totara/types";
import { ResourceState } from "@totara/types/Resource";
import { ADD_RESOURCE, UPDATE_RESOURCE, DELETE_RESOURCE } from "../actions/constants";

const initialState = {
  resources: [] as Resource[]
};

const resourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESOURCE: {
      const resourcePayload = action.payload as Resource; //payload: { id: 123, url: etc}
      resourcePayload.state = ResourceState.Added;

      //PREVENT ADDING SAME RESOURCE TWICE
      const resourcesList: Resource[] = state.resources;
      if (resourcesList.find((r) => r.id === resourcePayload.id)) {
        return state;
      }

      return {
        ...state,
        resources: [...state.resources, resourcePayload]
      };
    }
    case UPDATE_RESOURCE: {
      const payload = action.payload; //payload: { id: 123, url: etc}

      const resourcesList: Resource[] = state.resources;
      const idx = resourcesList.findIndex((x) => x.id === payload.id);

      if (idx < 0) return state;

      const existingResource = resourcesList[idx];
      if (payload.state) {
        existingResource.state = payload.state;
      }
      if (payload.sizeInBytes) {
        existingResource.sizeInBytes = payload.sizeInBytes;
      }
      if (payload.bytesDownloaded) {
        existingResource.bytesDownloaded = payload.bytesDownloaded;
      }
      if (payload.unzipPath) {
        existingResource.unzipPath = payload.unzipPath;
      }

      resourcesList[idx] = existingResource;

      return {
        ...state,
        resources: [...resourcesList]
      };
    }
    case DELETE_RESOURCE: {
      const { ids } = action.payload;
      const resourcesList: Resource[] = state.resources;
      const filtered = resourcesList.filter((item) => ids.indexOf(item.id) === -1);

      return {
        ...state,
        resources: [...filtered]
      };
    }
    case "CLEAR": {
      //TODO: remove it, just for testing
      return {
        ...state,
        resources: []
      };
    }
    default: {
      return state;
    }
  }
};

// Exports
export default resourceReducer;
