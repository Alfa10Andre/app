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

import React, { useState } from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { isEmpty, isEqual } from "lodash";
import { Loading, LoadingError } from "@totara/components";
import { useQuery, NetworkStatus } from "@apollo/client";
import { translate } from "@totara/locale";
import { coreCourse } from "./api";
import Activities from "./Activities";
import { CourseContentDetails } from "@totara/types";
import { StatusKey } from "@totara/types/Completion";
import OverviewDetails from "../overview/OverviewDetails";
import { TotaraTheme } from "@totara/theme/Theme";
import LearningDetails from "../LearningDetails";
import CourseCompletionModal from "../CourseCompletionModal";
import { learningItemEnum } from "@totara/features/constants";
import courseDetailsStyle from "./courseDetailsStyle";
import { CourseFormat } from "@totara/types/Course";
import { DescriptionFormat } from "@totara/types/LearningItem";

const CourseDetails = ({ navigation, route }: any) => {
  const courseId = route?.params?.targetId || navigation.getParam("targetId");
  const passwordRequired = route?.params?.passwordRequired;

  let queryVariables = { courseid: courseId };
  if (passwordRequired) {
    const guestPassword = route?.params?.guestPassword;
    queryVariables = { ...queryVariables, guestpw: guestPassword };
  }

  const { networkStatus, error, data, refetch } = useQuery(coreCourse, {
    variables: queryVariables,
    notifyOnNetworkStatusChange: true
  });

  const onContentRefresh = () => {
    refetch();
  };

  if (networkStatus === NetworkStatus.loading) return <Loading />;
  if (!data && error) return <LoadingError onRefreshTap={onContentRefresh} error={error} />;

  if (data) {
    return (
      <CourseDetailsContent
        loading={networkStatus === NetworkStatus.refetch}
        pullToRefresh={onContentRefresh}
        courseDetails={data.mobile_course}
        courseRefreshCallback={refetch}
        navigation={navigation}
      />
    );
  } else {
    return <Loading />;
  }
};

type CourseDetailsContentProps = {
  courseDetails: CourseContentDetails;
  courseRefreshCallback: () => {};
  pullToRefresh: () => void;
  navigation: any;
  loading: boolean;
};

const CourseDetailsContent = ({
  courseDetails,
  courseRefreshCallback,
  pullToRefresh,
  navigation,
  loading
}: CourseDetailsContentProps) => {
  const expanableSections =
    courseDetails?.course?.sections.filter(section => section.available && !isEmpty(section.data)) || [];
  const expanableSectionIds = Array.from(expanableSections, section => section.id);
  const isSingleActivity = courseDetails?.course?.format === CourseFormat.singleActivity;

  const [showOverview, setShowOverview] = useState(true);
  const [showCompletionModal, setShowCompletionModal] = useState(true);
  const [expandedSectionIds, setExpandedSectionIds] = useState<number[]>(isSingleActivity ? expanableSectionIds : []);

  const isExpandedAll = !isEmpty(expanableSectionIds) && isEqual(expanableSectionIds.sort(), expandedSectionIds.sort());

  const onClose = () => {
    setShowCompletionModal(!showCompletionModal);
    courseRefreshCallback();
    navigation.goBack();
  };

  const onSwitchTab = () => {
    setShowOverview(!showOverview);
  };

  const onChangeExpand = (isExpanded: boolean, sectionIds: number[]) => {
    if (isExpanded) {
      setExpandedSectionIds([]);
    } else {
      setExpandedSectionIds(sectionIds);
    }
  };

  return (
    <LearningDetails
      onPullToRefresh={pullToRefresh}
      loading={loading}
      item={courseDetails.course}
      itemType={learningItemEnum.Course}
      tabBarLeftTitle={translate("course.course_details.overview")}
      tabBarRightTitle={translate("course.course_details.activities")}
      onPress={onSwitchTab}
      overviewIsShown={showOverview}
      image={courseDetails.imageSrc}
      badgeTitle={translate("learning_items.course")}
      navigation={navigation}>
      <View style={[styles.container, { backgroundColor: TotaraTheme.colorNeutral2 }]}>
        <View style={[styles.activitiesContainer, { backgroundColor: TotaraTheme.colorNeutral1 }]}>
          {!showOverview ? (
            <View
              style={{
                backgroundColor: TotaraTheme.colorAccent
              }}>
              {!isSingleActivity && (
                <View style={courseDetailsStyle.expandContentWrap}>
                  <Text style={courseDetailsStyle.expandTextWrap}>
                    {translate("course.course_details.expand_or_collapse")}
                  </Text>
                  <Switch
                    style={[{ borderColor: TotaraTheme.colorNeutral5 }]}
                    value={isExpandedAll}
                    onValueChange={() => onChangeExpand(isExpandedAll, expanableSectionIds)}
                    accessibilityLabel={translate("course.course_details.accessibility_expand_all")}
                  />
                </View>
              )}
              <Activities
                sections={courseDetails.course.sections}
                courseRefreshCallBack={courseRefreshCallback}
                expandedSectionIds={expandedSectionIds}
                onSetExpandedSectionIds={setExpandedSectionIds}
                completionEnabled={courseDetails.course.completionEnabled}
                isSingleActivity={isSingleActivity}
              />
            </View>
          ) : (
            <OverviewDetails
              isCourseSet={false}
              id={courseDetails.course.id}
              criteria={courseDetails.course.criteria}
              summary={courseDetails.course.summary}
              summaryFormat={courseDetails.course.summaryformat as DescriptionFormat}
              gradeFinal={courseDetails.gradeFinal}
              progress={courseDetails.course.completion.progress}
              summaryTypeTitle={translate("course.course_overview.course_summary")}
              onclickContinueLearning={onClose}
              courseRefreshCallback={courseRefreshCallback}
              showGrades={courseDetails.course.showGrades}
              completionEnabled={courseDetails.course.completionEnabled}
            />
          )}
        </View>
      </View>
      {courseDetails.course.completion && courseDetails.course.completion.statuskey === StatusKey.complete && (
        <CourseCompletionModal onClose={onClose} />
      )}
    </LearningDetails>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  activitiesContainer: {
    flex: 3,
    padding: 0
  }
});

export default CourseDetails;
