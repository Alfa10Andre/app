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
import { TouchableOpacity, Modal, View } from "react-native";
import { ImageWrapper } from "@totara/components";
import { translate } from "@totara/locale";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { iconSizes } from "@totara/theme/constants";
import { TotaraTheme } from "@totara/theme/Theme";
import styles from "./wekaStyle";

const ModalView = ({ children, onRequestClose }: any) => {
  return (
    <Modal animationType={"slide"} transparent={false}>
      <View style={styles.closeButtonWrap}>
        <TouchableOpacity style={styles.closeButtonTouchableOpacity} onPress={onRequestClose}>
          <FontAwesomeIcon icon="times" size={iconSizes.sizeM} color={TotaraTheme.colorNeutral5} />
        </TouchableOpacity>
      </View>
      {children}
    </Modal>
  );
};

type ImageViewProps = {
  fileName: string;
  url: string;
};

const ImageViewerWrapper = ({ fileName, url }: ImageViewProps) => {
  const [visible, setIsVisible] = useState(false);
  const onRequestClose = () => setIsVisible(!visible);
  return (
    <TouchableOpacity style={styles.imageContainerWrapper} onPress={onRequestClose} key={`index_${fileName}`}>
      <ImageWrapper
        url={url}
        style={styles.imageContainer}
        resizeMode="contain"
        accessibilityLabel={translate("course.activity.accessibility_image")}
      />
      {visible && (
        <ModalView onRequestClose={onRequestClose}>
          <ImageWrapper
            url={url}
            style={{ height: "80%", resizeMode: "contain" }}
            accessibilityLabel={translate("course.activity.accessibility_image_zoom")}
          />
        </ModalView>
      )}
    </TouchableOpacity>
  );
};

export default ImageViewerWrapper;
