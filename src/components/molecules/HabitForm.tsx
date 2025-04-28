// src/components/molecules/HabitForm.tsx
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import FormInput from '../atoms/FormInput/FormInput';
import Button from '../atoms/Button/Button';
import { globalStyles } from '../../styles/globalStyles';
import { SPACING } from '../../styles/spacing';
import { formStyles } from '../../styles/formStyles';

interface HabitFormProps {
  onSubmit: (habit: { name: string; description: string; frequency: string }) => void;
}

const HabitForm: React.FC<HabitFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('Diario');

  const handleSubmit = () => {
    if (!name || !description) {
      Alert.alert('Error', 'Por favor ingresa todos los campos');
      return;
    }
    onSubmit({ name, description, frequency });
  };

  return (
    <View style={formStyles.container}>
      <Text style={globalStyles.title}>Registrar Nuevo Hábito</Text>

      <FormInput
        placeholder="Nombre del Hábito"
        value={name}
        onChangeText={setName}
      />
      <FormInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <FormInput
        placeholder="Frecuencia"
        value={frequency}
        onChangeText={setFrequency}
      />

      <View style={{ marginTop: SPACING.medium }}>
        <Button title="Registrar Hábito" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default HabitForm;
