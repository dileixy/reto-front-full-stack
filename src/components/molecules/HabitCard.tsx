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
        <Text style={habitCardStyles.title}>{habit.name}</Text>
        <Text style={habitCardStyles.description}>{habit.description}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => onComplete(habit.id)}>
            <CheckCircle size={24} color={habit.completed ? 'green' : 'gray'} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => onEdit(habit.id)} style={habitCardStyles.iconButton}>
              <Edit2 size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(habit.id)} style={habitCardStyles.iconButton}>
              <Trash2 size={20} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HabitCard;
