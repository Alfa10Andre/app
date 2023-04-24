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

import { StyleSheet } from "react-native";
import { TotaraTheme } from "@totara/theme/Theme";
import { margins, borderRadius, fontWeights, iconSizes, paddings } from "@totara/theme/constants";
import { deviceScreen } from "@totara/lib/tools";
const { marginXS, marginM, marginS } = margins;

const wekaStyle = StyleSheet.create({
  container: {
    marginBottom: marginXS,
    marginEnd: marginXS
  },
  docWrap: {
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  emoji: {
    textAlign: "left",
    ...TotaraTheme.textRegular,
    marginVertical: marginM
  },
  textContainerWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: marginS
  },
  linkMediaTitle: {
    ...TotaraTheme.textRegular,
    fontWeight: fontWeights.fontWeightBold,
    marginTop: margins.marginXL,
    marginBottom: margins.marginM,
    color: TotaraTheme.colorFont
  },
  linkMediaContainer: {
    maxWidth: deviceScreen.width,
    borderRadius: borderRadius.borderRadiusM,
    backgroundColor: TotaraTheme.colorNeutral5,
    aspectRatio: 16 / 9,
    overflow: "hidden" //Fixed: MOB-920, https://stackoverflow.com/questions/54131875/screen-blinks-once-when-rendering-a-webview-on-android/54719378#54719378
  },
  linkMediaDescription: {
    ...TotaraTheme.textRegular,
    marginTop: marginM,
    color: TotaraTheme.colorFont
  },
  listContainer: {
    flexDirection: "row",
    marginRight: marginM,
    justifyContent: "flex-start"
  },
  textLink: {
    justifyContent: "center",
    marginBottom: marginM,
    ...TotaraTheme.textRegular,
    color: TotaraTheme.colorLink
  },
  imageContainer: {
    width: "100%",
    height: deviceScreen.width,
    borderRadius: borderRadius.borderRadiusM,
    backgroundColor: TotaraTheme.colorNeutral2
  },
  imageContainerWrapper: {
    display: "flex",
    borderRadius: borderRadius.borderRadiusM,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    height: (deviceScreen.width * 1) / 2 - 20
  },
  list: {
    textAlign: "left",
    ...TotaraTheme.textRegular,
    marginRight: marginM,
    marginTop: margins.marginS,
    alignSelf: "flex-start"
  },
  ruler: {
    backgroundColor: TotaraTheme.colorNeutral6,
    marginVertical: margins.marginL,
    height: 0.5
  },
  touchableViewWrap: {
    flexDirection: "row",
    marginVertical: marginS,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  attachmentFileName: {
    textAlign: "left",
    ...TotaraTheme.textRegular,
    color: TotaraTheme.colorLink,
    alignSelf: "flex-start"
  },
  iconWrap: {
    justifyContent: "center",
    marginEnd: marginS
  },
  embeddedMediaTitle: {
    textAlign: "left",
    ...TotaraTheme.textRegular,
    color: TotaraTheme.colorNeutral6,
    justifyContent: "center"
  },
  webViewWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: borderRadius.borderRadiusM,
    backgroundColor: "transparent",
    opacity: 0.99 //Fixed: MOB-920, https://stackoverflow.com/questions/54131875/screen-blinks-once-when-rendering-a-webview-on-android/54719378#54719378
  },
  closeButtonTouchableOpacity: {
    marginTop: marginM,
    marginEnd: marginM,
    height: iconSizes.sizeXL,
    width: iconSizes.sizeXL,
    alignItems: "center",
    justifyContent: "center"
  },
  closeButtonWrap: {
    height: "10%",
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  listItemWrapper: {
    flexDirection: "row",
    flex: 1,
    marginLeft: margins.marginXS,
    paddingVertical: paddings.paddingS
  },
  listItem: {
    width: iconSizes.sizeM,
    paddingRight: paddings.paddingXS
  },
  listItemContent: {
    flexShrink: 1
  }
});

export default wekaStyle;
