import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HabitFrequency, FREQUENCY_ICONS, FREQUENCY_COLORS } from '../../../types/frequency';
import { TYPOGRAPHY } from '../../../styles/typography';
import { SPACING } from '../../../styles/spacing';

interface FrequencyBadgeProps {
  frequency: HabitFrequency;
  size?: 'small' | 'medium';
}

const FrequencyBadge: React.FC<FrequencyBadgeProps> = ({ 
  frequency, 
  size = 'medium' 
}) => {
  const isSmall = size === 'small';
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: FREQUENCY_COLORS[frequency] + '20' }, // 20% opacity
      isSmall && styles.smallContainer
    ]}>
      <Text style={[styles.icon, isSmall && styles.smallIcon]}>
        {FREQUENCY_ICONS[frequency]}
      </Text>
      <Text style={[
        styles.label,
        { color: FREQUENCY_COLORS[frequency] },
        isSmall && styles.smallLabel
      ]}>
        {frequency}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.small,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  smallContainer: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  icon: {
    fontSize: 14,
    marginRight: 4,
  },
  smallIcon: {
    fontSize: 12,
    marginRight: 2,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  smallLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
  },
});

export default FrequencyBadge;
