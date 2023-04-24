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

import { Alert, Dimensions, Platform } from "react-native";
import { translate } from "@totara/locale";
import moment from "moment";
import { get, isEmpty } from "lodash";
import { SubPlugin } from "@totara/lib/constants";
import config from "./config";

type ShowMessageParams = {
  title?: string;
  text: string;
  callback?: (value?: string | undefined) => void;
};

const showMessage = ({ title = "", text, callback = () => null }: ShowMessageParams) => {
  Alert.alert(title, text, [{ text: translate("general.ok"), onPress: callback }], {
    cancelable: false
  });
};

const showConfirmation = ({
  title,
  message,
  callback
}: {
  title: string;
  message: string;
  callback: (value?: string | undefined) => void;
}) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: translate("general.cancel"),
        style: "cancel"
      },
      {
        text: translate("general.ok"),
        onPress: callback
      }
    ],
    { cancelable: false }
  );
};

const humanReadablePercentage = ({ writtenBytes, sizeInBytes }) => {
  if (!writtenBytes || !sizeInBytes) return 0;
  return (writtenBytes / sizeInBytes) * 100;
};

//RFC4122 version 4 compliant
const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const timeAgo = (fromUnixTime: number) => {
  moment.relativeTimeThreshold("h", 24);
  return moment.unix(fromUnixTime).fromNow();
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const deviceScreen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  scale: Dimensions.get("window").scale,
  screenSizes: {
    small: Dimensions.get("window").width + Dimensions.get("window").height < 1000 //Iphone 5 and smaller android devices
  }
};

const getHostnameFromRegex = (url) => {
  // run against regex
  const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
  // extract hostname (will be null if no match is found)
  return matches && matches[1];
};

const getUrlLastComponentFromRegex = (url) => {
  return url
    .replace(/\/\s*$/, "")
    .split("/")
    .pop();
};

const isIOS = Platform.OS === "ios";
const isAndroid = Platform.OS === "android";

const isValidUrlText = (urlText: string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(urlText);
};

const decodeHtmlCharCodes = (str) =>
  str.replace(/(&#(\d+);)/g, (match, capture, charCode) => String.fromCharCode(charCode));

const isEnableFindLearning = (core) => {
  if (config.disableFindLearning) {
    return false;
  }
  const subPlugnis = get(core, "system.mobile_subplugins");
  return !isEmpty(subPlugnis?.find((element) => element.pluginname === SubPlugin.findLearning));
};

export {
  showMessage,
  showConfirmation,
  humanReadablePercentage,
  uuid,
  deviceScreen,
  timeAgo,
  capitalizeFirstLetter,
  getHostnameFromRegex,
  getUrlLastComponentFromRegex,
  isIOS,
  isAndroid,
  isValidUrlText,
  decodeHtmlCharCodes,
  isEnableFindLearning
};
