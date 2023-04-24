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

import React, { ReactNode } from "react";

import { AppliedTheme, TotaraTheme, applyTheme } from "./Theme";
import { useSession } from "@totara/core";

type Props = {
  children: ReactNode;
};

const ThemeContext = React.createContext<AppliedTheme>(TotaraTheme);

const ThemeProvider = ({ children }: Props) => {
  const { siteInfo } = useSession();

  const customerTheme = siteInfo && siteInfo.theme ? applyTheme(siteInfo.theme) : TotaraTheme;

  return <ThemeContext.Provider value={customerTheme}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
