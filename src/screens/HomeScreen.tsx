import React, { useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { globalStyles } from '../styles/globalStyles';
import HabitCard from '../components/molecules/HabitCard';
import { deleteHabit, fetchHabits, toggleHabitCompletion } from '../store/habitsSlice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';  // Importa StackNavigationProp
import { RootStackParamList } from '../navigation/AppNavigator';  // Asegúrate de que la ruta esté correcta
import { COLORS } from '../styles/colors';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeScreenNavigationProp>(); // Para navegación
  const { habitsList, error } = useAppSelector((state) => state.habits);

  // Cargar hábitos al montar el componente
  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

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


  if (error) {
    return <Text style={{ color: COLORS.red }}>{error}</Text>;
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Mis Hábitos</Text>
      <Button title="Crear Hábito" onPress={handleGoToCreateHabit} />
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
      />
    </View>
  );
};

export default HomeScreen;