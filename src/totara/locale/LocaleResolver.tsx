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

import React, { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { queryLanguageStrings } from "@totara/locale/api";
import { Loading } from "@totara/components";
import { addLocale, changeLocale, getTranslations } from "@totara/locale/index";
import { DEFAULT_LANGUAGE } from "@totara/lib/constants";
import { merge } from "lodash";
import { useSession } from "@totara/core";

const LocaleResolver = ({ children }: { children: any }) => {
  const [languageStringLoaded, setLanguageStringLoaded] = useState<boolean>();
  const client = useApolloClient();
  const { core } = useSession();
  const languagePreference = core?.user?.lang || "en";

  useEffect(() => {
    if (!languageStringLoaded) {
      client
        .query({
          query: queryLanguageStrings,
          variables: {
            lang: languagePreference
          }
        })
        .then((result) => {
          if (result.data) {
            // This custom strings comes from the totara instance API
            const customAppStrings = JSON.parse(result.data.json_string).app;
            // This one comes straight from AMOS, generated in build time
            const translations = getTranslations();

            const defaultLanguage = translations[DEFAULT_LANGUAGE] || {};
            const currentAppStrings = translations[languagePreference] || defaultLanguage;

            const merged = {};
            merge(merged, defaultLanguage, currentAppStrings, customAppStrings);

            addLocale(languagePreference!, merged);
            changeLocale(languagePreference!);
          }
        })
        .finally(() => {
          setLanguageStringLoaded(true);
        });
    }
  }, [languagePreference, languageStringLoaded]);

  const languageStringsLoaded = languagePreference && languageStringLoaded;

  return languageStringsLoaded ? children : <Loading />;
};

export default LocaleResolver;
