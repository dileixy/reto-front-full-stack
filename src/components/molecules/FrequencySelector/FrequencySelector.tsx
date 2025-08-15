import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HabitFrequency, FREQUENCY_OPTIONS, FREQUENCY_COLORS } from '../../../types/frequency';
import { COLORS } from '../../../styles/colors';
import { SPACING } from '../../../styles/spacing';
import { TYPOGRAPHY } from '../../../styles/typography';

interface FrequencySelectorProps {
  selectedFrequency: HabitFrequency;
  onFrequencyChange: (frequency: HabitFrequency) => void;
}

const FrequencySelector: React.FC<FrequencySelectorProps> = ({
  selectedFrequency,
  onFrequencyChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Frecuencia del hábito</Text>
      <View style={styles.optionsContainer}>
        {FREQUENCY_OPTIONS.map((option) => {
          const isSelected = selectedFrequency === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.option,
                isSelected && [styles.selectedOption, { borderColor: FREQUENCY_COLORS[option.value] }]
              ]}
              onPress={() => onFrequencyChange(option.value)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.radioButton,
                isSelected && [styles.selectedRadio, { backgroundColor: FREQUENCY_COLORS[option.value] }]
              ]}>
                {isSelected && <View style={styles.radioInner} />}
              </View>
              <View style={styles.optionText}>
                <Text style={[
                  styles.optionLabel,
                  isSelected && { color: FREQUENCY_COLORS[option.value] }
                ]}>
                  {option.label}
                </Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.medium,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.small,
  },
  optionsContainer: {
    gap: SPACING.small,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.medium,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
  },
  selectedOption: {
    borderWidth: 2,
    backgroundColor: COLORS.background,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.gray,
    marginRight: SPACING.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadio: {
    borderColor: 'transparent',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
  },
  optionText: {
    flex: 1,
  },
  optionLabel: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.text,
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.gray,
  },
});

export default FrequencySelector;
