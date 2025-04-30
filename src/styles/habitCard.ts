import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
import { SPACING } from './spacing';

export const habitCardStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: SPACING.small,
    marginVertical: SPACING.xsmall,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.small,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: SPACING.small,
    width: '100%', // Asegura que la tarjeta ocupe todo el ancho
    height: 120,  // Tarjeta más alargada verticalmente
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xsmall,
  },
  description: {
    fontSize: 12,
    color: COLORS.text,
    marginTop: SPACING.xsmall,
    lineHeight: 18,
  },
  iconButton: {
    paddingHorizontal: SPACING.xsmall,
    paddingVertical: SPACING.small,
  },
});
