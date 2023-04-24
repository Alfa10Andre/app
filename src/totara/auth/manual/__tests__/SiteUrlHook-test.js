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

import { useSiteUrl } from "../SiteUrlHook";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-test-renderer";
import wait from "waait";
import { config } from "@totara/lib";

describe("SiteUrlHook", () => {
  it("should be an error if blank address", () => {
    const { result } = renderHook(
      ({ siteUrl, onSiteUrlSuccess }) => useSiteUrl({ siteUrl: siteUrl, onSiteUrlSuccess: onSiteUrlSuccess }),
      { initialProps: { siteUrl: undefined } }
    );

    act(() => {
      result.current.onSubmit("");
    });

    expect(result.current.siteUrlState).toMatchObject({
      inputSiteUrlStatus: "invalidUrl"
    });
  });

  it("should be an error for invalid address", () => {
    const invalidUrl = "dafl";
    const { result } = renderHook(
      ({ siteUrl, onSiteUrlSuccess }) => useSiteUrl({ siteUrl: siteUrl, onSiteUrlSuccess: onSiteUrlSuccess }),
      { initialProps: { siteUrl: invalidUrl } }
    );

    act(() => {
      result.current.onSubmit(invalidUrl);
    });

    expect(result.current.siteUrlState).toMatchObject({
      inputSiteUrlStatus: "invalidUrl"
    });
  });

  it("should use the initial address if it is present with a protocol", () => {
    const validUrl = "https://abc.com";
    const successMock = jest.fn((data) => {
      expect(data).toBe(validUrl);
    });
    const { result } = renderHook(
      ({ siteUrl, onSiteUrlSuccess }) => useSiteUrl({ siteUrl: siteUrl, onSiteUrlSuccess: onSiteUrlSuccess }),
      {
        initialProps: {
          siteUrl: validUrl,
          onSiteUrlSuccess: successMock
        }
      }
    );

    expect(result.current.siteUrlState).toMatchObject({
      inputSiteUrl: validUrl
    });
  });

  it("should use the initial address as it is without a protocol", () => {
    const validUrl = "https://abc.com";
    const successMock = jest.fn((data) => {
      expect(data).toBe(validUrl);
    });
    const { result } = renderHook(
      ({ siteUrl, onSiteUrlSuccess }) => useSiteUrl({ siteUrl: siteUrl, onSiteUrlSuccess: onSiteUrlSuccess }),
      { initialProps: { siteUrl: "abc.com", onSiteUrlSuccess: successMock } }
    );

    expect(result.current.siteUrlState).toMatchObject({
      inputSiteUrl: "abc.com"
    });
  });

  it("should change address while changing", () => {
    const { result } = renderHook(
      ({ siteUrl, onSiteUrlSuccess }) => useSiteUrl({ siteUrl: siteUrl, onSiteUrlSuccess: onSiteUrlSuccess }),
      { initialProps: { siteUrl: undefined } }
    );

    act(() => {
      result.current.onChangeInputSiteUrl("pqr.com");
    });

    expect(result.current.siteUrlState).toMatchObject({
      inputSiteUrl: "pqr.com"
    });
  });

  it("should set correct state when resetting", () => {
    const { result } = renderHook(({ siteUrl }) => useSiteUrl({ siteUrl: siteUrl }), {
      initialProps: { siteUrl: "abc.com" }
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.siteUrlState).toMatchObject({
      inputSiteUrlStatus: "done"
    });
  });

  it("should set correct state for the invalid version of the api", async () => {
    config.minApiVersion = "2019101802";
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => ({ data: { version: "2019101801" } }),
        status: 200
      })
    );

    const validUrl = "https://mobile.demo.totara.software";
    const { result, waitForNextUpdate } = renderHook(({ siteUrl }) => useSiteUrl({ siteUrl: siteUrl }), {
      initialProps: { siteUrl: validUrl }
    });

    act(() => {
      result.current.onSubmit(validUrl);
    });

    expect(result.current.siteUrlState).toMatchObject({ inputSiteUrlStatus: "fetching" });
    await act(async () => waitForNextUpdate());
    expect(result.current.siteUrlState).toMatchObject({ inputSiteUrlStatus: "minAPIVersionMismatch" });
  });

  it("should call success for the valid version of the api", async () => {
    config.minApiVersion = "2019101802";
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => ({ data: { version: "2019101810" } }),
        status: 200
      })
    );
    const validUrl = "https://mobile.demo.totara.software";
    const { result } = renderHook(({ siteUrl }) => useSiteUrl({ siteUrl: siteUrl }), {
      initialProps: { siteUrl: validUrl }
    });

    act(() => {
      result.current.onSubmit(validUrl);
    });
    expect(result.current.siteUrlState).toMatchObject({ inputSiteUrlStatus: "fetching" });
    await wait(() => expect(result.current.onSiteUrlSuccess).toBeCalled());
  });

  it("should set invalidAPI state for error with status 404", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        status: 404
      })
    );
    const validUrl = "https://mobile.demo.totara.software";
    const { result, waitForNextUpdate } = renderHook(({ siteUrl }) => useSiteUrl({ siteUrl: siteUrl }), {
      initialProps: { siteUrl: validUrl }
    });

    act(() => {
      result.current.onSubmit(validUrl);
    });
    expect(result.current.siteUrlState).toMatchObject({ inputSiteUrlStatus: "fetching" });
    await act(async () => waitForNextUpdate());
    expect(result.current.siteUrlState).toMatchObject({ inputSiteUrlStatus: "invalidAPI" });
  });

  it("should set networkError state for error", async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.reject({}));
    const validUrl = "https://mobile.demo.totara.software";
    const { result, waitForNextUpdate } = renderHook(({ siteUrl }) => useSiteUrl({ siteUrl: siteUrl }), {
      initialProps: { siteUrl: validUrl }
    });

    act(() => {
      result.current.onSubmit(validUrl);
    });

    await act(async () => waitForNextUpdate());
    expect(result.current.siteUrlState).toMatchObject({
      inputSiteUrlStatus: "networkError"
    });
  });
});
