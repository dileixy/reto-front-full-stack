import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../store/authSlice';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../store/hooks';
import { useModal } from '../../context/ModalContext';
import { getCustomErrorMessage } from '../../utils/errorMessages';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export const useLoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { loading, error, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { showError } = useModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Effects
  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Home');
    }
  }, [isLoggedIn, navigation]);

  // Show modal for authentication errors
  useEffect(() => {
    if (error) {
      const customMessage = getCustomErrorMessage(error);
      showError(customMessage);
    }
  }, [error]); // Solo depender del error, no de showError

  // Validation
  const validateForm = (): boolean => {
    if (!email || !password) {
      showError('Por favor, ingresa tu email y contraseña.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('Por favor, ingresa un email válido.');
      return false;
    }

    if (password.length < 6) {
      showError('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }

    return true;
  };

  // Handlers
    const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const credentials = { email, password };
      await dispatch(login(credentials)).unwrap();
      navigation.replace('Home');
    } catch (error) {
      // Error is handled by useEffect through Redux state
    }
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
    
    // Handlers
    handleLogin,
    handleGoToSignUp,
    handleEmailChange,
    handlePasswordChange,
  };
};
