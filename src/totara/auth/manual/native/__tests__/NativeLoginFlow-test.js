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

import { renderHook, act } from "@testing-library/react-hooks";
import { useNativeFlow, nativeReducer } from "../NativeFlowHook";
import { DEVICE_REGISTRATION } from "@totara/lib/constants";
import { config } from "@totara/lib";

const onManualFlowCancel = jest.fn();
const onSetupSecretSuccess = jest.fn();

describe("useNativeLogin", () => {
  const { result } = renderHook((props) => useNativeFlow()(props), {
    initialProps: {
      siteUrl: "http://mobiledemo.wlg.totaralms.com",
      onSetupSecretSuccess: { onSetupSecretSuccess },
      onManualFlowCancel: { onManualFlowCancel: onManualFlowCancel }
    }
  });
  it("both empty 'username' and 'password'", () => {
    act(() => {
      result.current.inputUsernameWithShowError(undefined);
      result.current.inputPasswordWithShowError(undefined);
      result.current.onClickEnter();
    });

    expect(result.current.nativeLoginState.inputUsernameStatus).toBe("error");
    expect(result.current.nativeLoginState.inputPasswordStatus).toBe("error");
  });

  it("valid 'username' and empty 'password'", () => {
    act(() => {
      result.current.inputUsernameWithShowError("username");
      result.current.inputPasswordWithShowError(undefined);
      result.current.onClickEnter();
    });

    expect(result.current.nativeLoginState.inputUsernameStatus).toBe(undefined);
    expect(result.current.nativeLoginState.inputPasswordStatus).toBe("error");
  });

  it("empty 'username' and valid 'password'", () => {
    act(() => {
      result.current.inputUsernameWithShowError(undefined);
      result.current.inputPasswordWithShowError("password");
      result.current.onClickEnter();
    });

    expect(result.current.nativeLoginState.inputUsernameStatus).toBe("error");
    expect(result.current.nativeLoginState.inputPasswordStatus).toBe(undefined);
  });

  // it("should get the setupsecret when it is a valid username and password", async () => {
  //   expect.assertions(6);

  //   const onSetupSecretSuccess = jest.fn((setupSecret) => {
  //     expect(setupSecret).toBe("setupSecret");
  //   });

  //   const mockFetchData = jest.fn((input, init) => {
  //     if (input === "https://site.com/totara/mobile/login_setup.php") {
  //       expect(init).toMatchObject({
  //         method: "GET",
  //         headers: { [DEVICE_REGISTRATION]: config.userAgent }
  //       });

  //       return Promise.resolve({
  //         loginsecret: "loginSecret"
  //       });
  //     } else if (input === "https://site.com/totara/mobile/login.php") {
  //       expect(init).toMatchObject({
  //         method: "POST",
  //         body: JSON.stringify({
  //           loginsecret: "loginSecret",
  //           username: "username",
  //           password: "password"
  //         }),
  //         headers: { [DEVICE_REGISTRATION]: config.userAgent }
  //       });

  //       return Promise.resolve({
  //         setupsecret: "setupSecret"
  //       });
  //     } else {
  //       throw new Error("should not execute, test failed", input);
  //     }
  //   });

  //   const { result, waitForNextUpdate } = renderHook((props) => useNativeFlow(mockFetchData)(props), {
  //     initialProps: {
  //       siteUrl: "https://site.com",
  //       onSetupSecretSuccess: onSetupSecretSuccess
  //     }
  //   });

  //   act(() => {
  //     result.current.inputUsernameWithShowError("username");
  //     result.current.inputPasswordWithShowError("password");
  //     result.current.onClickEnter();
  //   });

  //   await act(async () => waitForNextUpdate());

  //   expect(result.current.nativeLoginState).toMatchObject({
  //     setupSecret: "setupSecret",
  //     inputUsername: "username",
  //     inputPassword: "password",
  //     isRequestingLogin: true,
  //     errorStatusUnauthorized: false
  //   });

  //   expect(onSetupSecretSuccess).toBeCalledTimes(1);
  //   expect(onSetupSecretSuccess).toHaveBeenCalledWith("setupSecret");
  // });



  it("should set form error for response with handled error[error status: 401], when fetch setupSecret", async () => {
    expect.assertions(3);

    const mockFetchData = jest.fn((input, init) => {
      if (input === "https://site.com/totara/mobile/login_setup.php") {
        expect(init).toMatchObject({
          method: "GET",
          headers: { [DEVICE_REGISTRATION]: config.userAgent }
        });
        return Promise.resolve({
          loginsecret: "loginSecret"
        });
      } else if (input === "https://site.com/totara/mobile/login.php") {
        expect(init).toMatchObject({
          method: "POST",
          body: JSON.stringify({
            loginsecret: "loginSecret",
            username: "username",
            password: "password"
          }),
          headers: { [DEVICE_REGISTRATION]: config.userAgent }
        });
        return Promise.reject({ status: 401 });
      } else {
        throw new Error("should not execute, test failed", input);
      }
    });

    const { result, waitForNextUpdate } = renderHook((props) => useNativeFlow(mockFetchData)(props), {
      initialProps: {
        siteUrl: "https://site.com"
      }
    });

    act(() => {
      result.current.inputUsernameWithShowError("username");
      result.current.inputPasswordWithShowError("password");
      result.current.onClickEnter();
    });
    await act(async () => waitForNextUpdate());

    expect(result.current.nativeLoginState).toMatchObject({
      isRequestingLogin: false,
      errorStatusUnauthorized: true
    });
  });

  it("should set form error for response with handled error[error status: 401], when fetch loginSecret", async () => {
    expect.assertions(2);

    const mockFetchData = jest.fn((input, init) => {
      if (input === "https://site.com/totara/mobile/login_setup.php") {
        expect(init).toMatchObject({
          method: "GET",
          headers: { [DEVICE_REGISTRATION]: config.userAgent }
        });
        return Promise.reject({ status: 401 });
      } else {
        throw new Error("should not execute, test failed", input);
      }
    });

    const { result, waitForNextUpdate } = renderHook((props) => useNativeFlow(mockFetchData)(props), {
      initialProps: {
        siteUrl: "https://site.com"
      }
    });

    act(() => {
      result.current.inputUsernameWithShowError("username");
      result.current.inputPasswordWithShowError("password");
      result.current.onClickEnter();
    });
    await act(async () => waitForNextUpdate());

    expect(result.current.nativeLoginState).toMatchObject({
      isRequestingLogin: false,
      errorStatusUnauthorized: true
    });
  });

  // it("should throw an error for all the unhandled errors while fetching setupSecret for a valid username and password ", async () => {
  //   expect.assertions(5);
  //   const onSetupSecretFailure = jest.fn((error) => {
  //     expect(error.status).toBe(400);
  //   });

  //   const mockFetchData = jest.fn((input, init) => {
  //     if (input === "https://site.com/totara/mobile/login_setup.php") {
  //       expect(init).toMatchObject({
  //         method: "GET",
  //         headers: { [DEVICE_REGISTRATION]: config.userAgent }
  //       });
  //       return Promise.resolve({
  //         loginsecret: "loginSecret"
  //       });
  //     } else if (input === "https://site.com/totara/mobile/login.php") {
  //       expect(init).toMatchObject({
  //         method: "POST",
  //         body: JSON.stringify({
  //           loginsecret: "loginSecret",
  //           username: "username",
  //           password: "password"
  //         }),
  //         headers: { [DEVICE_REGISTRATION]: config.userAgent }
  //       });
  //       return Promise.reject(new Error({ status: 400 }));
  //     } else {
  //       throw new Error("should not execute, test failed", input);
  //     }
  //   });

  //   const { result, waitForNextUpdate } = renderHook((props) => useNativeFlow(mockFetchData)(props), {
  //     initialProps: {
  //       siteUrl: "https://site.com",
  //       onSetupSecretFailure: onSetupSecretFailure
  //     }
  //   });

  //   act(() => {
  //     result.current.inputUsernameWithShowError("username");
  //     result.current.inputPasswordWithShowError("password");
  //     result.current.onClickEnter();
  //   });
  //   await act(async () => waitForNextUpdate());

  //   expect(onSetupSecretFailure).toBeCalledTimes(1);
  //   expect(onSetupSecretFailure).toHaveBeenCalledWith(new Error({ status: 400 }));
  // });

  // it("should throw an error for all the unhandled errors while fetching loginSecret for a valid username and password ", async () => {
  //   expect.assertions(4);
  //   const onSetupSecretFailure = jest.fn((error) => {
  //     expect(error.status).toBe(400);
  //   });

  //   const mockFetchData = jest.fn((input, init) => {
  //     if (input === "https://site.com/totara/mobile/login_setup.php") {
  //       expect(init).toMatchObject({
  //         method: "GET",
  //         headers: { [DEVICE_REGISTRATION]: config.userAgent }
  //       });
  //       return Promise.reject(new Error({ status: 400 }));
  //     } else {
  //       throw new Error("should not execute, test failed", input);
  //     }
  //   });

  //   const { result, waitForNextUpdate } = renderHook((props) => useNativeFlow(mockFetchData)(props), {
  //     initialProps: {
  //       siteUrl: "https://site.com",
  //       onSetupSecretFailure: onSetupSecretFailure
  //     }
  //   });

  //   act(() => {
  //     result.current.inputUsernameWithShowError("username");
  //     result.current.inputPasswordWithShowError("password");
  //     result.current.onClickEnter();
  //   });
  //   await act(async () => waitForNextUpdate());

  //   expect(onSetupSecretFailure).toBeCalledTimes(1);
  //   expect(onSetupSecretFailure).toHaveBeenCalledWith(new Error({ status: 400 }));
  // });
});

describe("Native login reducer", () => {
  it("it should set setupSecret status to payload", () => {
    const action = {
      type: "setupsecret",
      payload: "test-setupSecret"
    };
    const newState = nativeReducer({}, action);
    expect(newState.setupSecret).toEqual("test-setupSecret");
  });

  it("it should set username status to payload", () => {
    const action = {
      type: "setusername",
      payload: "test-setusername"
    };
    const newState = nativeReducer({}, action);
    expect(newState.inputUsername).toEqual("test-setusername");
  });

  it("it should set password status to payload", () => {
    const action = {
      type: "setpassword",
      payload: "test-setpassword"
    };
    const newState = nativeReducer({}, action);
    expect(newState.inputPassword).toEqual("test-setpassword");
  });

  it("it should be error status unauthorized where there is login failure", () => {
    const state = {
      isRequestingLogin: true,
      errorStatusUnauthorized: false
    };
    const action = {
      type: "loginfailed",
      payload: undefined
    };
    const newState = nativeReducer(state, action);

    expect(newState.isRequestingLogin).toBeFalsy();
    expect(newState.errorStatusUnauthorized).toBeTruthy();
  });

  it("it should remove error status unauthorized where the form is reset", () => {
    const state = {
      errorStatusUnauthorized: true
    };
    const action = {
      type: "resetform",
      payload: undefined
    };
    const newState = nativeReducer(state, action);

    expect(newState.errorStatusUnauthorized).toBeFalsy();
  });

  it("should handle clickenter with-out username and password", () => {
    const state = {
      inputUsername: undefined,
      inputPassword: undefined
    };
    const action = {
      type: "submit",
      payload: undefined
    };
    const newState = nativeReducer(state, action);

    expect(newState.inputUsernameStatus).toEqual("error");
    expect(newState.inputPasswordStatus).toEqual("error");
  });
  it("should handle clickenter with invalid username and valid password", () => {
    const state = {
      inputUsername: undefined,
      inputPassword: "password"
    };
    const action = {
      type: "submit",
      payload: undefined
    };
    const newState = nativeReducer(state, action);
    expect(newState.inputUsernameStatus).toEqual("error");
    expect(newState.inputPasswordStatus).toEqual(undefined);
  });
  it("should handle clickenter with valid username and invalid password", () => {
    const state = {
      inputUsername: "username",
      inputPassword: undefined
    };
    const action = {
      type: "submit",
      payload: undefined
    };
    const newState = nativeReducer(state, action);
    expect(newState.inputUsernameStatus).toEqual(undefined);
    expect(newState.inputPasswordStatus).toEqual("error");
  });
});
