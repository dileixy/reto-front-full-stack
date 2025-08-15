import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Habit } from '../../types/index';
import { habitCardStyles, COLORS } from '../../styles';
import { CheckCircle, Flame } from 'lucide-react-native';
import FrequencyBadge from '../atoms/FrequencyBadge/FrequencyBadge';
import { calculateStreak } from '../../utils/frequencyUtils';
import { SPACING } from '../../styles/spacing';
import { TYPOGRAPHY } from '../../styles/typography';

interface HabitCardCompactProps {
  habit: Habit;
  onComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const HabitCardCompact: React.FC<HabitCardCompactProps> = ({ habit, onComplete, onEdit, onDelete }) => {
  const streak = calculateStreak(habit.frequency, habit.completedDates);
  
  return (
    <View style={habitCardStyles.container}>
      <View style={styles.card}>
        
        {/* Fila superior: título + badge de frecuencia */}
        <View style={styles.topRow}>
          <Text style={styles.title}>{habit.name}</Text>
          <FrequencyBadge frequency={habit.frequency} size="small" />
        </View>

        {/* Fila inferior: descripción + racha + completado */}
        <View style={styles.bottomRow}>
          <Text style={styles.description}>{habit.description}</Text>
          
          <View style={styles.actionsRow}>
            {/* Indicador de racha */}
            {streak > 0 && (
              <View style={styles.streakContainer}>
                <Flame size={16} color={COLORS.orange} />
                <Text style={styles.streakText}>{streak}</Text>
              </View>
            )}
            
            {/* Botón de completado */}
            <TouchableOpacity onPress={() => onComplete(habit.id)} style={styles.completeButton}>
              <CheckCircle size={28} color={habit.isCompleted ? COLORS.secondary : COLORS.gray} />
            </TouchableOpacity>
          </View>
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.small,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    flex: 1,
    marginRight: SPACING.small,
  },
  description: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text,
    flex: 1,
    marginRight: SPACING.small,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.small,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.orange + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 2,
  },
  streakText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.orange,
  },
  completeButton: {
    padding: 2,
  },
});

export default HabitCardCompact;
