import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import FormInput from '../atoms/FormInput/FormInput';
import Button from '../atoms/Button/Button';
import { formButtonStyles } from '../../styles/formButtonStyles';
import { SPACING } from '../../styles/spacing';
import { COLORS } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { StyleSheet } from 'react-native';

interface SignUpFormProps {
  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  error: string | null;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onConfirmPasswordChange: (text: string) => void;
  onRegister: () => void;
  onGoToLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  email,
  password,
  confirmPassword,
  loading,
  error,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onRegister,
  onGoToLogin,
}) => {
  return (
    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        
        <View style={styles.fieldContainer}>
          <FormInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={onEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          {email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
            <Text style={styles.helper}>Ingresa un email válido</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <FormInput
            placeholder="Contraseña"
            value={password}
            onChangeText={onPasswordChange}
            secureTextEntry
            autoComplete="password-new"
          />
          {password.length > 0 && password.length < 6 && (
            <Text style={styles.helper}>Mínimo 6 caracteres</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <FormInput
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={onConfirmPasswordChange}
            secureTextEntry
            autoComplete="password-new"
          />
          {confirmPassword.length > 0 && password !== confirmPassword && (
            <Text style={styles.helper}>Las contraseñas no coinciden</Text>
          )}
        </View>

        {error && <Text style={globalStyles.error}>{error}</Text>}

        <View style={styles.buttonContainer}>
          <Button
            title={loading ? 'Registrando...' : 'Crear Cuenta'}
            onPress={onRegister}
            disabled={loading}
            style={formButtonStyles.button}
          />
          
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={onGoToLogin}>
              <Text style={styles.linkText}>
                Ya tengo cuenta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.medium,
    alignItems: 'stretch', // Asegura que los hijos tomen todo el ancho
  },
  fieldContainer: {
    marginBottom: SPACING.large,
    width: '100%',
  },
  helper: {
    fontSize: 12,
    color: '#e74c3c',
    marginTop: SPACING.xsmall,
    marginLeft: SPACING.small,
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: SPACING.xLarge,
    width: '100%',
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

export default SignUpForm;
