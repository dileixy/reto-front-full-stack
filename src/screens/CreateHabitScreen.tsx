import React from 'react';
import { View } from 'react-native';
import { useCreateHabitScreen } from '../presentation/hooks/useCreateHabitScreen';
import { CreateHabitHeader, CreateHabitForm } from '../components/organisms';
import { createHabitScreenStyles } from '../styles';

const CreateHabitScreen = () => {
  const {
    name,
    description,
    frequency,
    isSubmitting,
    handleCreateHabit,
    handleCancel,
    handleNameChange,
    handleDescriptionChange,
    handleFrequencyChange,
  } = useCreateHabitScreen();

  return (
    <View style={createHabitScreenStyles.container}>
      <CreateHabitHeader onCancel={handleCancel} />
      
      <CreateHabitForm
        name={name}
        description={description}
        frequency={frequency}
        isSubmitting={isSubmitting}
        onNameChange={handleNameChange}
        onDescriptionChange={handleDescriptionChange}
        onFrequencyChange={handleFrequencyChange}
        onSubmit={handleCreateHabit}
      />
    </View>
  );
};

export default CreateHabitScreen;
