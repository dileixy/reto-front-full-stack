import React, { useState } from 'react';
import { View, TextInput, Text, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/authSlice';
import { RootState } from '../store/store';
import { globalStyles } from '../styles/globalStyles';
import { TYPOGRAPHY } from '../styles/typography';
import Button from '../components/atoms/Button/Button';

const SignUpScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa tu email y contraseña.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Por favor, ingresa un email válido.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const resultAction = await dispatch(register({ email, password }) as any);
    
    if (register.fulfilled.match(resultAction)) {
      Alert.alert(
        'Registro exitoso',
        'Por favor, revisa tu correo electrónico para confirmar tu cuenta antes de iniciar sesión.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={TYPOGRAPHY.title}>Registro</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error && <Text style={globalStyles.error}>{error}</Text>}

      <Button title={loading ? 'Registrando...' : 'Registrarse'} onPress={handleRegister} disabled={loading} />
      <Button title="Ya tengo cuenta" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default SignUpScreen;
