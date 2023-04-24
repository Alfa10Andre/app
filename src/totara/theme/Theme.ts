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

import { Theme } from "@totara/types";
import { TextStyle, ViewStyle } from "react-native";

const colorFont = "#000000";
const colorPrimary = "#003D6F";
const colorAccent = "#FFFFFF";
const textColorDark = "#3D444B"; //BEING USED FOR HEADERS, AND OTHERS NON-BLACK THINGS

const TotaraTheme: AppliedTheme = {
  viewContainer: { backgroundColor: colorAccent, flex: 1 },

  //---- Text styles: customizable by [Developer] ------
  textH1: {
    fontSize: 40,
    lineHeight: 48,
    color: colorFont,
    fontWeight: "400"
  },
  textH2: {
    fontSize: 32,
    lineHeight: 41,
    color: colorFont,
    fontWeight: "700"
  },
  textH3: {
    fontSize: 28,
    lineHeight: 34,
    color: colorFont,
    fontWeight: "400"
  },

  textHeadline: {
    fontSize: 22,
    lineHeight: 28,
    color: colorFont,
    fontWeight: "400"
  },

  textMedium: {
    fontSize: 20,
    lineHeight: 25,
    color: colorFont,
    fontWeight: "400"
  },

  textRegular: {
    fontSize: 17,
    lineHeight: 22,
    color: colorFont,
    fontWeight: "400"
  },

  textSmall: {
    fontSize: 15,
    lineHeight: 20,
    color: colorFont,
    fontWeight: "400"
  },

  textXSmall: {
    fontSize: 13,
    lineHeight: 18,
    color: colorFont,
    fontWeight: "400",
  
  },

  textXXSmall: {
    fontSize: 11,
    lineHeight: 13,
    color: colorFont,
    fontWeight: "400"
  },

  //NEEDS REVIEW
  //---- Theme color: customizable by [User, Developer] ------
  colorPrimary: colorPrimary,
  colorText: "#FFFFFF", //TODO: THEME REVIEW: THIS COLOUR IS BEING USED FOR BUTTONS
  //----corText: "#d4e309",----
  //---- Theme color: customizable by [Developer] ------
  colorAccent: colorAccent,
  colorSecondary1: "#F5F5F5",
  colorSecondary2: "#FFFFFF",
  colorSecondary3: "#F5F5F5",
  colorSecondary4: "#FFFFFF",

  //---- Notification color: customizable by [Developer] ------
  colorInfo: "#337AB7",
  colorSuccess: "#69bd45",
  colorWarning: "#8E660D",
  colorAlert: "#953539",
  colorHighlight: "#FDF8E4",
  colorLink: "#007AFF",
  colorDestructive: "#FF3B30",

  //---- Neutral color: customizable by [Developer] ------
  colorNeutral1: "#FFFFFF",
  colorNeutral2: "#F5F5F5",
  colorNeutral3: "#E6E6E6",
  colorNeutral4: "#D2D2D2",
  colorNeutral5: "#C7C7C7",
  colorNeutral6: "#7D7D7D",
  colorNeutral7: "#4A4A4A",
  colorNeutral8: "#000000",

  colorOpacity30: "rgba(0, 0, 0, 0.3)",
  colorOpacity70: "rgba(0, 0, 0, 0.7)",

  //---- Text color: customizable by [Developer] ------
  textColorDark: textColorDark,
  textColorSecondary: "#C5D39D",
  textColorLight: "#FFFFFF"
};

export type AppliedTheme = {
  viewContainer: ViewStyle;
  textH1: TextStyle;
  textH2: TextStyle;
  textH3: TextStyle;
  textHeadline: TextStyle;
  textMedium: TextStyle;
  textRegular: TextStyle;
  textSmall: TextStyle;
  textXSmall: TextStyle;
  textXXSmall: TextStyle;
} & Theme;

const applyTheme = (theme: Partial<Theme>) => {
  return { ...TotaraTheme, ...theme };
};

export { TotaraTheme, applyTheme };
