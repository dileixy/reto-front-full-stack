import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../store/hooks';
import { registerHabit } from '../../store/habitsSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type CreateHabitScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateHabit'>;

export const useCreateHabitScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<CreateHabitScreenNavigationProp>();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('Diario');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation
  const validateForm = (): boolean => {
    if (!name.trim()) {
      Alert.alert('Error', 'Por favor ingresa el nombre del hábito.');
      return false;
    }

    if (name.trim().length < 3) {
      Alert.alert('Error', 'El nombre del hábito debe tener al menos 3 caracteres.');
      return false;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Por favor ingresa una descripción.');
      return false;
    }

    if (description.trim().length < 10) {
      Alert.alert('Error', 'La descripción debe tener al menos 10 caracteres.');
      return false;
    }

    if (!frequency.trim()) {
      Alert.alert('Error', 'Por favor selecciona una frecuencia.');
      return false;
    }

    return true;
  };

  // Handlers
  const handleCreateHabit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const habitData = {
        name: name.trim(),
        description: description.trim(),
        frequency: frequency.trim(),
      };

      await dispatch(registerHabit(habitData));
      
      Alert.alert(
        'Éxito',
        'Hábito creado correctamente',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el hábito. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (name.trim() || description.trim()) {
      Alert.alert(
        'Confirmar',
        '¿Seguro que quieres cancelar? Se perderán los cambios.',
        [
          { text: 'No', style: 'cancel' },
          { text: 'Sí', onPress: () => navigation.goBack() }
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  const handleFrequencyChange = (text: string) => {
    setFrequency(text);
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setFrequency('Diario');
  };

  return {
    // State
    name,
    description,
    frequency,
    isSubmitting,
    
    // Handlers
    handleCreateHabit,
    handleCancel,
    handleNameChange,
    handleDescriptionChange,
    handleFrequencyChange,
    resetForm,
  };
};
