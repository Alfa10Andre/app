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

import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import * as Animatable from "react-native-animatable";

import { ThemeContext } from "@totara/theme";

type Props = {
  message: string;
  isShow: boolean;
};

const FormError = ({ message, isShow }: Props) => {
  const theme = useContext(ThemeContext);
  const [animationType, setAnimationType] = useState();

  useEffect(() => {
    if (animationType !== undefined || isShow) {
      setAnimationType(isShow ? "fadeInDown" : "fadeOutUp");
    }
  }, [isShow]);

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      padding: 8,
      backgroundColor: theme.colorAlert,
      opacity: 0
    }
  });

  return (
    <Animatable.View animation={animationType} duration={500} style={styles.container}>
      <Text style={[theme.textSmall, { color: theme.textColorLight }]}>{message}</Text>
    </Animatable.View>
  );
};

export default FormError;
