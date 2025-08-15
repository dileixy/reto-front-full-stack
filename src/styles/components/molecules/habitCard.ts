import { StyleSheet } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';
import { SHADOWS } from '../../shadows';
import { RADIUS } from '../../radius';
import { TYPOGRAPHY } from '../../typography';

export const habitCardStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginVertical: SPACING.xsmall,
    marginHorizontal: SPACING.xsmall, // Pequeño margen para evitar bordes cortados
    padding: SPACING.medium,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.background, // Sutil borde en lugar de sombra
    overflow: 'visible',
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.medium,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.small,
    width: '100%',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.small,
    width: '100%',
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    flex: 1,
    marginRight: SPACING.small,
    lineHeight: TYPOGRAPHY.sizes.lg * 1.3,
  },
  description: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text,
    lineHeight: TYPOGRAPHY.sizes.md * 1.4,
    marginTop: SPACING.xsmall,
    flex: 1,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: SPACING.xsmall,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconButton: {
    paddingHorizontal: SPACING.small,
    paddingVertical: SPACING.xsmall,
  },
});