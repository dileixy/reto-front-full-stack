import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../styles/colors';
import { SPACING } from '../../../styles/spacing';
import { SHADOWS } from '../../../styles/shadows';

interface CircularBackButtonProps {
  onPress: () => void;
  color?: string;
}

const CircularBackButton: React.FC<CircularBackButtonProps> = ({ 
  onPress, 
  color = COLORS.primary 
}) => {
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: color }]} onPress={onPress}>
      <View style={styles.arrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderRightWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: COLORS.white,
    marginLeft: -2, // Para centrar visualmente la flecha
  },
});

export default CircularBackButton;
