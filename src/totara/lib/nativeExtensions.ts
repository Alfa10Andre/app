import { NativeModules } from "react-native";
import { isIOS } from "./tools";
const { TotaraExtensions } = NativeModules;

const setNotificationBadgeCount = (count: number) => {
  if (isIOS) {
    TotaraExtensions.setNotificationBadgeCount(count);
  }
};
export { setNotificationBadgeCount };
