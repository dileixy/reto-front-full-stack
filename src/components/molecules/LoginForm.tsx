import  React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../store/authSlice';
import { RootState } from '../../store/store';
import Button from '../atoms/Button/Button';
import FormInput from '../atoms/FormInput/FormInput';
import { globalStyles } from '../../styles/globalStyles';
import { useAppDispatch } from '../../store/hooks';
import { formButtonStyles } from '../../styles/formButtonStyles';
import { formStyles } from '../../styles/formStyles';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
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

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Home' as never);
    }
  }, [isLoggedIn, navigation]);

  return (
    <View style={formStyles.container}>

      <FormInput
        placeholder="Email"
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
        testID= "login-button"
        title={loading ? 'Ingresando...' : 'Ingresar'}
        onPress={handleLogin}
        disabled={loading}
        style={formButtonStyles.button}
      />
      <Button
        testID= "register-button"
        title="Registrarse"
        onPress={() => navigation.navigate('SignUp' as never)}
        style={formButtonStyles.button}
      />
    </View>
  );
};

export default LoginForm;
