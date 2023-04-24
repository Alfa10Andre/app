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

import { config } from "@totara/lib";

const linkingHandler = (encodedUrl: string | null, onLoginSuccess, onLoginFailure) => {
  if (encodedUrl) {
    const url = decodeURIComponent(encodedUrl);
    const requestUrl = url.split("?")[0];
    const requestRegister: string[] = [
      `${config.appLinkDomain}/register`,
      `${config.appLinkDomain}/register/`,
      `${config.deepLinkSchema}/register`,
      `${config.deepLinkSchema}/register/`
    ];

    if (requestRegister.includes(requestUrl)) {
      try {
        const resultRegistration = getDeviceRegisterData(url);
        onLoginSuccess({
          secret: resultRegistration.secret,
          uri: resultRegistration.uri
        });
      } catch (error) {
        onLoginFailure(error);
      }
    }
  }
};

const getDeviceRegisterData = (url: string) => {
  const keySecret: string = "setupsecret";
  const keySite: string = "site";

  const secret = getValueForUrlQueryParameter(url, keySecret);
  const site = getValueForUrlQueryParameter(url, keySite);
  if (site != null && secret != null && site != "" && secret != "") {
    return { secret: secret, uri: site };
  } else {
    var errorInfo = "Invalid request.";
    if ((site == "" || site == null) && (secret == null || secret == "")) {
      errorInfo = "Invalid request, 'site' and 'token' cannot be null or empty.";
    } else if (site == "" || site == null) {
      errorInfo = "Invalid request, 'site' cannot be null or empty.";
    } else if (secret == null || secret == "") {
      errorInfo = "Invalid request, 'token' cannot be null or empty.";
    }
    throw new Error(errorInfo);
  }
};

const getValueForUrlQueryParameter = (url: string, key: string) => {
  key = key.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
  var results = regex.exec(url);
  return results === null ? null : results[1].replace(/\+/g, " ");
};

const authLinkingHandler = ({
  onLoginSuccess,
  onLoginFailure,
  onLinkingHandler = linkingHandler
}: {
  onLoginSuccess: Function;
  onLoginFailure: Function;
  onLinkingHandler?: Function;
}) => (event: { url: string }) => {
  onLinkingHandler(event.url, onLoginSuccess, onLoginFailure);
};

const formatUrl = (urlText: string) => {
  const pattern = new RegExp("^(https?:\\/\\/)", "i"); // fragment locator
  if (!pattern.test(urlText)) {
    return config.urlProtocol + "://" + urlText;
  }
  return urlText;
};

export { linkingHandler, authLinkingHandler, getValueForUrlQueryParameter, getDeviceRegisterData, formatUrl };
