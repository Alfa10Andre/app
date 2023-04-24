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

import { resizeByScreenSize } from "./PlatformUtility";
import { applyTheme } from "./Theme";
import { ThemeContext, ThemeProvider } from "./ThemeContext";

const gutter = resizeByScreenSize(8, 16, 16, 24);
const baseSpace = 8;

export { resizeByScreenSize, gutter, applyTheme, ThemeContext, ThemeProvider, baseSpace };
