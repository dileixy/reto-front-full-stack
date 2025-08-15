import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { deleteHabit, fetchHabits, toggleHabitCompletion } from '../../store/habitsSlice';
import { logout } from '../../store/authSlice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const useHomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { habitsList, error } = useAppSelector((state) => state.habits);
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  // Effects
  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  }, [isLoggedIn, navigation]);

  // Handlers
  const handleCompleteHabit = (id: string) => {
    dispatch(toggleHabitCompletion(id));
  };

  const handleGoToCreateHabit = () => {
    navigation.navigate('CreateHabit');
  };

  const handleEditHabit = (id: string) => {
    console.log(`Editar hábito: ${id}`);
  };

  const handleDeleteHabit = (id: string) => {
    console.log(`Eliminar hábito: ${id}`);
    dispatch(deleteHabit(id));
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

  return {
    habitsList,
    error,
    handleCompleteHabit,
    handleGoToCreateHabit,
    handleEditHabit,
    handleDeleteHabit,
    confirmLogout,
  };
};
