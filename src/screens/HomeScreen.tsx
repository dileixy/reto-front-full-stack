import React from 'react';
import { View, Text } from 'react-native';
import { useHomeScreen } from '../presentation/hooks/useHomeScreen';
import { HomeHeader, HabitsList } from '../components/organisms';
import { homeScreenStyles } from '../styles';

const HomeScreen = () => {
  const {
    habitsList,
    error,
    handleCompleteHabit,
    handleGoToCreateHabit,
    handleEditHabit,
    handleDeleteHabit,
    confirmLogout,
  } = useHomeScreen();

  if (error) {
    return <Text style={homeScreenStyles.errorText}>{error}</Text>;
  }

  return (
    <View style={homeScreenStyles.container}>
      <HomeHeader 
        onLogout={confirmLogout} 
        onCreateHabit={handleGoToCreateHabit} 
      />
      
      <HabitsList
        habits={habitsList}
        onComplete={handleCompleteHabit}
        onEdit={handleEditHabit}
        onDelete={handleDeleteHabit}
      />
    </View>
  );
};

export default HomeScreen;