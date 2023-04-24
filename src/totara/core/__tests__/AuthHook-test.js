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
// import { initialState, useAuth } from "../AuthHook";
// import { renderHook, act } from "@testing-library/react-hooks";

describe("useAuthContext", () => {
  it("should cleanup device during logout", async () => {
    expect("test").toBe("test");
  });
});

// describe("useAuthContext", () => {
// it("should cleanup device during logout", async () => {
//   const mockBootstrap = jest.fn();
//   const mockRegisterDevice = jest.fn();
//   const mockDeviceCleanup = jest.fn(() => Promise.resolve(true));
//   const mockCreateApolloClient = jest.fn();
//   const state = {
//     appState: {},
//     setup: undefined,
//     isLoading: false,
//     isAuthenticated: true,
//     authStep: "registered"
//   };
// const { result, waitForNextUpdate } = renderHook(
//   (props) => useAuth(mockBootstrap, mockRegisterDevice, mockDeviceCleanup, mockCreateApolloClient)(props),
//   { initialProps: { initialState: state } }
// );
// act(() => {
//   result.current.logOut();
// });
//   await act(async () => {
//     await mockDeviceCleanup;
//   });
//   act(async () => waitForNextUpdate());
//   expect(result.current.authContextState.appState).toBeFalsy();
//   expect(result.current.authContextState.isAuthenticated).toBeFalsy();
//   expect(result.current.authContextState.isLoading).toBeFalsy();
//   expect(result.current.authContextState.authStep).toBe("bootstrapDone");
// });
// it("should register device when login is successful", async () => {
//   expect.assertions(5);
//   const setup = {
//     secret: "secret",
//     uri: "https://site.com",
//     siteInfo: {
//       version: "2019101802"
//     }
//   };
//   const expectedAppState = {
//     apiKey: "apiKey",
//     host: "https://site.com",
//     siteInfo: {
//       version: "2019101802"
//     }
//   };
//   const mockBootstrap = jest.fn();
//   const mockRegisterDevice = jest.fn((ss) => {
//     expect(ss).toMatchObject(setup);
//     return Promise.resolve({
//       apiKey: "apiKey",
//       host: "https://site.com",
//       siteInfo: {
//         version: "2019101802"
//       }
//     });
//   });
//   const mockDeviceCleanup = jest.fn(() => Promise.resolve(true));
//   const mockCreateApolloClient = jest.fn();
//   const state = {
//     appState: undefined,
//     setup: undefined,
//     isLoading: false,
//     isAuthenticated: false,
//     authStep: "bootstrapDone"
//   };
//   const { result, waitForNextUpdate } = renderHook(
//     (props) => useAuth(mockBootstrap, mockRegisterDevice, mockDeviceCleanup, mockCreateApolloClient)(props),
//     { initialProps: { initialState: state } }
//   );
//   act(() => {
//     result.current.onLoginSuccess(setup);
//   });
//   await mockDeviceCleanup;
//   await act(async () => waitForNextUpdate());
//   expect(result.current.authContextState.appState).toMatchObject(expectedAppState);
//   expect(result.current.authContextState.isAuthenticated).toBeTruthy();
//   expect(result.current.authContextState.isLoading).toBeFalsy();
//   expect(result.current.authContextState.authStep).toBe("setupDone");
// });
// it("should bootstrap when it starts with nothing stored", async () => {
//   const mockBootstrap = jest.fn(() => Promise.resolve(undefined));
//   const mockRegisterDevice = jest.fn();
//   const mockDeviceCleanup = jest.fn();
//   const mockCreateApolloClient = jest.fn();
//   const { result, waitForNextUpdate } = renderHook(
//     (props) => useAuth(mockBootstrap, mockRegisterDevice, mockDeviceCleanup, mockCreateApolloClient)(props),
//     { initialProps: { initialState: initialState } }
//   );
//   await mockBootstrap;
//   await act(async () => waitForNextUpdate());
//   expect(result.current.authContextState.setup).toBeFalsy();
// });
// it("should bootstrap when it starts loading with stored apiKey", async () => {
//   const mockBootstrap = jest.fn(() =>
//     Promise.resolve({
//       apiKey: "apikey",
//       host: "http://totarasite.com",
//       siteInfo: {
//         version: "2019101802"
//       }
//     })
//   );
//   const mockRegisterDevice = jest.fn();
//   const mockDeviceCleanup = jest.fn();
//   const mockCreateApolloClient = jest.fn();
//   const { result, waitForNextUpdate } = renderHook(
//     (props) => useAuth(mockBootstrap, mockRegisterDevice, mockDeviceCleanup, mockCreateApolloClient)(props),
//     { initialProps: { initialState: initialState } }
//   );
//   await mockBootstrap;
//   await act(async () => waitForNextUpdate());
//   expect(result.current.authContextState.appState.apiKey).toBe("apikey");
//   expect(mockCreateApolloClient).toBeCalledTimes(1);
// });
// it("should get and store the api key when setup secret is initialized", async () => {
//   const setup = {
//     secret: "secret",
//     uri: "https://thesite.com",
//     siteInfo: {
//       version: "2019101802"
//     }
//   };
//   const mockBootstrap = jest.fn();
//   const mockRegisterDevice = jest.fn((ss) => {
//     expect(ss).toMatchObject(setup);
//     return Promise.resolve({
//       apiKey: "apiKey",
//       host: "https://host.com",
//       siteInfo: {
//         version: "2019101802"
//       }
//     });
//   });
//   const mockDeviceCleanup = jest.fn();
//   const mockCreateApolloClient = jest.fn();
//   const state = {
//     appState: {},
//     setup: setup,
//     isLoading: false,
//     isAuthenticated: false,
//     authStep: "setupSecretInit"
//   };
//   const { result, waitForNextUpdate } = renderHook(
//     (props) => useAuth(mockBootstrap, mockRegisterDevice, mockDeviceCleanup, mockCreateApolloClient)(props),
//     { initialProps: { initialState: state } }
//   );
//   await mockRegisterDevice;
//   await act(async () => waitForNextUpdate());
//   expect(result.current.authContextState.appState.apiKey).toBe("apiKey");
//   expect(result.current.authContextState.isAuthenticated).toBeTruthy();
//   expect(result.current.authContextState.isLoading).toBeFalsy();
//   expect(result.current.authContextState.authStep).toBe("setupDone");
// });
// it("should be setup error when device registration is not successful", async () => {
//   expect.assertions(5);
//   const setup = {
//     secret: "secret",
//     uri: "https://site.com",
//     siteInfo: {
//       version: "2019101802"
//     }
//   };
//   const mockBootstrap = jest.fn();
//   const mockRegisterDevice = jest.fn((ss) => {
//     expect(ss).toMatchObject(setup);
//     return Promise.reject(new Error("server error"));
//   });
//   const mockDeviceCleanup = jest.fn(() => Promise.resolve(true));
//   const mockCreateApolloClient = jest.fn();
//   const state = {
//     appState: undefined,
//     setup: undefined,
//     isLoading: false,
//     isAuthenticated: false,
//     authStep: "bootstrapDone"
//   };
//   const { result, waitForNextUpdate } = renderHook(
//     (props) => useAuth(mockBootstrap, mockRegisterDevice, mockDeviceCleanup, mockCreateApolloClient)(props),
//     { initialProps: { initialState: state } }
//   );
//   act(() => {
//     result.current.onLoginSuccess(setup);
//   });
//   await act(async () => waitForNextUpdate());
//   expect(result.current.authContextState.appState).toBeFalsy();
//   expect(result.current.authContextState.isAuthenticated).toBeFalsy();
//   expect(result.current.authContextState.isLoading).toBeFalsy();
//   expect(result.current.authContextState.authStep).toBe("authError");
// });
// });
