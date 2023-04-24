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

import React, { ReactNode } from "react";
import { translate } from "@totara/locale";
import { PrimaryButton, InfoModal, TertiaryButton } from "@totara/components";
import { Images } from "@resources/images";
import { ImageSourcePropType } from "react-native";

type Props = {
  onClose: () => void;
  onClickAsComplete: () => void;
  children: ReactNode;
};

const SelfCompletion = ({ onClose, onClickAsComplete, children }: Props) => {
  return (
    <InfoModal
      title={translate("course.course_complete_confirmation.title")}
      description={translate("course.course_complete_confirmation.description")}
      imageSource={Images.selfCompletion as ImageSourcePropType}
      visible>
      <PrimaryButton
        text={translate("course.course_complete_confirmation.primary_button_title")}
        onPress={onClickAsComplete}
      />

      <TertiaryButton text={translate("course.course_complete_confirmation.tertiary_button_title")} onPress={onClose} />
      {children}
    </InfoModal>
  );
};

export default SelfCompletion;
