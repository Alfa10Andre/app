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

import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import PDFView from "react-native-view-pdf";
import Orientation from "react-native-orientation-locker";

import { Activity } from "@totara/types";
import { AUTH_HEADER_FIELD } from "@totara/lib/constants";
import { TotaraTheme } from "@totara/theme/Theme";
import { Loading } from "@totara/components";
import WebViewWrapper from "@totara/auth/WebViewWrapper";

const PDF_TYPE = "application/pdf";
/**
 * WebviewActivity opens an activity with the given url
 */

type WebviewActivityParams = {
  activity: Activity;
  uri: string;
  backAction: () => void;
  fileurl?: string;
  mimetype?: string;
  apiKey?: string;
};

type WebviewActivityProps = {
  navigation: any;
};

const WebviewActivity = ({ navigation }: WebviewActivityProps) => {
  const { uri, backAction, activity, fileurl, mimetype, apiKey } = navigation.state.params as WebviewActivityParams;
  useEffect(() => {
    Orientation.unlockAllOrientations();
    return () => Orientation.lockToPortrait();
  }, []);

  return (
    <SafeAreaView style={TotaraTheme.viewContainer}>
      {mimetype === PDF_TYPE ? (
        <PDFViewWrapper fileurl={fileurl} apiKey={apiKey} />
      ) : (
        <WebViewWrapper uri={uri || activity?.viewurl!} backAction={backAction} />
      )}
    </SafeAreaView>
  );
};

const PDFViewWrapper = ({ fileurl, apiKey }: { fileurl?: string; apiKey?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <PDFView
        style={{ flex: 1 }}
        resource={fileurl!}
        resourceType={"url"}
        urlProps={{ headers: { [AUTH_HEADER_FIELD]: `${apiKey}` } }}
        onLoad={() => setIsLoaded(true)}></PDFView>
      {!isLoaded && (
        <View style={pdfViewStyle.loadingWrapper}>
          <Loading />
        </View>
      )}
    </>
  );
};

const pdfViewStyle = StyleSheet.create({
  loadingWrapper: { position: "absolute", width: "100%", height: "100%" }
});

export { WebviewActivity };
