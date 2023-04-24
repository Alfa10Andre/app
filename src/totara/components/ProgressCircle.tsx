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

import React from "react";
import * as Progress from "react-native-progress";
import { TotaraTheme } from "@totara/theme/Theme";

type ProgressCircleParam = {
  progress?: number;
  indeterminate?: boolean;
  size: number;
  progressColor?: string;
  color?: string;
  unfilledColor?: string;
  testID?: string;
};

const ProgressCircle = ({
  size,
  progress = 0,
  progressColor,
  color,
  unfilledColor,
  indeterminate = false,
  testID
}: ProgressCircleParam) => {
  return (
    <Progress.Circle
      testID={testID}
      progress={progress / 100}
      size={size}
      unfilledColor={unfilledColor ? unfilledColor : TotaraTheme.colorNeutral4}
      color={progressColor ? progressColor : TotaraTheme.colorInfo}
      thickness={2}
      borderWidth={0}
      indeterminate={indeterminate}
      formatText={() => progress + "%"}
      showsText={true}
      textStyle={{
        fontSize: TotaraTheme.textXXSmall.fontSize,
        textAlign: "center",
        color: color ? color : TotaraTheme.textColorDark,
        fontWeight: "bold"
      }}
    />
  );
};

export default ProgressCircle;
