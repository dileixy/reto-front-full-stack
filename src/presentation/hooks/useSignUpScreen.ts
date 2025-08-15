import { useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { register } from '../../store/authSlice';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../store/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

export const useSignUpScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validation
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = (): boolean => {
    if (!email.trim()) {
      Alert.alert('Error', 'Por favor, ingresa tu email.');
      return false;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Por favor, ingresa un email válido.');
      return false;
    }

    if (!password) {
      Alert.alert('Error', 'Por favor, ingresa una contraseña.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return false;
    }

    if (!confirmPassword) {
      Alert.alert('Error', 'Por favor, confirma tu contraseña.');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return false;
    }

    return true;
  };

  // Handlers
  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const resultAction = await dispatch(register({ email: email.trim(), password }) as any);

      if (register.fulfilled.match(resultAction)) {
        Alert.alert(
          'Registro exitoso',
          'Por favor, revisa tu correo electrónico para confirmar tu cuenta antes de iniciar sesión.',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo completar el registro. Inténtalo de nuevo.');
    }
  };

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  const handleEmailChange = (text: string) => {
    setEmail(text.trim());
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
  };

  return {
    // State
    email,
    password,
    confirmPassword,
    loading,
    error,
    
    // Handlers
    handleRegister,
    handleGoToLogin,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
  };
};
