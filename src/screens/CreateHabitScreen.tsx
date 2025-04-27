// CreateHabitScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../store/hooks';
import { registerHabit } from '../store/habitsSlice';

const CreateHabitScreen =  ()  => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();  // Para navegación
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('Diario');

  const handleRegisterHabit = () => {
    if (!name || !description) {
      Alert.alert('Error', 'Por favor ingresa todos los campos');
      return;
    }
    
    const habit = { name, description, frequency };
    dispatch(registerHabit(habit));
    navigation.goBack(); // Vuelve a la pantalla de inicio (Home)
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Registrar Nuevo Hábito</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Nombre del Hábito"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        placeholder="Frecuencia"
        value={frequency}
        onChangeText={setFrequency}
      />
      <Button title="Registrar Hábito" onPress={handleRegisterHabit} />
    </View>
  );
};

export default CreateHabitScreen;
