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

import React, { useLayoutEffect, useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Input } from "react-native-elements/dist/input/Input";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { NetworkStatus, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { isEmpty } from "lodash";

import { PrimaryButton, SecondaryButton } from "@totara/components";
import { translate } from "@totara/locale";
import { fontWeights, margins, paddings } from "@totara/theme/constants";
import { TotaraTheme } from "@totara/theme/Theme";
import { NAVIGATION } from "@totara/lib/navigation";
import { enrolmentInfoQuery, guestAccessQuery, selfEnrolmentMutation } from "./api";
import { EnrolmentOption } from "@totara/types/EnrolmentOption";
import { learningItemEnum } from "../constants";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingLeft: paddings.paddingXL,
    paddingRight: paddings.paddingXL
  },
  widgetContainer: {
    borderTopWidth: 1,
    borderColor: TotaraTheme.colorNeutral5,
    paddingVertical: paddings.paddingXL
  },
  widgetTitle: {
    ...TotaraTheme.textRegular,
    fontWeight: fontWeights.fontWeightBold
  },
  input: {
    paddingLeft: 0,
    marginTop: margins.marginL
  },
  inputError: {
    color: TotaraTheme.colorAlert
  },
  button: {
    marginTop: margins.marginL
  },
  loadingEnrolmentData: {
    paddingHorizontal: paddings.paddingXL,
    justifyContent: "center",
    flex: 1,
    alignItems: "center"
  }
});

/** As guest access and self enrolment diverge on labels and mutations, so I made them two separated components.  */
type GuestPasswordState = {
  password?: string;
  errorMessage?: string;
};

const GuestAccessWidget = ({
  courseId,
  enrolment: { id, passwordRequired }
}: {
  courseId: string;
  enrolment: EnrolmentOption;
}) => {
  const navigation = useNavigation();
  const [validateGuestAccess, { loading, data: guestAccessResult }] = useLazyQuery(guestAccessQuery);

  const [passwordState, setPasswordState] = useState<GuestPasswordState>({});

  const goToCourseOnTap = () => {
    const missingPassword = passwordRequired && isEmpty(passwordState?.password);

    if (missingPassword) {
      setPasswordState({
        ...passwordState,
        errorMessage: translate("enrolment_options.required")
      });
      return;
    }

    validateGuestAccess({
      variables: {
        input: {
          courseid: courseId,
          instanceid: id,
          password: passwordState.password || ""
        }
      }
    });
  };

  const navigateToCourse = () => {
    const routeId = NAVIGATION.FIND_LEARNING_COURSE_DETAILS;

    navigation.navigate(routeId, {
      targetId: courseId,
      guestPassword: passwordState.password,
      passwordRequired,
      courseGroupType: learningItemEnum.Course
    });
  };

  const onPasswordChange = newValue => {
    setPasswordState({
      ...passwordState,
      password: newValue,
      errorMessage: undefined
    });
  };

  const guestHasAccess = guestAccessResult?.mobile_findlearning_validate_guest_password?.success;
  const guestHasFailureMessage = guestAccessResult?.mobile_findlearning_validate_guest_password?.failureMessage;

  useEffect(() => {
    if (guestHasAccess) {
      navigateToCourse();
    }
  }, [guestHasAccess]);

  useEffect(() => {
    setPasswordState({
      ...passwordState,
      errorMessage: guestHasFailureMessage
    });
  }, [guestHasFailureMessage]);

  return (
    <View testID={"guest_access_widget"} style={styles.widgetContainer}>
      <Text style={styles.widgetTitle}>{translate("enrolment_options.guest_access")}</Text>
      {passwordRequired && (
        <Input
          containerStyle={styles.input}
          placeholder={translate("enrolment_options.password_required")}
          clearButtonMode="while-editing"
          autoCapitalize="none"
          testID={"guest_access_password"}
          returnKeyType={"done"}
          errorMessage={passwordState.errorMessage}
          errorStyle={styles.inputError}
          onChangeText={onPasswordChange}
        />
      )}
      <PrimaryButton
        testID={"guest_access_button"}
        style={styles.button}
        text={translate("enrolment_options.go_to_course")}
        onPress={goToCourseOnTap}
        mode={loading ? "loading" : undefined}
      />
    </View>
  );
};

type EnrolmentKeyState = {
  key?: string;
  isNotValid?: boolean;
};

const SelfEnrolmentWidget = ({
  courseId,
  enrolment: { id, passwordRequired, customName, roleName }
}: {
  courseId: string;
  enrolment: EnrolmentOption;
}) => {
  const navigation = useNavigation();
  const [selfEnrol, { data: dataSelfEnrol, loading: loadingSelfEnrol }] = useMutation(selfEnrolmentMutation);

  const [enrolmentKeyState, setEnrolmentKeyState] = useState<EnrolmentKeyState>({
    key: undefined,
    isNotValid: undefined
  });

  const onEnrolmentKeyChange = newValue => {
    setEnrolmentKeyState({
      ...enrolmentKeyState,
      key: newValue,
      isNotValid: passwordRequired && isEmpty(newValue)
    });
  };

  const navigateToCourse = () => {
    const routeId = NAVIGATION.FIND_LEARNING_COURSE_DETAILS;
    navigation.navigate(routeId, { targetId: courseId, courseGroupType: learningItemEnum.Course });
  };

  const enrolmentSuccess = dataSelfEnrol?.mobile_findlearning_enrolment_result?.success;

  useEffect(() => {
    if (enrolmentSuccess) {
      navigateToCourse();
    }
  }, [enrolmentSuccess]);

  const onEnrolMeTap = () => {
    const missingEnrolmentKey = passwordRequired && isEmpty(enrolmentKeyState?.key);

    if (missingEnrolmentKey) {
      setEnrolmentKeyState({
        ...enrolmentKeyState,
        isNotValid: true
      });
      return;
    }

    selfEnrol({
      variables: {
        input: {
          courseid: courseId,
          instanceid: id,
          password: enrolmentKeyState.key
        }
      }
    });
  };

  const title = customName ? customName : translate("enrolment_options.self_enrolment_title", { roleName: roleName });

  const enrolmentErrorKeyRequiredMsg = enrolmentKeyState.isNotValid && translate("enrolment_options.required");
  const enrolmentErrorKeyMsg = dataSelfEnrol?.mobile_findlearning_enrolment_result?.msgKey;

  return (
    <View testID={"self_enrolment_widget"} style={styles.widgetContainer}>
      <Text testID={"self_enrolment_title"} style={styles.widgetTitle}>
        {title}
      </Text>
      {passwordRequired && (
        <Input
          containerStyle={styles.input}
          placeholder={translate("enrolment_options.enrolment_key")}
          clearButtonMode="while-editing"
          autoCapitalize="none"
          testID={"self_enrolment_key"}
          returnKeyType={"done"}
          errorMessage={enrolmentErrorKeyRequiredMsg || enrolmentErrorKeyMsg}
          errorStyle={styles.inputError}
          onChangeText={onEnrolmentKeyChange}
        />
      )}
      <PrimaryButton
        testID={"self_enrolment_button"}
        style={styles.button}
        text={translate("enrolment_options.enrol_me")}
        onPress={onEnrolMeTap}
        mode={loadingSelfEnrol ? "loading" : undefined}
      />
    </View>
  );
};

const EnrolmentOptionsContent = ({
  courseId,
  enrolmentOptions
}: {
  courseId: string;
  enrolmentOptions: EnrolmentOption[];
}) => {
  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <View testID={"enrolment_options_content"}>
        {enrolmentOptions
          .sort((e1, e2) => e1.sortOrder - e2.sortOrder)
          .map(enrolmentOption => {
            const { id, type } = enrolmentOption;
            if (type === "guest") {
              return <GuestAccessWidget courseId={courseId} key={id} enrolment={enrolmentOption} />;
            }
            return <SelfEnrolmentWidget courseId={courseId} key={id} enrolment={enrolmentOption} />;
          })}
      </View>
    </KeyboardAwareScrollView>
  );
};

const LoadingEnrolmentData = () => {
  return (
    <View testID={"loading_enrolment_data"} style={styles.loadingEnrolmentData}>
      <ActivityIndicator />
      <Text style={{ marginTop: margins.marginL, textAlign: "center" }}>
        {translate("enrolment_options.loading_enrolment_data")}
      </Text>
    </View>
  );
};

const LoadingError = ({ onTryReload }: { onTryReload: () => void }) => {
  return (
    <View testID={"loading_error"} style={styles.loadingEnrolmentData}>
      <Text style={{ paddingTop: paddings.paddingL, textAlign: "center" }}>
        {translate("enrolment_options.loading_enrolment_error")}
      </Text>
      <View style={{ marginTop: margins.marginL }}>
        <SecondaryButton text={translate("general.try_again")} onPress={onTryReload}></SecondaryButton>
      </View>
    </View>
  );
};

type EnrolmentModalParamList = {
  EnrolmentModal: {
    targetId: string;
  };
};

export const EnrolmentModal = () => {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<EnrolmentModalParamList, "EnrolmentModal">>();
  const { targetId } = params;

  const { data, networkStatus, error, refetch } = useQuery(enrolmentInfoQuery, {
    variables: { courseid: targetId },
    fetchPolicy: "no-cache"
  });

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: translate("enrolment_options.title") });
  });

  if (!data && (networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.refetch))
    return <LoadingEnrolmentData />;

  if (error || networkStatus === NetworkStatus.error)
    return (
      <LoadingError
        onTryReload={() => {
          refetch();
        }}
      />
    );

  const { enrolmentInfo } = data;
  const { enrolmentOptions } = enrolmentInfo;

  return <EnrolmentOptionsContent courseId={targetId} enrolmentOptions={enrolmentOptions} />;
};
