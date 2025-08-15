import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ModalProvider, useModal } from '../context/ModalContext';
import { SPACING } from '../styles/spacing';
import { COLORS } from '../styles/colors';
import { RADIUS } from '../styles/radius';

const ModalTestScreen = () => {
  const { showError, showSuccess } = useModal();

  const testError = () => {
    showError('Por favor, ingresa un email válido.');
  };

  const testSuccess = () => {
    showSuccess('Hábito creado correctamente');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={testError}>
        <Text style={styles.buttonText}>Mostrar Error</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={testSuccess}>
        <Text style={styles.buttonText}>Mostrar Éxito</Text>
      </TouchableOpacity>
    </View>
  );
};

const TestModalApp = () => (
  <ModalProvider>
    <ModalTestScreen />
  </ModalProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    gap: SPACING.large,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.medium,
    borderRadius: RADIUS.md,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TestModalApp;
