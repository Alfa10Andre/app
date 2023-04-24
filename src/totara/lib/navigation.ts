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

import { TransitionPresets } from "@react-navigation/stack";
import { learningItemEnum } from "@totara/features/constants";
import React from "react";

/**
 * Navigates to a next screen using react navigation.
 * @param navigation
 * @param item
 */
const navigateTo = ({ navigate, routeId, props }) => {
  navigate(routeId, props);
};

const navigationRef = React.createRef<any>();

//current learning
const CURRENT_LEARNING = "CurrentLearning";
const COURSE_DETAILS = "CourseDetails";
const COURSE_GROUP_DETAILS = "CourseGroupDetails"; //either LearningItemEnum.Program or LearningItemEnum.Certificate
const COURSE_LIST = "CourseList";

//scorm routes
const SCORM_STACK_ROOT = "ScormActivityStack";
const WEBVIEW_ACTIVITY = "WebviewActivity";
const SCORM_ROOT = "ScormActivity";
const SCORM_ATTEMPTS = "ScormAttempts";
const OFFLINE_SCORM_ACTIVITY = "OfflineScormActivity";
const SCORM_FEEDBACK = "ScormFeedback";

const PROFILE = "Profile";
const ABOUT = "About";
const SETTINGS = "Settings";

//Find Learning
const FIND_LEARNING = "FindLearning";
const FIND_LEARNING_OVERVIEW = "FindLearningOverview";
const FIND_LEARNING_COURSE_DETAILS = "FindLearningCourseDetails";
const FIND_LEARNING_WEBVIEW = "FindLearningWebViewWrapper";
const ENROLMENT_MODAL = "EnrolmentModal";

//Site url and Login
const SITE_URL = "SiteUrl";
const NATIVE_LOGIN = "NativeLogin";
const BROWSER_LOGIN = "BrowserLogin";
const WEBVIEW_LOGIN = "WebViewLogin";

const learningItemToRouteMap = {
  [learningItemEnum.Course]: COURSE_DETAILS,
  [learningItemEnum.Program]: COURSE_GROUP_DETAILS,
  [learningItemEnum.Certification]: COURSE_GROUP_DETAILS
};

const NAVIGATION = {
  PROFILE,
  ABOUT,
  SETTINGS,
  SCORM_STACK_ROOT,
  SCORM_ROOT,
  SCORM_ATTEMPTS,
  SCORM_FEEDBACK,
  OFFLINE_SCORM_ACTIVITY,
  WEBVIEW_ACTIVITY,
  CURRENT_LEARNING,
  COURSE_LIST,
  COURSE_DETAILS,
  COURSE_GROUP_DETAILS,
  FIND_LEARNING,
  FIND_LEARNING_OVERVIEW,
  FIND_LEARNING_COURSE_DETAILS,
  SITE_URL,
  NATIVE_LOGIN,
  WEBVIEW_LOGIN,
  BROWSER_LOGIN,
  ENROLMENT_MODAL,
  FIND_LEARNING_WEBVIEW
};

const cardModalOptions = {
  cardOverlayEnabled: true,
  ...TransitionPresets.ModalPresentationIOS,
  headerStatusBarHeight: 0,
  headerShown: true,
  headerBackTitleVisible: false,
  headerTitle: "",
  headerStyle: {
    shadowColor: "transparent",
    elevation: 0
  }
};

const popupModalOptions = {
  animationEnabled: true,
  cardStyle: { backgroundColor: "rgba(0,0,0, 0.15)" },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 0.15, 0.9, 1],
          outputRange: [0, 0.25, 0.7, 1]
        })
      }
    };
  }
};

const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0]
            })
          }
        ]
      }
    };
  }
};

const navigateByRef = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

const popAndGoToByRef = (to, params) => {
  navigationRef.current?.goBack();
  setTimeout(() => {
    navigationRef.current?.navigate(to, params);
  }, 200);
};

export {
  navigationRef,
  navigateByRef,
  popAndGoToByRef,
  navigateTo,
  NAVIGATION,
  learningItemToRouteMap,
  cardModalOptions,
  popupModalOptions,
  horizontalAnimation
};
