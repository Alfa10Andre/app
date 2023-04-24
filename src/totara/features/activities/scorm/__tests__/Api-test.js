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

import { fetchLastAttemptResult } from "../api";

describe("fetchLastAttemptResult", () => {
  const scormId = "15";
  const apiKey = "api_key";
  const host = "https://site.url";
  const mockSuccessData = {
    data: "mock_data"
  };
  it("Should get json object for response with status code 200", async () => {
    const mockSuccessResponse = Promise.resolve({
      json: () => mockSuccessData,
      status: 200
    });

    global.fetch = jest.fn().mockImplementation(() => mockSuccessResponse);
    try {
      const result = await fetchLastAttemptResult({ scormId, apiKey, host });
      expect(result).toMatchObject(mockSuccessData);
    } catch (e) {
      expect(e.message).not.toEqual("200");
    }
    expect(global.fetch).toHaveBeenCalledTimes(1);
    global.fetch.mockClear();
  });

  it("Should throw an error for response status which is not equal to 200", async () => {
    const mockResponseStatus = 500;
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => mockSuccessData,
        status: mockResponseStatus
      })
    );
    try {
      const result = await fetchLastAttemptResult({ scormId, apiKey, host });
      expect(result).toBeUndefined();
    } catch (e) {
      expect(e.message).toEqual(mockResponseStatus.toString());
    }
    expect(global.fetch).toHaveBeenCalledTimes(1);
    global.fetch.mockClear();
  });

  it("Should throw an error, if fetch thorows an error", async () => {
    const mockError = "unknown error";
    global.fetch = jest.fn().mockImplementation(() => Promise.reject(mockError));
    try {
      const result = await fetchLastAttemptResult({ scormId, apiKey, host });
      expect(result).toBeUndefined();
    } catch (e) {
      expect(e).toEqual(mockError);
    }
    expect(global.fetch).toHaveBeenCalledTimes(1);
    global.fetch.mockClear();
  });
});
