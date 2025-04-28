// src/components/atoms/Button/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';
import { styles } from './styles'; // Estilos que tú ya tenías

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  style?: StyleProp<ViewStyle>;
}

const Button = ({ title, style, disabled, ...props }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
