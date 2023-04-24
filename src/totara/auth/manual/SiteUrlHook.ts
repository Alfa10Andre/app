/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2019 onwards Totara Learning Solutions LTD
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

import { useEffect, useReducer } from "react";

import { config } from "@totara/lib";
import { translate } from "@totara/locale";
import { isValidUrlText } from "@totara/lib/tools";
import { fetchData } from "@totara/core/AuthRoutines";
import { SiteInfo } from "@totara/types/SiteInfo";
import { getVersion } from "react-native-device-info";
import { formatUrl } from "../authUtils";

export type useSiteUrlProps = {
  siteUrl?: string;
  onSiteInfoDone: any;
};

export const useSiteUrl = ({ siteUrl, onSiteInfoDone }: useSiteUrlProps) => {
  const [siteUrlState, dispatch] = useReducer(siteUrlReducer, {
    inputSiteUrlStatus: undefined,
    inputSiteUrlMessage: undefined,
    inputSiteUrl: siteUrl
  });

  useEffect(() => {
    if (siteUrlState.inputSiteUrlStatus === "fetching") {
      // eslint-disable-next-line no-undef
      const fetchDataWithFetch = fetchData(fetch);
      const onSubmitCall = fetchDataWithFetch<SiteInfo>(config.infoUri(siteUrlState.inputSiteUrl!), {
        method: "POST",
        body: JSON.stringify({ version: getVersion() })
      });

      onSubmitCall
        .then((result) => {
          const { version } = result;
          if (version < config.minApiVersion) {
            dispatch({ type: "minAPIVersionMismatch" });
            return;
          }

          dispatch({ type: "done" });
          onSiteInfoDone(result);
        })
        .catch((error) => {
          const errorType = error.status === 404 ? "invalidAPI" : "networkError";
          dispatch({ type: errorType, payload: error.message });
        });
    }
  }, [siteUrlState.inputSiteUrlStatus]);

  const onSubmit = (siteUrl: string) => {
    dispatch({ type: "submit", payload: siteUrl });
  };

  const onChangeInputSiteUrl = (siteUrl: string) => {
    dispatch({ type: "change", payload: siteUrl });
  };

  const reset = () => {
    dispatch({ type: "done", payload: siteUrl });
  };

  return {
    siteUrlState,
    onChangeInputSiteUrl,
    onSubmit,
    reset
  };
};

const siteUrlReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "submit": {
      if (action.payload && isValidUrlText(action.payload)) {
        return {
          ...state,
          inputSiteUrl: formatUrl(action.payload || ""),
          inputSiteUrlStatus: "fetching"
        };
      } else {
        return {
          ...state,
          inputSiteUrlStatus: "invalidUrl",
          inputSiteUrlMessage: translate("site_url.validation.enter_valid_url")
        };
      }
    }
    case "done": {
      return {
        ...state,
        inputSiteUrlStatus: "done"
      };
    }
    case "change": {
      return {
        ...state,
        inputSiteUrl: action.payload
      };
    }
    case "networkError":
    case "invalidAPI":
    case "minAPIVersionMismatch": {
      return {
        ...state,
        inputSiteUrlStatus: action.type,
        inputSiteUrlMessage: action.payload
      };
    }
    default:
      return {
        ...state
      };
  }
};

type State = {
  inputSiteUrlStatus?: "done" | "fetching" | "invalidUrl" | "invalidAPI" | "minAPIVersionMismatch" | "networkError";
  inputSiteUrlMessage?: string;
  inputSiteUrl?: string;
};

type Action = {
  type: "invalidUrl" | "invalidAPI" | "minAPIVersionMismatch" | "networkError" | "done" | "submit" | "change";
  payload?: any;
};
