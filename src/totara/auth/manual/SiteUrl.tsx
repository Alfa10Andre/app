/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2021 onwards Totara Learning Solutions LTD
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

 import { Content, Form, Input } from "native-base";
 import React, { useEffect } from "react";
 import { Image, ImageBackground, ImageSourcePropType, Platform, StyleSheet, Text, View } from "react-native";
 import DeviceInfo from "react-native-device-info";
 import { useSiteUrl } from "./SiteUrlHook";
 import { get } from "lodash";
 
 import { InfoModal, InputTextWithInfo, PrimaryButton } from "@totara/components";
 import { translate } from "@totara/locale";
 import { TotaraTheme } from "@totara/theme/Theme";
 import { fontSizes, margins, paddings } from "@totara/theme/constants";
 import { deviceScreen } from "@totara/lib/tools";
 import { TEST_IDS } from "@totara/lib/testIds";
 import { config } from "@totara/lib";
 import { useSession } from "@totara/core";
 import { useNavigation } from "@react-navigation/native";
 import { SafeAreaView } from "react-native-safe-area-context";
 import { Images } from "@resources/images";
 import IncompatibleApiModal from "@totara/core/IncompatibleApiModal";
 import { NAVIGATION } from "@totara/lib/navigation";
 import { useDispatch } from "react-redux";
import { black, red100, white } from "react-native-paper/lib/typescript/styles/colors";
import { color } from "react-native-elements/dist/helpers";
import LinearGradient from "react-native-linear-gradient";
import { BreakingChange } from "graphql";
 
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
 
 const SiteUrl = () => {
 
   const site_url = "https://elearning.bca.cv/";
 
   const navigation = useNavigation();
   const { setupHost, host } = useSession();
   const dispatch = useDispatch();
 
   // eslint-disable-next-line no-undef
   const initialSiteURL = host ? host : __DEV__ ? get(config, "devOrgUrl", "") : "";
 
   useEffect(() => {
     onSubmit(site_url);
 
     onChangeInputSiteUrl(site_url)
   
   }, [])
   
 
   const { siteUrlState, onSubmit, reset, onChangeInputSiteUrl } = useSiteUrl({
     siteUrl: initialSiteURL,
     onSiteInfoDone: (siteInfo) => {
       dispatch(setupHost({ host: siteUrlState.inputSiteUrl, siteInfo }));
       const { auth } = siteInfo;
       if (auth === "browser") {
         return navigation.navigate(NAVIGATION.BROWSER_LOGIN, {
           siteUrl: siteUrlState.inputSiteUrl
         });
       } else if (auth === "native") {
         return navigation.navigate(NAVIGATION.NATIVE_LOGIN);
       } else {
         return navigation.navigate(NAVIGATION.WEBVIEW_LOGIN);
       }
     }
   });
 
   const { inputSiteUrl, inputSiteUrlMessage, inputSiteUrlStatus } = siteUrlState;
 
   return (
    <ImageBackground style={{flex:1, width:"100%", alignItems:"center"}} source={require("@resources/images/BCA_logo/background.png")} resizeMode="cover">
      <SafeAreaView style={{ flex: 1 }}>
        <Content enableOnAndroid contentContainerStyle={styles.mainContent}>
          <Form style={styles.siteUrlContainer}>
            <View style={styles.logoContainer}>
              <Image source={require("@resources/images/BCA_logo/logotipo.png")} style={styles.logo} />
            </View>


            <View style={styles.logoContainerEdu}>
              <Image source={require("@resources/images/BCA_logo/text.png")} style={styles.textelearn} />
            </View>

            
 
          </Form>
        </Content>
  
              <PrimaryButton
                onPress={() => onSubmit(inputSiteUrl!)}
                text={translate("general.enter")}
                style={styles.buttonEnter}
                mode={siteUrlState.inputSiteUrlStatus === "fetching" ? "loading" : undefined}
                testID={TEST_IDS.SUBMIT_URL}
                textColor="#213169"
                
              />
              

              <View style={styles.footer}>
                
                <Text style={{fontSize:15, color:"#213169", fontWeight: "bold"}}>© 2023 - Banco Comercial do Atlântico</Text>

              </View>
             
               
  
  
        {(siteUrlState.inputSiteUrlStatus === "invalidAPI" || siteUrlState.inputSiteUrlStatus === "networkError") && (
          <SiteErrorModal
            onDismiss={() => reset()}
            siteUrlFailure={siteUrlState.inputSiteUrlStatus}
            testID={TEST_IDS.SITE_ERROR_MODAL}
          />
        )}
        {siteUrlState.inputSiteUrlStatus === "minAPIVersionMismatch" && (
          <IncompatibleApiModal
            onCancel={() => reset()}
            siteUrl={siteUrlState.inputSiteUrl!}
            testID={TEST_IDS.INCOMPATIBLE_API_MODAL}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
   );
 };
 
 const styles = StyleSheet.create({
   mainContent: {
     flexGrow: 1
   },
   siteUrlContainer: {
     flex: 1,
     justifyContent: "space-between",

   },
   logoContainer: {
     height: "40%",
     flexDirection: "row",
     justifyContent: "center",
     flex: 1,
   },
   logo: {
    borderRadius:0,
    width: deviceScreen.width * 0.3,
    maxWidth: 500,
    /**To make sure width work properly, aspectRatio needs to be set.
     * However, totara.logo has not a good aspectRatio (0.7083333333), I decided to infer the totara.logo aspectRatio using width/height */
    aspectRatio: 100 / 120,
    alignSelf: "center"
  },


   logoContainerEdu:{

    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    flex: 1
  },

   textelearn: {

    //alignSelf: "center"
   },

   footer:{

     justifyContent: "center",
     textAlign: "center",
     alignSelf: "center",
     flex: 0.092,
   },

   formContainer: {
     height: "60%",
     paddingHorizontal: paddings.paddingXL
   },
 
   version: {
     ...TotaraTheme.textXSmall,
     color: TotaraTheme.colorNeutral6,
     textAlign: "center",
     flexDirection: "column-reverse",
     paddingBottom: paddings.paddingL
   },
 
   urlTitle: {
     ...TotaraTheme.textH3
   },
   urlInformation: {
     ...TotaraTheme.textRegular,
     color: TotaraTheme.colorNeutral6
   },
   inputText: {
     paddingRight: 0,
     paddingLeft: 0
   },
   buttonEnter: {
     alignSelf:"center",
     textAlign:"center",
     //background: "#fff",
     marginTop: margins.marginS,
     //marginLeft: Platform.OS == "ios" ? 100 : 0,
     //marginRight: Platform.OS == "ios" ? 100 : 0,
     marginBottom: Platform.OS == "ios" ? 50 : 20,
    // borderRadius: Platform.OS == "android" ? 5 : 5,
     maxWidth:800,
     //width: 300,
     //textcolor:"#d4e309",
     //backgroundColor:"#f0f0f7",
     minWidth:300,
   }
   
 });
 
 export default SiteUrl;
 