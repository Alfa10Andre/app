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

import React, { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { useMutation, useQuery } from "@apollo/client";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";

import { registerPushNotifications } from "@totara/lib/notificationService";
import ResourceManager from "@totara/lib/resourceManager";
import { scormStack } from "@totara/features/activities/scorm/ScormActivity";
import AboutStack from "@totara/features/about/AboutStack";
import { tokenSent, updateToken } from "./actions/notification";
import { cardModalOptions, navigateByRef, horizontalAnimation } from "./lib/navigation";
import { NAVIGATION } from "./lib/navigation";
import { mutationForToken, notificationsQuery } from "./features/notifications/api";
import { RootState } from "./reducers";
import TabContainer from "./TabContainer";
import WebViewStack from "./features/activities/webview/WebViewStack";
import { OverviewModal } from "./features/findLearning/OverviewModal";
import FindLearningWebViewWrapper from "./features/findLearning/FindLearningWebViewWrapper";
import { EnrolmentModal } from "./features/enrolment/EnrolmentModal";
import { translate } from "./locale";
import TotaraNavigationOptions from "./components/NavigationOptions";

const { SCORM_STACK_ROOT, ABOUT, WEBVIEW_ACTIVITY } = NAVIGATION;

const Stack = createStackNavigator();
const detaultScreenOptions = TotaraNavigationOptions({ backTitle: translate("general.back") });
const MainContainer = () => {
  ResourceManager.resumeDownloads();

  const notificationState = useSelector((state: RootState) => state.notificationReducer);
  const { client } = useQuery(notificationsQuery);
  const [sendToken] = useMutation(mutationForToken);
  const dispatch = useDispatch();

  const handleNotificationReceived = (remoteMessage) => {
    if (remoteMessage) {
      fetchNotifications(client);
      if (remoteMessage?.data?.notification === "1") {
        navigateByRef("Notifications", {});
      }
    }
  };

  const fetchNotifications = (client) => {
    if (client) {
      client.query({ query: notificationsQuery, fetchPolicy: "network-only", errorPolicy: "ignore" });
    }
  };

  useEffect(() => {
    if (notificationState?.tokenSent) return;

    registerPushNotifications()
      .then((token) => {
        console.debug("REGISTERING FCM TOKEN");
        sendToken({ variables: { token } })
          .then((success) => {
            if (success) {
              console.debug("TOKEN REGISTERED");
              dispatch(updateToken({ token: token }));
              dispatch(tokenSent({ tokenSent: true }));
            } else {
              console.debug("TOKEN REGISTRATION FAIL");
            }
          })
          .catch((err) => {
            console.debug(err);
          });
      })
      .catch((err) => {
        console.debug("FCM TOKEN ERROR=========>", err);
      });
  }, []);

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.debug(`onNotificationOpenedApp ${remoteMessage}`);
      handleNotificationReceived(remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.debug(`getInitialNotification ${remoteMessage}`);
        fetchNotifications(client);
        handleNotificationReceived(remoteMessage);
      });

    messaging().onTokenRefresh((token) => {
      dispatch(updateToken({ token: token }));
    });

    const unsubscribe = messaging().onMessage((message) => {
      console.debug(`onMessage ${JSON.stringify(message)}`);
      fetchNotifications(client);
    });

    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} mode={"modal"}>
      <Stack.Screen name="TabContainer" component={TabContainer} />
      <Stack.Screen name={SCORM_STACK_ROOT} component={scormStack} />
      <Stack.Screen name={WEBVIEW_ACTIVITY} component={WebViewStack} />
      <Stack.Screen name={ABOUT} component={AboutStack} />
      <Stack.Screen name={NAVIGATION.FIND_LEARNING_OVERVIEW} component={OverviewModal} options={cardModalOptions} />
      <Stack.Screen name={NAVIGATION.ENROLMENT_MODAL} component={EnrolmentModal} options={cardModalOptions} />
      <Stack.Screen
        name={NAVIGATION.FIND_LEARNING_WEBVIEW}
        component={FindLearningWebViewWrapper}
        options={({ route }: any) => ({
          ...horizontalAnimation,
          ...detaultScreenOptions,
          gestureDirection: "horizontal",
          headerTitle: route.params.title
        })}
      />
    </Stack.Navigator>
  );
};

export default MainContainer;
