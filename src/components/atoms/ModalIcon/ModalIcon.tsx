import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon } from 'react-native-heroicons/outline';
import { COLORS } from '../../../styles/colors';
import { SPACING } from '../../../styles/spacing';

interface ModalIconProps {
  type: 'error' | 'success' | 'warning' | 'info';
}

const ModalIcon: React.FC<ModalIconProps> = ({ type }) => {
  const getIconComponent = () => {
    const iconSize = 32;
    
    switch (type) {
      case 'error':
      case 'warning':
        return <ExclamationTriangleIcon size={iconSize} color={COLORS.orange} />;
      case 'success':
        return <CheckCircleIcon size={iconSize} color={COLORS.secondary} />;
      case 'info':
      default:
        return <InformationCircleIcon size={iconSize} color={COLORS.primary} />;
    }
  };

  return (
    <View style={styles.container}>
      {getIconComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: SPACING.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ModalIcon;
