// src/components/atoms/Button/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import { buttonStyles } from '../../../styles'; // Estilos centralizados

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  style?: StyleProp<ViewStyle>;
}

const Button = ({ title, style, disabled, testID, ...props }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      testID={testID}
      style={[
        buttonStyles.button,
        disabled && buttonStyles.buttonDisabled,
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text style={buttonStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// FloatingActionButton Component
interface FloatingActionButtonProps {
  onPress: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={buttonStyles.floating} onPress={onPress}>
      <PlusCircleIcon size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

export default Button;
