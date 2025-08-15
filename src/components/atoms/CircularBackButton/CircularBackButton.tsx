import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { COLORS } from '../../../styles/colors';

interface CircularBackButtonProps {
  onPress: () => void;
  color?: string;
  iconColor?: string;
  size?: number;
}

const CircularBackButton: React.FC<CircularBackButtonProps> = ({ 
  onPress, 
  color = COLORS.primary,
  iconColor = COLORS.white,
  size = 40
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { 
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: size / 2
        }
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <ArrowLeft 
        size={size * 0.6} 
        color={iconColor} 
        strokeWidth={2}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircularBackButton;
