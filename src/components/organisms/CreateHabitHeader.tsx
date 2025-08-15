import React from 'react';
import { View, Text } from 'react-native';
import CircularBackButton from '../atoms/CircularBackButton';
import { createHabitScreenStyles } from '../../styles';
import { COLORS } from '../../styles/colors';

interface CreateHabitHeaderProps {
  onCancel: () => void;
}

const CreateHabitHeader: React.FC<CreateHabitHeaderProps> = ({ onCancel }) => {
  return (
    <View style={createHabitScreenStyles.headerContainer}>
      <View style={createHabitScreenStyles.backButtonContainer}>
        <CircularBackButton 
          onPress={onCancel} 
          color={COLORS.secondary} 
        />
      </View>
      
      <View style={createHabitScreenStyles.titleContainer}>
        <Text style={createHabitScreenStyles.title}>Nuevo Hábito</Text>
      </View>
    </View>
  );
};

export default CreateHabitHeader;
