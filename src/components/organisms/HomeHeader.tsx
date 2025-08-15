import React from 'react';
import { View, Text } from 'react-native';
import UserButton from '../atoms/UserButton/UserButton';
import { FloatingActionButton } from '../atoms/Button/Button';
import { homeScreenStyles } from '../../styles';

interface HomeHeaderProps {
  onLogout: () => void;
  onCreateHabit: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ onLogout, onCreateHabit }) => {
  return (
    <>
      {/* Header con botón de usuario */}
      <View style={homeScreenStyles.header}>
        <UserButton onPress={onLogout} />
      </View>

      {/* Título centrado */}
      <View style={homeScreenStyles.titleContainer}>
        <Text style={homeScreenStyles.title}>Mis Hábitos</Text>
      </View>

      {/* Botón flotante de crear hábito */}
      <FloatingActionButton onPress={onCreateHabit} />
    </>
  );
};

export default HomeHeader;
