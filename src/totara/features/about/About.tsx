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

import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import { getBuildNumber, getVersion } from "react-native-device-info";
import { View } from "react-native-animatable";
import { Clipboard } from "react-native";
import { Toast } from "native-base";
import { Images } from "@resources/images";
import { TotaraTheme } from "@totara/theme/Theme";
import { paddings, margins } from "@totara/theme/constants";
import { translate } from "@totara/locale";
import { useSession } from "@totara/core";

const About = () => {
  const { host, siteInfo } = useSession();
  const onSiteURLLongPress = () => {
    Clipboard.setString(host!);
    Toast.show({
      text: translate("general.copied_to_clipboard")
    });
  };

  const onPluginVersionLongPress = () => {
    Clipboard.setString(siteInfo!.version as string);
    Toast.show({
      text: translate("general.copied_to_clipboard")
    });
  };

  return (
    <View style={styles.container} testID={"aboutContainer"}>
      <View style={styles.logoContainer} animation={"slideInUp"}>
        <Image source={Images.totaraLogo} style={styles.logo} />
      </View>
      <View style={styles.versionContainer}>
        <Text style={styles.versionBuild}>{translate("about.version", { version: getVersion() })}</Text>
        <Text style={styles.versionBuild}>{`(${getBuildNumber()})`}</Text>
      </View>
      <View style={styles.environmentDetails}>
        <Text style={styles.siteUrlPluginVersion} onLongPress={onSiteURLLongPress}>
          {translate("about.site_url", { url: host })}
        </Text>
        <Text style={styles.siteUrlPluginVersion} onLongPress={onPluginVersionLongPress}>
          {translate("about.plugin_version", { version: siteInfo!.version })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1
  },
  logoContainer: { alignSelf: "center" },
  logo: {
    height: 240 / 2, //half-size of original file
    aspectRatio: 240 / 170 //using aspectRatio of logo_totara@2x.png
  },
  versionContainer: {
    flexDirection: "row",
    alignSelf: "center",
    paddingTop: paddings.padding2XL
  },
  versionBuild: {
    ...TotaraTheme.textSmall,
    color: TotaraTheme.colorNeutral6,
    alignSelf: "center"
  },
  environmentDetails: {
    alignSelf: "center",
    marginTop: margins.marginL
  },
  siteUrlPluginVersion: {
    ...TotaraTheme.textXSmall,
    color: TotaraTheme.colorNeutral6,
    alignSelf: "center",
    marginTop: margins.marginXS
  }
});

export default About;
