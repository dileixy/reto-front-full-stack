import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
import { SPACING } from './spacing';

export const habitCardStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginVertical: SPACING.xsmall,
    padding: SPACING.small,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.10,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    borderRadius: 12,
    elevation: 5, // Para Android
    overflow: 'visible',
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.small,
    borderRadius: 12,
    marginBottom: SPACING.small,
    width: '100%',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.small,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    flex: 1, // El título ocupa el espacio disponible
    marginRight: SPACING.small, // Separa el texto de los íconos
  },
  description: {
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 18,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: SPACING.xsmall,
  },
});