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
import { translate } from "@totara/locale";
import { PrimaryButton, InfoModal } from "@totara/components";
import { Images } from "@resources/images";
import { ImageSourcePropType } from "react-native";

type CourseCompletionProps = {
  onClose: () => void;
};

const CourseCompletionModal = ({ onClose }: CourseCompletionProps) => {
  return (
    <InfoModal
      title={translate("course.course_complete.title")}
      description={translate("course.course_complete.description")}
      imageSource={Images.courseComplete as ImageSourcePropType}
      visible>
      <PrimaryButton text={translate("course.course_complete.button_title")} onPress={onClose} />
    </InfoModal>
  );
};

export default CourseCompletionModal;
