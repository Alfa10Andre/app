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

import {
  getValueForUrlQueryParameter,
  getDeviceRegisterData,
  linkingHandler,
  authLinkingHandler,
  formatUrl
} from "../authUtils";
import { config } from "@totara/lib";

describe("Passing different forms of 'url' and get the value for query string parameters('site' and 'setupsecret')", () => {
  it("valid Url, IP-Address and DeepLink with 'site' and 'setupsecret'", () => {
    const urlHttps =
      "https://mobile.totaralearning.com/register?site=https://mobile.totaralearning.com&setupsecret=cavnakd2143df80800";
    const actualResultSiteHttps = getValueForUrlQueryParameter(urlHttps, "site");
    expect(actualResultSiteHttps).toBe("https://mobile.totaralearning.com");
    const actualResultSetupsecretHttps = getValueForUrlQueryParameter(urlHttps, "setupsecret");
    expect(actualResultSetupsecretHttps).toBe("cavnakd2143df80800");

    const urlHttp =
      "http://mobile.totaralearning.com/register?site=https://mobile.totaralearning.com&setupsecret=cavnakd2143df80800";
    const actualResultSiteHttp = getValueForUrlQueryParameter(urlHttp, "site");
    expect(actualResultSiteHttp).toBe("https://mobile.totaralearning.com");
    const actualResultSetupsecretHttp = getValueForUrlQueryParameter(urlHttp, "setupsecret");
    expect(actualResultSetupsecretHttp).toBe("cavnakd2143df80800");

    const deppLink = "totara://register?site=https://mobile.totaralearning.com&setupsecret=cavnakd2143df80800";
    const actualResultSiteDeepLink = getValueForUrlQueryParameter(deppLink, "site");
    expect(actualResultSiteDeepLink).toBe("https://mobile.totaralearning.com");
    const actualResultSetupsecretDeepLink = getValueForUrlQueryParameter(deppLink, "setupsecret");
    expect(actualResultSetupsecretDeepLink).toBe("cavnakd2143df80800");

    const ipAddress = "http://10.0.8.153/register?site=http://mobile.totaralearning.com&setupsecret=cavnakd2143df80800";
    const actualResultSiteIpAddress = getValueForUrlQueryParameter(ipAddress, "site");
    expect(actualResultSiteIpAddress).toBe("http://mobile.totaralearning.com");
    const actualResultSetupsecretIpAddress = getValueForUrlQueryParameter(ipAddress, "setupsecret");
    expect(actualResultSetupsecretIpAddress).toBe("cavnakd2143df80800");
  });
  it("valid Url, IP-Address and DeepLink ink with only 'site'", () => {
    const urlHttps = "https://mobile.totaralearning.com/register?site=https://mobile.totaralearning.com";
    const actualResultSiteHttps = getValueForUrlQueryParameter(urlHttps, "site");
    expect(actualResultSiteHttps).toBe("https://mobile.totaralearning.com");
    const actualResultSetupsecretHttps = getValueForUrlQueryParameter(urlHttps, "setupsecret");
    expect(actualResultSetupsecretHttps).toBeNull();

    const urlHttp = "http://mobile.totaralearning.com/register?site=https://mobile.totaralearning.com";
    const actualResultSiteHttp = getValueForUrlQueryParameter(urlHttp, "site");
    expect(actualResultSiteHttp).toBe("https://mobile.totaralearning.com");
    const actualResultSetupsecretHttp = getValueForUrlQueryParameter(urlHttp, "setupsecret");
    expect(actualResultSetupsecretHttp).toBeNull();

    const deppLink = "totara://register?site=https://mobile.totaralearning.com";
    const actualResultSiteDeepLink = getValueForUrlQueryParameter(deppLink, "site");
    expect(actualResultSiteDeepLink).toBe("https://mobile.totaralearning.com");
    const actualResultSetupsecretDeepLink = getValueForUrlQueryParameter(deppLink, "setupsecret");
    expect(actualResultSetupsecretDeepLink).toBeNull();

    const ipAddress = "http://10.0.8.153/register?site=http://mobile.totaralearning.com";
    const actualResultSiteIpAddress = getValueForUrlQueryParameter(ipAddress, "site");
    expect(actualResultSiteIpAddress).toBe("http://mobile.totaralearning.com");
    const actualResultSetupsecretIpAddress = getValueForUrlQueryParameter(ipAddress, "setupsecret");
    expect(actualResultSetupsecretIpAddress).toBeNull();
  });
  it("valid Url, IP-Address and DeepLink with only 'setupsecret'", () => {
    const urlHttps = "https://mobile.totaralearning.com/register?setupsecret=cavnakd2143df80800";
    const actualResultSiteHttps = getValueForUrlQueryParameter(urlHttps, "site");
    expect(actualResultSiteHttps).toBe(null);
    const actualResultSetupsecretHttps = getValueForUrlQueryParameter(urlHttps, "setupsecret");
    expect(actualResultSetupsecretHttps).toBe("cavnakd2143df80800");

    const urlHttp = "http://mobile.totaralearning.com/register?setupsecret=cavnakd2143df80800";
    const actualResultSiteHttp = getValueForUrlQueryParameter(urlHttp, "site");
    expect(actualResultSiteHttp).toBe(null);
    const actualResultSetupsecretHttp = getValueForUrlQueryParameter(urlHttp, "setupsecret");
    expect(actualResultSetupsecretHttp).toBe("cavnakd2143df80800");

    const deppLink = "totara://register?setupsecret=cavnakd2143df80800";
    const actualResultSiteDeepLink = getValueForUrlQueryParameter(deppLink, "site");
    expect(actualResultSiteDeepLink).toBe(null);
    const actualResultSetupsecretDeepLink = getValueForUrlQueryParameter(deppLink, "setupsecret");
    expect(actualResultSetupsecretDeepLink).toBe("cavnakd2143df80800");

    const ipAddress = "http://10.0.8.153/register?setupsecret=cavnakd2143df80800";
    const actualResultSiteIpAddress = getValueForUrlQueryParameter(ipAddress, "site");
    expect(actualResultSiteIpAddress).toBeNull();
    const actualResultSetupsecretIpAddress = getValueForUrlQueryParameter(ipAddress, "setupsecret");
    expect(actualResultSetupsecretIpAddress).toBe("cavnakd2143df80800");
  });
  it("valid Url, IP-Address and DeepLink without any query parameter", () => {
    const urlHttps = "https://mobile.totaralearning.com/register";
    const actualResultSiteHttps = getValueForUrlQueryParameter(urlHttps, "site");
    expect(actualResultSiteHttps).toBe(null);
    const actualResultSetupsecretHttps = getValueForUrlQueryParameter(urlHttps, "setupsecret");
    expect(actualResultSetupsecretHttps).toBe(null);

    const urlHttp = "http://mobile.totaralearning.com/register";
    const actualResultSiteHttp = getValueForUrlQueryParameter(urlHttp, "site");
    expect(actualResultSiteHttp).toBe(null);
    const actualResultSetupsecretHttp = getValueForUrlQueryParameter(urlHttp, "setupsecret");
    expect(actualResultSetupsecretHttp).toBe(null);

    const deppLink = "totara://register";
    const actualResultSiteDeepLink = getValueForUrlQueryParameter(deppLink, "site");
    expect(actualResultSiteDeepLink).toBe(null);
    const actualResultSetupsecretDeepLink = getValueForUrlQueryParameter(deppLink, "setupsecret");
    expect(actualResultSetupsecretDeepLink).toBe(null);

    const ipAddress = "http://10.0.8.153/register";
    const actualResultSiteIpAddress = getValueForUrlQueryParameter(ipAddress, "site");
    expect(actualResultSiteIpAddress).toBeNull();
    const actualResultSetupsecretIpAddress = getValueForUrlQueryParameter(ipAddress, "setupsecret");
    expect(actualResultSetupsecretIpAddress).toBeNull();
  });
});

describe("Action for Auth Universal/AppLink and Deeplink event according to different data", () => {
  it("AppLink and DeepLink with all valid data", () => {
    const url =
      "https://mobile.totaralearning.com/register?site=https://mobile.totaralearning.com&setupsecret=cavnakd2143df80800";
    const expectData = {
      secret: "cavnakd2143df80800",
      uri: "https://mobile.totaralearning.com"
    };
    try {
      const result = getDeviceRegisterData(url);
      expect(result).not.toThrowError();
      expect(result).toMatchObject(expectData);
    } catch (e) {
      expect(e).not.toMatchObject(expectData);
    }

    const urlDeepLink = "totara://register?site=https://mobile.totaralearning.com&setupsecret=cavnakd2143df80800";
    const expectDataDeepLink = {
      secret: "cavnakd2143df80800",
      uri: "https://mobile.totaralearning.com"
    };
    try {
      const resultDeepLink = getDeviceRegisterData(urlDeepLink);
      expect(resultDeepLink).not.toThrowError();
      expect(resultDeepLink).toMatchObject(expectDataDeepLink);
    } catch (e) {
      expect(e).not.toMatchObject(expectDataDeepLink);
    }
  });
  it("AppLink and DeepLink with only 'uri' data", () => {
    const url = "https://mobile.totaralearning.com/register?site=https://mobile.totaralearning.com";
    const expectData = new Error("Invalid request, 'token' cannot be null or empty.");
    try {
      const result = getDeviceRegisterData(url);
      expect(result).toThrowError();
    } catch (e) {
      expect(e).toMatchObject(expectData);
    }

    const urlDeepLink = "totara://register?site=https://mobile.totaralearning.com";
    const expectDataDeepLink = new Error("Invalid request, 'token' cannot be null or empty.");
    try {
      const resultDeepLink = getDeviceRegisterData(urlDeepLink);
      expect(resultDeepLink).toThrowError();
    } catch (e) {
      expect(e).toMatchObject(expectDataDeepLink);
    }
  });
  it("AppLink and DeepLink with only 'secret' data", () => {
    const url = "https://mobile.totaralearning.com/register?setupsecret=cavnakd2143df80800";
    const expectData = new Error("Invalid request, 'site' cannot be null or empty.");
    try {
      const result = getDeviceRegisterData(url);
      expect(result).toThrowError();
    } catch (e) {
      expect(e).toMatchObject(expectData);
    }

    const urlDeepLink = "totara://register?setupsecret=cavnakd2143df80800";
    const expectDataDeepLink = new Error("Invalid request, 'site' cannot be null or empty.");
    try {
      const resultDeepLink = getDeviceRegisterData(urlDeepLink);
      expect(resultDeepLink).toThrowError();
    } catch (e) {
      expect(e).toMatchObject(expectDataDeepLink);
    }
  });
  it("AppLink and DeepLink without any data", () => {
    const url = "https://mobile.totaralearning.com/register/";
    const expectData = new Error("Invalid request, 'site' and 'token' cannot be null or empty.");
    try {
      const result = getDeviceRegisterData(url);
      expect(result).toThrowError();
    } catch (e) {
      expect(e).toMatchObject(expectData);
    }

    const urlDeepLink = "totara://register";
    const expectDataDeepLink = new Error("Invalid request, 'site' and 'token' cannot be null or empty.");
    try {
      const resultDeepLink = getDeviceRegisterData(urlDeepLink);
      expect(resultDeepLink).toThrowError();
    } catch (e) {
      expect(e).toMatchObject(expectDataDeepLink);
    }
  });
  it("AppLink and DeepLink with valid 'site' and emplty 'secret'", () => {
    const url = "https://mobile.totaralearning.com/register/?site=https://mobile.totaralearning.com&setupsecret=";
    const expectData = new Error("Invalid request, 'token' cannot be null or empty.");
    try {
      const result = getDeviceRegisterData(url);
      expect(result).toThrowError();
    } catch (e) {
      expect(e).toMatchObject(expectData);
    }

    const urlDeepLink = "totara://register?site=https://mobile.totaralearning.com&setupsecret=";
    const expectDataDeepLink = new Error("Invalid request, 'token' cannot be null or empty.");
    try {
      const resultDeepLink = getDeviceRegisterData(urlDeepLink);
      expect(resultDeepLink).toThrowError();
    } catch (e) {
      expect(e).toMatchObject(expectDataDeepLink);
    }
  });
  it("AppLink and DeepLink with empty 'site' and valid 'secret'", () => {
    const url = "https://mobile.totaralearning.com/register/?site=&setupsecret=cavnakd2143df80800";
    const expectData = new Error("Invalid request, 'site' cannot be null or empty.");
    try {
      const result = getDeviceRegisterData(url);
      expect(result).toThrowError();
    } catch (e) {
      expect(e).toMatchObject(expectData);
    }

    const urlDeepLink = "totara://register?site=&setupsecret=cavnakd2143df80800";
    const expectDataDeepLink = new Error("Invalid request, 'site' cannot be null or empty.");
    try {
      const resultDeepLink = getDeviceRegisterData(urlDeepLink);
      expect(resultDeepLink).toThrowError();
    } catch (e) {
      expect(e).toMatchObject(expectDataDeepLink);
    }
  });
  it("AppLink and DeepLink with empty 'site' and 'secret'", () => {
    const url = "https://mobile.totaralearning.com/register/?site=&setupsecret=";
    const expectData = new Error("Invalid request, 'site' and 'token' cannot be null or empty.");
    try {
      const result = getDeviceRegisterData(url);
      expect(result).toThrowError();
    } catch (e) {
      expect(e).toMatchObject(expectData);
    }

    const urlDeepLink = "totara://register?site=&setupsecret=";
    const expectDataDeepLink = new Error("Invalid request, 'site' and 'token' cannot be null or empty.");
    try {
      const resultDeepLink = getDeviceRegisterData(urlDeepLink);
      expect(resultDeepLink).toThrowError();
    } catch (e) {
      expect(e).toMatchObject(expectDataDeepLink);
    }
  });
});
describe("Passing different forms of 'url' to call valid callback", () => {
  it("valid full urls", () => {
    const onLoginSuccessMock = jest.fn();
    const onLoginFailureMock = jest.fn();

    linkingHandler(`${config.appLinkDomain}/register?site=xxx&setupsecret=xxx`, onLoginSuccessMock, onLoginFailureMock);
    expect(onLoginSuccessMock).toHaveBeenCalledTimes(1);
  });
  it("empty and invalid urls", () => {
    const onLoginSuccessMock = jest.fn();
    const onLoginFailureMock = jest.fn();

    linkingHandler(undefined, onLoginSuccessMock, onLoginFailureMock);
    expect(onLoginSuccessMock).not.toHaveBeenCalled();
    expect(onLoginFailureMock).not.toHaveBeenCalled();

    linkingHandler(null, onLoginSuccessMock, onLoginFailureMock);
    expect(onLoginSuccessMock).not.toHaveBeenCalled();
    expect(onLoginFailureMock).not.toHaveBeenCalled();

    linkingHandler("", onLoginSuccessMock, onLoginFailureMock);
    expect(onLoginSuccessMock).not.toHaveBeenCalled();
    expect(onLoginFailureMock).not.toHaveBeenCalled();

    linkingHandler("https://totaralearning.com", onLoginSuccessMock, onLoginFailureMock);
    expect(onLoginSuccessMock).not.toHaveBeenCalled();
    expect(onLoginFailureMock).not.toHaveBeenCalled();
  });

  it("valid urls with invalid query", () => {
    const onLoginSuccessMock = jest.fn();
    const onLoginFailureMock = jest.fn();

    linkingHandler(`${config.appLinkDomain}/register?setupsecret=xxx`, onLoginSuccessMock, onLoginFailureMock);
    expect(onLoginFailureMock).toHaveBeenCalledTimes(1);
    onLoginFailureMock.mockClear();
  });
});

describe("Link handler for authentication", () => {
  it("linkHandler should be triggered by the event", () => {
    const onLoginSuccessMock = jest.fn();
    const onLoginFailureMock = jest.fn();
    const onLinkingHandlerMock = jest.fn();

    authLinkingHandler({
      onLoginSuccess: onLoginSuccessMock,
      onLoginFailure: onLoginFailureMock,
      onLinkingHandler: onLinkingHandlerMock
    })({ url: `${config.deepLinkSchema}/register/?site=xxx&setupsecret=xxx` });
    expect(onLinkingHandlerMock).toHaveBeenCalled();
  });
});

describe("formatUrl", () => {
  it("should return passed valid url with prepending configured protocol", () => {
    expect(formatUrl("abc")).toBe(`${config.urlProtocol}://abc`);
    expect(formatUrl("http://abc")).toBe("http://abc");
    expect(formatUrl("https://abc")).toBe("https://abc");
  });
});
