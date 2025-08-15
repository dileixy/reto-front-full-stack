import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleProp, ViewStyle, Text } from 'react-native';
import { fabStyles } from '../../../styles';

interface FloatingActionButtonProps extends TouchableOpacityProps {
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
}

const FloatingActionButton = ({ 
  iconName = 'add', 
  iconSize = 24, 
  iconColor = '#FFFFFF',
  style,
  disabled,
  testID,
  ...props 
}: FloatingActionButtonProps) => {
  
  // Función para obtener el símbolo correcto
  const getIconSymbol = (name: string) => {
    switch (name) {
      case 'add':
        return '+';
      case 'edit':
        return '✏️';
      case 'delete':
        return '🗑️';
      default:
        return '+';
    }
  };

  return (
    <TouchableOpacity
      testID={testID}
      style={[
        fabStyles.fab,
        disabled && fabStyles.fabDisabled,
        style,
      ]}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={fabStyles.icon}>
        {getIconSymbol(iconName)}
      </Text>
    </TouchableOpacity>
  );
};

export default FloatingActionButton;
