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

import { useReducer, useEffect } from "react";

import { config } from "@totara/lib";
import { DEVICE_REGISTRATION } from "@totara/lib/constants";
import { ManualFlowChildProps } from "../ManualFlowChildProps";
import { NetworkError } from "@totara/types/Error";

const initialState = {
  setupSecret: undefined,
  apiKey: undefined,
  inputUsername: config.userName || "",
  inputPassword: config.password || "",
  inputUsernameStatus: undefined,
  inputPasswordStatus: undefined,
  isRequestingLogin: false,
  errorStatusUnauthorized: false,
  unhandledLoginError: undefined
};

export const useNativeFlow = (fetchData: <T>(input: RequestInfo, init?: RequestInit) => Promise<T>) => ({
  siteUrl,

}: ManualFlowChildProps) => {
  const [nativeLoginState, dispatch] = useReducer(nativeReducer, initialState);

  const inputUsernameWithShowError = (username: string) => {
    dispatch({ type: "setusername", payload: username });
  };

  const inputPasswordWithShowError = (password: string) => {
    dispatch({ type: "setpassword", payload: password });
  };

  const onClickEnter = () => {
    dispatch({ type: "submit", payload: undefined });
  };

  const onFocusInput = () => {
    dispatch({ type: "resetform" });
  };


  //first step, get the login secret
  const loginSecretPromise = () => fetchData<LoginSetup>(config.nativeLoginSetupUri(siteUrl), {
    method: "GET",
    headers: { [DEVICE_REGISTRATION]: config.userAgent }
  });

  //second step, perform the login and obtain the setupsecret
  const loginPromise = (loginSecret) => fetchData<SetupSecret>(config.nativeLoginUri(siteUrl), {
    method: "POST",
    body: JSON.stringify({
      loginsecret: loginSecret,
      username: nativeLoginState.inputUsername,
      password: nativeLoginState.inputPassword
    }),
    headers: { [DEVICE_REGISTRATION]: config.userAgent, "Content-Type": "application/json" }
  });

  useEffect(() => {
    if (nativeLoginState.isRequestingLogin && !nativeLoginState.setupSecret) {
      loginSecretPromise().then(s => loginPromise(s.loginsecret))
        .then((setupSecret) => {
          dispatch({ type: "setupsecret", payload: setupSecret.setupsecret });

        })
        .catch((error) => {
          if (error.status === 401) {
            dispatch({ type: "loginfailed" });
          } else {
            dispatch({ type: "unhandledloginfail", payload: error });
          }
        });
    }
  }, [nativeLoginState.isRequestingLogin, nativeLoginState.setupSecret]);

  return {
    nativeLoginState,
    onClickEnter,
    inputUsernameWithShowError,
    inputPasswordWithShowError,
    onFocusInput
  };
};

/**
 * Reducer to manage Navigation reducer to proper states
 * @param state - input state
 * @param action - dispatched action to change state
 * @returns - output state
 */
export const nativeReducer = (state: NativeLoginState = initialState, action: Action): NativeLoginState => {
  switch (action.type) {
    case "setupsecret":
      return {
        ...state,
        setupSecret: action.payload as string
      };
    case "setusername":
      return {
        ...state,
        inputUsername: action.payload as string
      };
    case "setpassword":
      return {
        ...state,
        inputPassword: action.payload as string
      };
    case "loginfailed":
      return {
        ...state,
        isRequestingLogin: false,
        errorStatusUnauthorized: true
      };
    case "resetform":
      return {
        ...state,
        errorStatusUnauthorized: false,
        unhandledLoginError: undefined
      };
    case "unhandledloginfail":
      return {
        ...state,
        isRequestingLogin: false,
        unhandledLoginError: action.payload as NetworkError
      };
    case "submit":
      if (state.inputUsername && state.inputUsername != "" && state.inputPassword && state.inputPassword != "") {
        return {
          ...state,
          isRequestingLogin: true,
          inputUsernameStatus: undefined,
          inputPasswordStatus: undefined,
          errorStatusUnauthorized: false,
          unhandledLoginError: undefined
        };
      } else {
        if ((!state.inputUsername || state.inputUsername == "") && state.inputPassword && state.inputPassword != "") {
          return {
            ...state,
            inputUsernameStatus: "error",
            inputPasswordStatus: undefined,
            errorStatusUnauthorized: false
          };
        } else if (
          (!state.inputPassword || state.inputPassword == "") &&
          state.inputUsername &&
          state.inputUsername != ""
        ) {
          return {
            ...state,
            inputUsernameStatus: undefined,
            inputPasswordStatus: "error",
            errorStatusUnauthorized: false
          };
        } else {
          return {
            ...state,
            inputUsernameStatus: "error",
            inputPasswordStatus: "error",
            errorStatusUnauthorized: false
          };
        }
      }
  }
};

type NativeLoginState = {
  setupSecret?: string;
  apiKey?: string
  inputUsername: string;
  inputPassword: string;
  inputUsernameStatus?: "error" | undefined;
  inputPasswordStatus?: "error" | undefined;
  isRequestingLogin: boolean;
  errorStatusUnauthorized: boolean;
  unhandledLoginError?: NetworkError;
};

type Action = {
  type: "setupsecret" | "setusername" | "setpassword" | "submit" | "loginfailed" | "resetform" | "unhandledloginfail";
  payload?: string | boolean | NetworkError;
};

type LoginSetup = {
  loginsecret: string;
};

type SetupSecret = {
  setupsecret: string;
};
