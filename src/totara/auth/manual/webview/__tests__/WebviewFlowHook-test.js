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

import { useWebviewFlow } from "../WebviewFlowHook";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-test-renderer";

describe("WebviewLoginHook", () => {
  it("initial props for the unsecured url(http://)", () => {
    const { result } = renderHook((props) => useWebviewFlow(props), {
      initialProps: {
        siteUrl: "http://mobiledemo.wlg.totaralms.com"
      }
    });
    expect(result.current.loginUrl).toBe("http://mobiledemo.wlg.totaralms.com/login/index.php");
    expect(result.current.navEndPoint).toBe("mobiledemo.wlg.totaralms.com/login/index.php");
    expect(result.current.navProtocol).toBe("http");
    expect(result.current.canWebGoBackward).toBeFalsy();
    expect(result.current.canWebGoForward).toBeFalsy();
  });

  it("initial props for the secured url(https://)", () => {
    const { result } = renderHook((props) => useWebviewFlow(props), {
      initialProps: {
        siteUrl: "https://mobiledemo.wlg.totaralms.com"
      }
    });
    expect(result.current.loginUrl).toBe("https://mobiledemo.wlg.totaralms.com/login/index.php");
    expect(result.current.navEndPoint).toBe("mobiledemo.wlg.totaralms.com/login/index.php");
    expect(result.current.navProtocol).toBe("https");
    expect(result.current.canWebGoBackward).toBeFalsy();
    expect(result.current.canWebGoForward).toBeFalsy();
  });

  it("Enable go back when navigate to another page in webview", () => {
    const { result } = renderHook((props) => useWebviewFlow(props), {
      initialProps: {
        siteUrl: "https://mobiledemo.wlg.totaralms.com"
      }
    });

    const webviewMessageEvent = {
      canGoBack: true,
      canGoForward: false,
      url: "https://mobiledemo.wlg.totaralms.com/tapped/firstlink"
    };

    act(() => {
      result.current.onLogViewNavigate(webviewMessageEvent);
    });

    expect(result.current.canWebGoBackward).toBeTruthy();
    expect(result.current.canWebGoForward).toBeFalsy();
    expect(result.current.navEndPoint).toBe("mobiledemo.wlg.totaralms.com/tapped/firstlink");
  });

  it("Enable go forward when came back from first tapped link in webview", () => {
    const { result } = renderHook((props) => useWebviewFlow(props), {
      initialProps: {
        siteUrl: "https://mobiledemo.wlg.totaralms.com/tapped/firstlink"
      }
    });
    const webviewMessageEvent = {
      canGoBack: false,
      canGoForward: true,
      url: "https://mobiledemo.wlg.totaralms.com"
    };
    act(() => {
      result.current.onLogViewNavigate(webviewMessageEvent);
    });
    expect(result.current.canWebGoBackward).toBeFalsy();
    expect(result.current.canWebGoForward).toBeTruthy();
    expect(result.current.navEndPoint).toBe("mobiledemo.wlg.totaralms.com");
  });

  it("Enable go back and forward in webview", () => {
    const { result } = renderHook((props) => useWebviewFlow(props), {
      initialProps: {
        siteUrl: "https://mobiledemo.wlg.totaralms.com"
      }
    });
    const webviewMessageEvent = {
      canGoBack: true,
      canGoForward: true,
      url: "https://mobiledemo.wlg.totaralms.com/mideofdeepedin"
    };
    act(() => {
      result.current.onLogViewNavigate(webviewMessageEvent);
    });
    expect(result.current.canWebGoBackward).toBeTruthy();
    expect(result.current.canWebGoForward).toBeTruthy();
    expect(result.current.navEndPoint).toBe("mobiledemo.wlg.totaralms.com/mideofdeepedin");
  });

  it("Handling the completion of successful login", () => {
    const { result } = renderHook((props) => useWebviewFlow(props), {
      initialProps: {
        siteUrl: "https://mobiledemo.wlg.totaralms.com"
      }
    });
    const webvieNativeEvent = {
      nativeEvent: {
        data: "setupsecret"
      }
    };
    act(() => {
      result.current.didReceiveOnMessage(webvieNativeEvent);
    });
    expect(result.current.setupSecret).toBe("setupsecret");
  });

  it("Handling the completion of login for invalid values", () => {
    const mockOnRecievedSetupSecret = jest.fn();
    const { result } = renderHook((props) => useWebviewFlow(props), {
      initialProps: {
        siteUrl: "https://mobiledemo.wlg.totaralms.com"
      }
    });
    const webvieNativeEventForNull = {
      nativeEvent: {
        data: "null"
      }
    };
    act(() => {
      result.current.didReceiveOnMessage(webvieNativeEventForNull);
    });
    expect(mockOnRecievedSetupSecret).not.toBeCalled();

    const webvieNativeEventForUndefined = {
      nativeEvent: {
        data: undefined
      }
    };
    act(() => {
      result.current.didReceiveOnMessage(webvieNativeEventForUndefined);
    });
    expect(mockOnRecievedSetupSecret).not.toBeCalled();
  });
});
