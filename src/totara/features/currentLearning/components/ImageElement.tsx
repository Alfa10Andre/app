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

import { ImageStyle, StyleSheet, View, ViewStyle } from "react-native";
import { ImageWrapper } from "@totara/components";
import DefaultImage from "@totara/features/currentLearning/components/DefaultImage";
import React from "react";
import { borderRadius } from "@totara/theme/constants";

interface ImageElementProps {
  imageStyle?: ImageStyle;
  cardStyle?: ViewStyle;
  children?: JSX.Element;
  image?: string;
  itemType?: string;
}

const ImageElement = ({ imageStyle, image, itemType }: ImageElementProps) => {
  const imageStyleSheet = StyleSheet.flatten([styles.itemImage, imageStyle]);
  return (
    <View style={[imageStyleSheet]}>
      {image && image.length > 0 ? (
        <ImageWrapper url={image} style={[styles.imageWrap]} />
      ) : (
        <DefaultImage itemType={itemType} style={[styles.imageWrap]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemImage: {
    flex: 1,
    flexDirection: "column-reverse",
    borderRadius: borderRadius.borderRadiusM
  },
  imageWrap: {
    flex: 1
  }
});

export default ImageElement;
