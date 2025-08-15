import React, { useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import HabitCard from '../components/molecules/HabitCard';
import { deleteHabit, fetchHabits, toggleHabitCompletion } from '../store/habitsSlice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { FloatingActionButton } from '../components/atoms/Button/Button';
import UserButton from '../components/atoms/UserButton/UserButton';
import { logout } from '../store/authSlice';
import { homeScreenStyles } from '../styles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { habitsList, error } = useAppSelector((state) => state.habits);
  const { isLoggedIn } = useAppSelector((state) => state.auth); 

  // Cargar hábitos al montar el componente
  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  // resetea las rutas y solo permite login
  useEffect(() => {
    if (!isLoggedIn) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login'}],
      });
    }
  }, [isLoggedIn, navigation]);

  // Función para manejar la finalización de un hábito
  const handleCompleteHabit = (id: string) => {
    dispatch(toggleHabitCompletion(id));
  };

  // Navegar a la pantalla de creación de hábito
  const handleGoToCreateHabit = () => {
    navigation.navigate('CreateHabit');  // Navega a la pantalla de creación de hábito
  };

  const handleEditHabit = (id: string) => {
    // Aquí se podría abrir un formulario o navegar a una pantalla de edición
    console.log(`Editar hábito: ${id}`);
  };

  const handleDeleteHabit = (id: string) => {
    console.log(`Eliminar hábito: ${id}`);
    dispatch(deleteHabit(id)); // Acción para eliminar el hábito
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const confirmLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Seguro que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar sesión', onPress: handleLogout, style: 'destructive' }
      ]
    );
  };

  if (error) {
    return <Text style={homeScreenStyles.errorText}>{error}</Text>;
  }

  return (
    <View style={homeScreenStyles.container}>
      {/* Header con botón de usuario en la esquina superior izquierda */}
      <View style={homeScreenStyles.header}>
        <UserButton onPress={confirmLogout} />
      </View>

      {/* Título centrado */}
      <View style={homeScreenStyles.titleContainer}>
        <Text style={homeScreenStyles.title}>Mis Hábitos</Text>
      </View>

      {/* Botón circular de crear hábito - ahora posicionado absolutamente */}
      <FloatingActionButton onPress={handleGoToCreateHabit} />

      {/* Lista de hábitos */}
      <View style={homeScreenStyles.listContainer}>
        <FlatList
          data={habitsList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HabitCard
              habit={item}
              onComplete={handleCompleteHabit}
              onEdit={handleEditHabit}
              onDelete={handleDeleteHabit}
            />
          )}
          contentContainerStyle={homeScreenStyles.listContentContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default HomeScreen;