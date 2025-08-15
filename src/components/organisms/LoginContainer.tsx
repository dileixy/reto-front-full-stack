import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Button from '../atoms/Button/Button';
import FormInput from '../atoms/FormInput/FormInput';
import { globalStyles } from '../../styles/globalStyles';
import { formButtonStyles } from '../../styles/formButtonStyles';
import { formStyles } from '../../styles/formStyles';
import { SPACING } from '../../styles/spacing';
import { COLORS } from '../../styles/colors';
import { StyleSheet } from 'react-native';

interface LoginContainerProps {
  email: string;
  password: string;
  loading: boolean;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onLogin: () => void;
  onGoToSignUp: () => void;
}

const LoginContainer: React.FC<LoginContainerProps> = ({
  email,
  password,
  loading,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onGoToSignUp,
}) => {
  return (
    <View style={styles.container}>
      <FormInput
        placeholder="Email"
        value={email}
        onChangeText={onEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      
      <FormInput
        placeholder="Contraseña"
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry
        autoComplete="password"
      />

      <Button
        testID="login-button"
        title={loading ? 'Ingresando...' : 'Ingresar'}
        onPress={onLogin}
        disabled={loading}
        style={formButtonStyles.button}
      />
      
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={onGoToSignUp}>
          <Text style={styles.linkText}>
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: SPACING.medium,
    alignItems: 'stretch', // Asegura que los hijos tomen todo el ancho
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: SPACING.large,
  },
  linkText: {
    fontSize: 16,
    color: COLORS.secondary,
    fontWeight: '600',
  },
});

export default LoginContainer;
