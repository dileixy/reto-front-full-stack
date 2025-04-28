import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Habit } from '../../types/index';
import { habitCardStyles } from '../../styles/habitCard';
import { CheckCircle, Edit2, Trash2 } from 'lucide-react-native';
import { COLORS } from '../../styles/colors';

interface HabitCardProps {
  habit: Habit;
  onComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onComplete, onEdit, onDelete }) => {
  return (
    <View style={habitCardStyles.container}>
      <View style={habitCardStyles.card}>
        
        {/* Primera fila: título + iconos */}
        <View style={habitCardStyles.topRow}>
          <Text style={habitCardStyles.title}>{habit.name}</Text>
          <View style={habitCardStyles.iconRow}>
            <TouchableOpacity onPress={() => onComplete(habit.id)} style={habitCardStyles.iconButton}>
              <CheckCircle size={30} color={habit.completed ? COLORS.secondary : COLORS.gray} />
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={() => onEdit(habit.id)} style={habitCardStyles.iconButton}>
              <Edit2 size={20} color={COLORS.primary} />
            </TouchableOpacity>*/}
            {/*<TouchableOpacity onPress={() => onDelete(habit.id)} style={habitCardStyles.iconButton}>
              <Trash2 size={20} color={COLORS.orange} />
            </TouchableOpacity>*/}
          </View>
        </View>

        {/* Segunda fila: descripción */}
        <Text style={habitCardStyles.description}>{habit.description}</Text>

      </View>
    </View>
  );
};

export default HabitCard;