import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { RootState } from '../store/store';
import Button from '../components/atoms/Button/Button';
import { globalStyles } from '../styles/globalStyles';
import { TYPOGRAPHY } from '../styles/typography';

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { loading, error, isLoggedIn } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa tu email y contraseña.');
      return;
    }
    dispatch(login({ email, password }) as any);
  };

  // Navegar al Home si el usuario se loguea con éxito
  if (isLoggedIn) {
    navigation.navigate('Home');
  }

  return (
    <View style={globalStyles.container}>
      <Text style={TYPOGRAPHY.title}>Login</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error && <Text style={globalStyles.error}>{error}</Text>}

      <Button title={loading ? 'Ingresando...' : 'Ingresar'} onPress={handleLogin} disabled={loading} />
      <Button title="Registrarse" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

export default LoginScreen;
