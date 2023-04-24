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

import { isCompatible, isValidApiVersion } from "../coreUtils";
import { config } from "@totara/lib";

describe("coreUtils", () => {
  it("should returns available features for current older and higher API version", async () => {
    config.minApiVersion = "2019101802";
    const validVersion = isCompatible("2019101802");
    expect(validVersion).toEqual([1]);

    const oldVersion = isCompatible("2010101802");
    expect(oldVersion).toEqual([]);

    const higherVersion = isCompatible("2030101802");
    expect(higherVersion).toEqual([1]);

    config.minApiVersion = "disabled";
    const disabledAppMinVersion = isCompatible("2030101802");
    expect(disabledAppMinVersion).toEqual([1]);
  });

  it("should returns true for `disabled` or valid `minApiVersion` ", () => {
    config.minApiVersion = "2019101802";

    const validVersion = isValidApiVersion("2019101802");
    expect(validVersion).toBeTruthy();

    const higherVersion = isValidApiVersion("2030101802");
    expect(higherVersion).toBeTruthy();

    config.minApiVersion = "disabled";
    const disabledAppMinVersion = isValidApiVersion("2030101802");
    expect(disabledAppMinVersion).toBeTruthy();
  });

  it("should returns false for undefined, null or invalid `minApiVersion` ", () => {
    config.minApiVersion = "2019101802";

    const oldVersion = isValidApiVersion("2010101802");
    expect(oldVersion).toBeFalsy();

    const undefinedVersion = isValidApiVersion(undefined);
    expect(undefinedVersion).toBeFalsy();

    const nullVersion = isValidApiVersion(null);
    expect(nullVersion).toBeFalsy();
  });
});
