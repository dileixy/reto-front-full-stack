import React from 'react';
import { View, FlatList } from 'react-native';
import { Habit } from '../../types';
import HabitCard from '../molecules/HabitCard';
import { homeScreenStyles } from '../../styles';

interface HabitsListProps {
  habits: Habit[];
  onComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const HabitsList: React.FC<HabitsListProps> = ({
  habits,
  onComplete,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={homeScreenStyles.listContainer}>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HabitCard
            habit={item}
            onComplete={onComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
        contentContainerStyle={homeScreenStyles.listContentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HabitsList;
