import { Images } from "@resources/images";
import { ImageWrapper } from "@totara/components";
import { TotaraTheme } from "@totara/theme/Theme";
import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

const { colorNeutral3 } = TotaraTheme;

const imageStyles = StyleSheet.create({
  defaultImage: { borderWidth: 1, borderColor: colorNeutral3, flex: 1, width: '100%', aspectRatio: 2, justifyContent: 'center', alignItems: 'center', resizeMode: 'contain' }
});

export const ImageElement = ({ imageSrc, style }: { imageSrc?: string, style: any }) => {
  const defaultImage = Images.defaultCourses;

  return (
    <View style={style}>
      {imageSrc && imageSrc.length > 0 ? (
        <ImageWrapper url={imageSrc} style={{ width: '100%', flex: 1 }} />
      ) : (
        <View style={imageStyles.defaultImage}>
          <Image source={defaultImage as ImageSourcePropType} resizeMode={"contain"} />
        </View>
      )}
    </View>
  );
};