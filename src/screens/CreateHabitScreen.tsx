import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../store/hooks';
import { registerHabit } from '../store/habitsSlice';
import { globalStyles } from '../styles/globalStyles';
import HabitForm from '../components/molecules/HabitForm';

const CreateHabitScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleRegisterHabit = (habit: { name: string; description: string; frequency: string }) => {
    dispatch(registerHabit(habit));
    navigation.goBack();
  };

  return (
    <View style={globalStyles.container}>
      <HabitForm onSubmit={handleRegisterHabit} />
    </View>
  );
};

export default CreateHabitScreen;
