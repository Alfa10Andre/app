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
import { Button, Text, TextInput } from "react-native";
import PropTypes from "prop-types";

// use react-native button instead on jest, as native-base button
// has issues while on test

const MockButton = ({ onPress, ...rest }) => <Button title={"this is a mock button"} onPress={onPress} {...rest} />;
const Spinner = () => <Text>mock spinner</Text>;
const Form = ({ children }) => children;
const Content = ({ children }) => children;
const Item = ({ children }) => children;
const Label = ({ children }) => children;
const Input = ({ ...rest }) => <TextInput {...rest} />;
const Footer = ({ children }) => children;
const Container = ({ children }) => children;

MockButton.propTypes = {
  onPress: PropTypes.func
};

export { MockButton as Button, Spinner, Form, Content, Item, Label, Input, Footer, Container };
