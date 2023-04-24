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
import { Modal, ImageSourcePropType } from "react-native";

import ModalContent from "./ModalContent";

type InfoModalProps = {
  title?: string;
  description?: string;
  imageSource: ImageSourcePropType;
  children?: ReactNode;
  visible?: boolean;
  testID?: string;
};

const InfoModal = ({ title, description, imageSource, children, visible = true, testID, ...rest }: InfoModalProps) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible} {...rest}>
      <ModalContent title={title} description={description} imageSource={imageSource} testID={testID}>
        {children}
      </ModalContent>
    </Modal>
  );
};

export default InfoModal;
