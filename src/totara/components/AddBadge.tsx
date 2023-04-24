/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2019 onwards Totara Learning Solutions LTD
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

import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
// @ts-ignore no types published yet for fortawesome react-native, they do have it react so check in future and remove this ignore
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { Status } from "@totara/types";
import ProgressCircle from "./ProgressCircle";
import { ThemeContext } from "@totara/theme";
import { iconSizes } from "@totara/theme/constants";

type Props = {
  size: number;
  offsetSize: number;
  status?: Status | number;
};

type ProgressProps = {
  size?: number;
  progress: number;
};
type IconBadgeProps = {
  size: number;
  color: string;
};

const AddBadge = ({
  status,
  children,
  size = iconSizes.sizeS,
  offsetSize = 8,
  ...otherProps
}: {
  status: Status | number;
  children?: JSX.Element;
  size: number;
  offsetSize?: number;
}) => {
  return (
    <View>
      {children}
      <RightBadge status={status} size={size} offsetSize={offsetSize} {...otherProps} />
    </View>
  );
};

const RightBadge = ({ status, size, offsetSize }: Props) => {
  const theme = useContext(ThemeContext);
  const getContainerStyle = (size: number, offsetSize: number, backgroundColor: string, borderColor: string) => {
    return StyleSheet.create({
      container: {
        top: -1 * offsetSize,
        right: -1 * offsetSize,
        position: "absolute",
        backgroundColor: backgroundColor,
        borderRadius: size * 2,
        borderWidth: size / 8,
        borderColor: borderColor,
        width: size * 2,
        height: size * 2,
        justifyContent: "center",
        alignItems: "center"
      }
    });
  };
  switch (status) {
    case Status.done: {
      const viewStyle = getContainerStyle(size, offsetSize, theme.colorSuccess, theme.colorNeutral1);
      return (
        <View style={viewStyle.container}>
          <CheckBadge size={size} color={theme.textColorLight} />
        </View>
      );
    }
    case 100: {
      const viewStyle = getContainerStyle(size, offsetSize, theme.colorSuccess, theme.colorNeutral1);
      return (
        <View style={viewStyle.container}>
          <CheckBadge size={size} color={theme.textColorLight} />
        </View>
      );
    }
    case Status.hidden: {
      const viewStyle = getContainerStyle(size, offsetSize, "#999999", theme.colorNeutral1);
      return (
        <View style={viewStyle.container}>
          <LockBadge size={size} color={theme.textColorLight} />
        </View>
      );
    }
    case Status.active: {
      // drop through default
      return null;
    }
    default: {
      if (typeof status == "number") {
        const viewStyle = getContainerStyle(size, offsetSize, theme.colorNeutral1, theme.colorNeutral1);
        return (
          <View style={viewStyle.container}>
            <ProgressBadge size={size} progress={status} />
          </View>
        );
      }
      return null;
    }
  }
};

const CheckBadge = ({ size, color }: IconBadgeProps) => <FontAwesomeIcon icon={"check"} color={color} size={size} />;

const LockBadge = ({ size, color }: IconBadgeProps) => <FontAwesomeIcon icon={"lock"} color={color} size={size} />;

const ProgressBadge = ({ size, progress }: ProgressProps) => (
  <ProgressCircle size={size ? size * 2 : 32} progress={progress} />
);

export { AddBadge, CheckBadge, LockBadge, ProgressBadge };
