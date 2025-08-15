import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { register } from '../../store/authSlice';
import { RootState } from '../../store/store';
import { globalStyles } from '../../styles/globalStyles';
import Button from '../atoms/Button/Button';
import FormInput from '../atoms/FormInput/FormInput';
import { useAppDispatch } from '../../store/hooks';
import { formStyles } from '../../styles/formStyles';
import { formButtonStyles } from '../../styles/formButtonStyles';

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
        [{ text: 'OK', onPress: () => navigation.navigate('Login' as never) }]
      );
    }
  };

  return (
    <View style={formStyles.container}>
      <Text style={globalStyles.title}>Registro</Text>

      <FormInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <FormInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error && <Text style={globalStyles.error}>{error}</Text>}

      <Button
        title={loading ? 'Registrando...' : 'Registrarse'}
        onPress={handleRegister}
        disabled={loading}
        style={formButtonStyles.button}
      />
      <Button
        title="Ya tengo cuenta"
        onPress={() => navigation.navigate('Login' as never)}
        style={formButtonStyles.button}
      />
    </View>
  );
};

export default SignUpForm;
