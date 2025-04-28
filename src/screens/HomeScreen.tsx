import React, { useEffect } from 'react';
import { View, Text, FlatList, BackHandler, TouchableOpacity, Alert } from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { globalStyles } from '../styles/globalStyles';
import HabitCard from '../components/molecules/HabitCard';
import { deleteHabit, fetchHabits, toggleHabitCompletion } from '../store/habitsSlice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../styles/colors';
import Button from '../components/atoms/Button/Button';
import { logout } from '../store/authSlice';
import { SPACING } from '../styles/spacing';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    return <Text style={{ color: COLORS.red }}>{error}</Text>;
  }

  return (
    <View style={globalStyles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: SPACING.small }}>
        <TouchableOpacity onPress={confirmLogout}>
          <Icon name="person" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'flex-end', marginBottom: 10 }}>
        <Button title="Cerrar sesión" onPress={handleLogout} />
      </View>

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
        contentContainerStyle={{ paddingHorizontal: SPACING.small }}
      />
    </View>
  );
};

export default HomeScreen;