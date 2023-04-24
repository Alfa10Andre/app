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

import { NotificationMessage } from "@totara/types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { fontWeights, iconSizes, paddings } from "@totara/theme/constants";
import React, { useContext } from "react";
import { ThemeContext } from "@totara/theme";
import { TotaraTheme } from "@totara/theme/Theme";
import listViewStyles from "@totara/theme/listView";
import { decodeHtmlCharCodes, timeAgo } from "@totara/lib/tools";
import { translate } from "@totara/locale";

type NotificationItemProps = {
  testID?: string;
  item: NotificationMessage;
  selectable?: boolean;
  selected?: boolean;
  onNotificationItemPress: (item: NotificationMessage) => void;
  onNotificationItemLongPress?: (item: NotificationMessage) => void;
};

const NotificationItem = ({
  testID,
  item,
  onNotificationItemPress,
  onNotificationItemLongPress = () => null,
  selectable = true,
  selected = false
}: NotificationItemProps) => {
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      testID={testID}
      accessibilityHint={translate("notifications.tap_to_launch_hint")}
      onPress={() => onNotificationItemPress(item)}
      onLongPress={() => onNotificationItemLongPress(item)}>
      <View key={item.id} style={listViewStyles.rowItem}>
        {selectable && (
          <View testID={"test_checkbox"} style={[styles.itemCircle, { display: !selectable ? "none" : "flex" }]}>
            <FontAwesomeIcon
              size={iconSizes.sizeM}
              icon={"check-circle"}
              color={selected ? theme.colorLink : TotaraTheme.colorNeutral3}
            />
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text testID={"test_title"} style={[styles.title, item.isRead && styles.read]}>
            {decodeHtmlCharCodes(item.subject)}
          </Text>
          <Text testID={"test_timeCreated"} style={styles.timeCreated}>
            {timeAgo(item.timeCreated)}
          </Text>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "center"
          }}>
          <FontAwesomeIcon size={iconSizes.sizeM} color={TotaraTheme.colorNeutral3} icon={"angle-right"} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    ...TotaraTheme.textRegular,
    padding: paddings.paddingM,
    fontWeight: fontWeights.fontWeightBold
  },
  timeCreated: {
    ...TotaraTheme.textSmall,
    paddingLeft: paddings.paddingM,
    color: TotaraTheme.colorNeutral6
  },
  read: {
    fontWeight: fontWeights.fontWeightRegular
  },
  itemCircle: {
    padding: paddings.paddingL,
    display: "flex",
    justifyContent: "center"
  }
});

export default NotificationItem;
