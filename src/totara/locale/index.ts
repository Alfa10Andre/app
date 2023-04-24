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

import i18n from "./i18n";
import { Scope, TranslateOptions } from "i18n-js";

const translate = (scope: Scope, options?: TranslateOptions) => i18n.t(scope, options);

const addLocale = (locale: string, json: any) => {
  i18n.translations[locale] = json;
};

const changeLocale = (locale: string) => {
  i18n.locale = locale;
};

const getLocale = () => {
  return i18n.locale;
};

const getTranslations = () => {
  return i18n.translations;
};

export { translate, addLocale, changeLocale, getLocale, getTranslations };
