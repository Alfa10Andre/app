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

import React, { useContext } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Linking, ImageSourcePropType } from "react-native";
import { Form, Input, Container, Content } from "native-base";

import { config } from "@totara/lib";
import { gutter, ThemeContext } from "@totara/theme";
import { PrimaryButton, InputTextWithInfo, FormError, InfoModal } from "@totara/components";
import { translate } from "@totara/locale";
import { fetchData, registerDevice } from "@totara/core/AuthRoutines";
import { useNativeFlow } from "./NativeFlowHook";
import { margins } from "@totara/theme/constants";
import { TotaraTheme } from "@totara/theme/Theme";
import { NATIVE_LOGIN_TEST_IDS, TEST_IDS } from "@totara/lib/testIds";
import { useSession } from "@totara/core";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Images } from "@resources/images";
import { useDispatch } from "react-redux";


type PropSiteError = {
  onDismiss: () => void;
  siteUrlFailure: string;
  testID?: string;
};

const SiteErrorModal = ({ onDismiss, siteUrlFailure, testID }: PropSiteError) => {
  const content =
    siteUrlFailure === "networkError"
      ? {
          title: translate("server_not_reachable.title"),
          description: translate("server_not_reachable.message"),
          imageSource: Images.generalError,
          primaryAction: translate("server_not_reachable.go_back")
        }
      : {
          title: translate("site_url.auth_invalid_site.title"),
          description: translate("site_url.auth_invalid_site.description"),
          imageSource: Images.urlNotValid,
          primaryAction: translate("site_url.auth_invalid_site.action_primary")
        };

  return (
    <InfoModal
      visible={true}
      title={content.title}
      description={content.description}
      imageSource={content.imageSource as ImageSourcePropType}
      testID={testID}>
      <PrimaryButton text={content.primaryAction} onPress={onDismiss} />
    </InfoModal>
  );
};


const NativeLogin = () => {

  const site_url = "https://elearning.bca.cv/";
  
  // eslint-disable-next-line no-undef
  const fetchDataWithFetch = fetchData(fetch);
  const { siteInfo, host, apiKey, initSession } = useSession();
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  const { nativeLoginState, onClickEnter, inputUsernameWithShowError, inputPasswordWithShowError, onFocusInput } =
    useNativeFlow(fetchDataWithFetch)({
      siteInfo: siteInfo!,
      siteUrl: host!
    });

  useEffect(() => {
    if (nativeLoginState.setupSecret && !apiKey) {
      registerDevice(
        fetchDataWithFetch,
        AsyncStorage
      )({
        uri: host!,
        secret: nativeLoginState.setupSecret,
        siteInfo: siteInfo
      }).then(res => {
        dispatch(initSession({ apiKey: res.apiKey }));
        navigation.goBack();
      });
    }
  }, [nativeLoginState.setupSecret, apiKey]);



  
  return (
    <Container style={theme.viewContainer}>
      <View style={{ position: "relative", zIndex: 2 }}>
        <FormError
          message={translate("native_login.error_unauthorized")}
          isShow={nativeLoginState.errorStatusUnauthorized}
        />
      </View>
      <Content style={styles.content} enableOnAndroid>
        <Image
          source={theme.urlLogo ? { uri: theme.urlLogo } : require("@resources/images/totara_logo/totara_logo.png")}
          style={styles.totaraLogo}
          resizeMode={"contain"}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.loginTitle}>{translate("native_login.header_title")}</Text>
          <Text style={styles.loginInformation}>{translate("native_login.login_information")}</Text>
        </View>
        <Form>
          <View>
            <InputTextWithInfo
              placeholder={translate("native_login.username_text_placeholder")}
              message={
                nativeLoginState.inputUsernameStatus == "error"
                  ? translate("native_login.validation.enter_valid_username")
                  : undefined
              }
              status={nativeLoginState.inputUsernameStatus}>
              <Input
                clearButtonMode="while-editing"
                autoCapitalize="none"
                onChangeText={inputUsernameWithShowError}
                value={nativeLoginState.inputUsername}
                style={styles.inputText}
                onFocus={onFocusInput}
                testID={TEST_IDS.USER_INPUT}
              />
            </InputTextWithInfo>
          </View>
          <View>
            <InputTextWithInfo
              placeholder={translate("native_login.password_text_placeholder")}
              message={
                nativeLoginState.inputPasswordStatus == "error"
                  ? translate("native_login.validation.enter_valid_password")
                  : undefined
              }
              status={nativeLoginState.inputPasswordStatus}>
              <Input
                secureTextEntry={true}
                clearButtonMode="while-editing"
                onChangeText={inputPasswordWithShowError}
                value={nativeLoginState.inputPassword}
                style={styles.inputText}
                onFocus={onFocusInput}
                testID={TEST_IDS.USER_PW}
              />
            </InputTextWithInfo>
          </View>
          <PrimaryButton
            onPress={onClickEnter}
            text={translate("general.enter")}
            mode={nativeLoginState.isRequestingLogin ? "loading" : undefined}
            testID={TEST_IDS.LOGIN}
          />
          <View style={[styles.forgotCredentialContainer, theme.textRegular]}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(config.forgotPasswordUri(host!));
              }}>
              <Text style={styles.forgotCredential}>{translate("native_login.forgot_username_password")}</Text>
            </TouchableOpacity>
          </View>
        </Form>
      </Content>
      {nativeLoginState.unhandledLoginError && (
        <InfoModal
          title={translate("native_login.auth_general_error.title")}
          description={translate("native_login.auth_general_error.description")}
          imageSource={Images.generalError as ImageSourcePropType}
          testID={NATIVE_LOGIN_TEST_IDS.UNHANDLED_ERROR}>
          <PrimaryButton text={translate("native_login.auth_general_error.action_primary")} onPress={onFocusInput} />
        </InfoModal>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  loginTitle: {
    ...TotaraTheme.textH3
  },
  loginInformation: {
    ...TotaraTheme.textRegular,
    color: TotaraTheme.colorNeutral6
  },
  navigation: {
    alignItems: "flex-start",
    borderBottomWidth: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: margins.marginM
  },
  content: {
    paddingHorizontal: gutter
  },
  totaraLogo: {
    height: 88,
    width: "100%",
    marginTop: margins.marginXL
  },
  infoContainer: {
    justifyContent: "space-between",
    textAlignVertical: "center",
    marginBottom: margins.marginM,
    marginTop: margins.margin2XL
  },
  inputText: {
    paddingLeft: 0,
    marginLeft: 0
  },
  forgotCredentialContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: margins.marginS
  },
  forgotCredential: {
    padding: margins.marginL,
    color: TotaraTheme.colorLink,
    textAlign: "center"
  }
});

export default NativeLogin;
