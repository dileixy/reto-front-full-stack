import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Habit } from '../../types/index';
import { habitCardStyles, COLORS } from '../../styles';
import { CheckCircle } from 'lucide-react-native';
import { FREQUENCY_ICONS, FREQUENCY_COLORS } from '../../types/frequency';
import { SPACING } from '../../styles/spacing';
import { TYPOGRAPHY } from '../../styles/typography';

interface HabitCardWithIconProps {
  habit: Habit;
  onComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const HabitCardWithIcon: React.FC<HabitCardWithIconProps> = ({ habit, onComplete, onEdit, onDelete }) => {
  return (
    <View style={habitCardStyles.container}>
      <View style={styles.card}>
        
        {/* Layout horizontal: Ícono de frecuencia | Contenido | Ícono completado */}
        <View style={styles.mainRow}>
          
          {/* Ícono grande de frecuencia */}
          <View style={[styles.frequencyIcon, { backgroundColor: FREQUENCY_COLORS[habit.frequency] + '20' }]}>
            <Text style={styles.frequencyEmoji}>{FREQUENCY_ICONS[habit.frequency]}</Text>
          </View>

          {/* Contenido central */}
          <View style={styles.contentSection}>
            <Text style={styles.title}>{habit.name}</Text>
            <Text style={styles.frequency}>{habit.frequency}</Text>
            <Text style={styles.description}>{habit.description}</Text>
          </View>

          {/* Ícono de completado */}
          <TouchableOpacity onPress={() => onComplete(habit.id)} style={styles.completeButton}>
            <CheckCircle size={32} color={habit.isCompleted ? COLORS.secondary : COLORS.gray} />
          </TouchableOpacity>

        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.medium,
    borderRadius: 16,
    marginBottom: SPACING.small,
    width: '100%',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.medium,
  },
  frequencyIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frequencyEmoji: {
    fontSize: 24,
  },
  contentSection: {
    flex: 1,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    marginBottom: 2,
  },
  frequency: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.gray,
    marginBottom: 4,
  },
  description: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text,
    lineHeight: TYPOGRAPHY.sizes.sm * 1.3,
  },
  completeButton: {
    padding: SPACING.small,
  },
});

export default HabitCardWithIcon;
