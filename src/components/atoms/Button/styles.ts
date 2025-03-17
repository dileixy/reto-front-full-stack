import { StyleSheet } from 'react-native';
import { COLORS } from '../../../styles/colors'; // Importando colores globales

export const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary, // Color definido en un archivo global
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Sombra en Android
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

