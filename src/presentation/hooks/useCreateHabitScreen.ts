import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../store/hooks';
import { registerHabit } from '../../store/habitsSlice';
import { useModal } from '../../context/ModalContext';
import { getCustomErrorMessage } from '../../utils/errorMessages';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { HabitFrequency } from '../../types/frequency';

type CreateHabitScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateHabit'>;

export const useCreateHabitScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<CreateHabitScreenNavigationProp>();
  const { showError, showSuccess, showConfirm } = useModal();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<HabitFrequency>(HabitFrequency.DAILY);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation
  const validateForm = (): boolean => {
    if (!name.trim()) {
      showError('Por favor ingresa el nombre del hábito.');
      return false;
    }

    if (name.trim().length < 3) {
      showError('El nombre del hábito debe tener al menos 3 caracteres.');
      return false;
    }

    if (!description.trim()) {
      showError('Por favor ingresa una descripción.');
      return false;
    }

    if (description.trim().length < 5) {
      showError('La descripción debe tener al menos 5 caracteres.');
      return false;
    }

    if (description.trim().length > 80) {
      showError('La descripción no puede exceder 80 caracteres.');
      return false;
    }

    if (!frequency) {
      showError('Por favor selecciona una frecuencia.');
      return false;
    }

    return true;
  };

  // Handlers
  const handleCreateHabit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const habitRequest = {
        name: name.trim(),
        description: description.trim(),
        frequency,
      };

      await dispatch(registerHabit(habitRequest)).unwrap();
      
      showSuccess(
        'Hábito creado correctamente',
        () => navigation.goBack()
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      const customMessage = getCustomErrorMessage(errorMessage);
      showError(customMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (name.trim() || description.trim()) {
      showConfirm(
        'Confirmar',
        '¿Seguro que quieres cancelar? Se perderán los cambios.',
        () => navigation.goBack(),
        () => {} // No hacer nada si cancela
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

  const handleFrequencyChange = (frequency: HabitFrequency) => {
    setFrequency(frequency);
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setFrequency(HabitFrequency.DAILY);
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
