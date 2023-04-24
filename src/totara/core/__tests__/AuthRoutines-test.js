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

import { registerDevice, bootstrap, fetchData } from "../AuthRoutines";

describe("AuthRoutines.registerDevice", () => {
  it("should get api key if setup secret is valid", async () => {
    expect.assertions(5);

    const setupSecret = {
      uri: "https://totarasite.com",
      secret: "secret_from_server"
    };

    const apiKey = "the_api_key";

    const mockFetch = jest.fn((url, options) => {
      expect(url).toBe("https://totarasite.com/totara/mobile/device_register.php");
      const expectedOptions = {
        method: "POST",
        body: JSON.stringify({ setupsecret: setupSecret.secret })
      };
      expect(options).toMatchObject(expectedOptions);

      return Promise.resolve({
        apikey: apiKey
      });
    });

    const mockAsyncStorage = {
      setItem: jest.fn((key, value) => {
        if (key === "apiKey") expect(value).toBe(apiKey);
        if (key === "host") expect(value).toBe(setupSecret.uri);
      })
    };

    const expectedSetup = {
      apiKey: apiKey,
      host: setupSecret.uri
    };

    const setup = await registerDevice(mockFetch, mockAsyncStorage)(setupSecret);

    expect(setup).toMatchObject(expectedSetup);
  });

  it("should be an error is setup secret is invalid", async () => {
    expect.assertions(3);

    const setupSecret = {
      uri: "https://totarasite.com",
      secret: "secret_from_server"
    };

    const mockFetch = jest.fn((url, options) => {
      expect(url).toBe("https://totarasite.com/totara/mobile/device_register.php");
      const expectedOptions = {
        method: "POST",
        body: JSON.stringify({ setupsecret: setupSecret.secret })
      };
      expect(options).toMatchObject(expectedOptions);

      return Promise.reject(new Error("400"));
    });

    const mockAsyncStorage = {
      setItem: () => {}
    };

    const result = registerDevice(mockFetch, mockAsyncStorage)(setupSecret);

    await expect(result).resolves.toEqual({});
  });
});

describe("AuthRoutines.bootstrap", () => {
  it("should return the apiKey and host if they exists", async () => {
    expect.assertions(1);
    const mockAsyncStorage = {
      getItem: jest.fn((key) => {
        switch (key) {
          case "apiKey":
            return Promise.resolve("the_api_key");
          case "host":
            return Promise.resolve("testhost");
          case "siteInfo":
            return Promise.resolve(JSON.stringify({ version: "testhost" }));
          default:
            return Promise.resolve(null);
        }
      })
    };

    const result = await bootstrap(mockAsyncStorage)();

    expect(result).toMatchObject({
      apiKey: "the_api_key",
      host: "testhost"
    });
  });

  it("should return no setup if apiKey and host is not stored", async () => {
    expect.assertions(1);

    const mockAsyncStorage = {
      getItem: jest.fn(() => Promise.resolve(null))
    };

    const result = await bootstrap(mockAsyncStorage)();

    expect(result).toBeFalsy();
  });
});

describe("fetchData", () => {
  it("should return data from json when fetch response with http 200", async () => {
    expect.assertions(3);

    const successResponse = jest.fn((input, init) => {
      expect(input).toBe("http://apisite.com");
      expect(init).toMatchObject({
        method: "GET"
      });

      return Promise.resolve({
        status: 200,
        json: () => ({
          data: {
            test: "data"
          }
        })
      });
    });

    const data = await fetchData(successResponse)("http://apisite.com", {
      method: "GET"
    });

    expect(data).toMatchObject({
      test: "data"
    });
  });

  it("should return an error if the response is not http 200", async () => {
    expect.assertions(1);
    const failedResponse = jest.fn(() => {
      return Promise.resolve({
        status: 500
      });
    });

    await fetchData(failedResponse)("http://apisite.com", {
      method: "GET"
    }).catch((error) => {
      expect(error.status).toBe(500);
    });
  });

  it("should return an error if the response is not json even with a http 200 response", async () => {
    expect.assertions(1);
    const failedResponse = jest.fn(() => {
      return Promise.resolve({
        status: 200,
        json: () => {
          throw new Error("error");
        } // can't mock json error but should be good enough
      });
    });

    await fetchData(failedResponse)("http://apisite.com", {
      method: "GET"
    }).catch((error) => {
      expect(error.message).toBe("error");
    });
  });

  it("should return an error if the response is not the expected json format", async () => {
    expect.assertions(1);
    const failedResponse = jest.fn(() => {
      return Promise.resolve({
        status: 200,
        json: () => ({
          wrongFormatJson: "can't process payload"
        })
      });
    });

    await fetchData(failedResponse)("http://apisite.com", {
      method: "GET"
    }).catch((error) => {
      expect(error).toBe("json expected to have data attribute");
    });
  });
});
