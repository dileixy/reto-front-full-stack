import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../store/authSlice';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../store/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export const useLoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { loading, error, isLoggedIn } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Effects
  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Home');
    }
  }, [isLoggedIn, navigation]);

  // Validation
  const validateForm = (): boolean => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa tu email y contraseña.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor, ingresa un email válido.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return false;
    }

    return true;
  };

  // Handlers
  const handleLogin = () => {
    if (!validateForm()) return;
    dispatch(login({ email, password }) as any);
  };

  const handleGoToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleEmailChange = (text: string) => {
    setEmail(text.trim());
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  return {
    // State
    email,
    password,
    loading,
    error,
    
    // Handlers
    handleLogin,
    handleGoToSignUp,
    handleEmailChange,
    handlePasswordChange,
  };
};
