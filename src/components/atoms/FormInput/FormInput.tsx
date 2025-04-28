import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { styles } from './styles';

const FormInput = (props: TextInputProps) => {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#999"
      {...props}
    />
  );
};

export default FormInput;
