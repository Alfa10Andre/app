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

import { endSession, initSession, setupHost, setCore } from "./../actions/session";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@totara/reducers";
import { Session } from "@totara/types";

const useSession = () => {
  const sessionSelector = useSelector((state: RootState) => state.sessionReducer);
  const [session, setSession] = useState<Session>(sessionSelector);
  const { apiKey, host, siteInfo, core } = session;

  useEffect(() => {
    setSession(sessionSelector);
  }, [sessionSelector]);

  return {
    apiKey,
    host,
    siteInfo,
    core,
    initSession,
    endSession,
    setupHost,
    setCore
  }
}


export default useSession;