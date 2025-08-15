import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Habit } from '../../types/index';
import { habitCardStyles, COLORS } from '../../styles';
import { CheckCircle } from 'lucide-react-native';
import FrequencyBadge from '../atoms/FrequencyBadge/FrequencyBadge';

interface HabitCardVerticalProps {
  habit: Habit;
  onComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const HabitCardVertical: React.FC<HabitCardVerticalProps> = ({ habit, onComplete, onEdit, onDelete }) => {
  return (
    <View style={habitCardStyles.container}>
      <View style={habitCardStyles.card}>
        
        {/* Fila 1: Frecuencia centrada */}
        <View style={{ alignItems: 'center', marginBottom: 8 }}>
          <FrequencyBadge frequency={habit.frequency} size="medium" />
        </View>

        {/* Fila 2: Título */}
        <Text style={[habitCardStyles.title, { textAlign: 'center', marginBottom: 8 }]}>
          {habit.name}
        </Text>

        {/* Fila 3: Descripción */}
        <Text style={[habitCardStyles.description, { textAlign: 'center', marginBottom: 12 }]}>
          {habit.description}
        </Text>

        {/* Fila 4: Ícono de completado centrado */}
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => onComplete(habit.id)} style={habitCardStyles.iconButton}>
            <CheckCircle size={40} color={habit.isCompleted ? COLORS.secondary : COLORS.gray} />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

export default HabitCardVertical;
