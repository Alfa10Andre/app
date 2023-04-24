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

import { applyTheme } from "../Theme";

describe("Set default and custom theme", () => {
  it("All theme colors and dependant styles should be applied with new theme", () => {
    const newCustomizeTheme = {
      urlLogo: "http://urlLogo.png",
      colorText: "colorText",
      colorPrimary: "colorPrimary",
      colorAccent: "colorAccent",
      colorSecondary1: "colorSecondary1",
      colorSecondary2: "colorSecondary2",
      colorSecondary3: "colorSecondary3",
      colorSecondary4: "colorSecondary4",

      colorInfo: "colorInfo",
      colorSuccess: "colorSuccess",
      colorWarning: "colorWarning",
      colorAlert: "colorAlert",
      colorHighlight: "colorHighlight",

      colorNeutral1: "colorNeutral1",
      colorNeutral2: "colorNeutral2",
      colorNeutral3: "colorNeutral3",
      colorNeutral4: "colorNeutral4",
      colorNeutral5: "colorNeutral5",
      colorNeutral6: "colorNeutral6",
      colorNeutral7: "colorNeutral7",
      colorNeutral8: "colorNeutral8",

      textColorDark: "textColorDark",
      textColorSecondary: "textColorSecondary",
      textColorLight: "textColorLight",
    };

    const newTheme = applyTheme(newCustomizeTheme);

    expect(newTheme.colorPrimary).toBe("colorPrimary");
    expect(newTheme.colorText).toBe("colorText");
    
    expect(newTheme.colorAccent).toBe("colorAccent");
    expect(newTheme.colorSecondary1).toBe("colorSecondary1");
    expect(newTheme.colorSecondary2).toBe("colorSecondary2");
    expect(newTheme.colorSecondary3).toBe("colorSecondary3");
    expect(newTheme.colorSecondary4).toBe("colorSecondary4");

    expect(newTheme.colorInfo).toBe("colorInfo");
    expect(newTheme.colorSuccess).toBe("colorSuccess");
    expect(newTheme.colorWarning).toBe("colorWarning");
    expect(newTheme.colorAlert).toBe("colorAlert");
    expect(newTheme.colorHighlight).toBe("colorHighlight");

    expect(newTheme.colorNeutral1).toBe("colorNeutral1");
    expect(newTheme.colorNeutral2).toBe("colorNeutral2");
    expect(newTheme.colorNeutral3).toBe("colorNeutral3");
    expect(newTheme.colorNeutral4).toBe("colorNeutral4");
    expect(newTheme.colorNeutral5).toBe("colorNeutral5");

    expect(newTheme.textColorSecondary).toBe("textColorSecondary");
    expect(newTheme.textColorLight).toBe("textColorLight");

  });

  it("Advanced setting for tabbar theme without apply general theme", () => {
    const newCustomizeTheme = {
      colorPrimary: "colorPrimary",
      colorText: "colorText",
    };
    const newTheme = applyTheme(newCustomizeTheme);
    expect(newTheme.colorPrimary).toBe("colorPrimary");
    expect(newTheme.colorText).toBe("colorText");
  });
});
