import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { styles } from './styles';
import { COLORS } from '../../../styles/colors';

const FormInput = (props: TextInputProps) => {
  return (
    <TextInput
      style={[styles.input, props.style]}
      placeholderTextColor={COLORS.placeHolder}
      {...props}
    />
  );
};

export default FormInput;
