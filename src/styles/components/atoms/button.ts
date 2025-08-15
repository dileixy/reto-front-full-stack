import { StyleSheet } from 'react-native';
import { COLORS } from '../../colors';
import { SHADOWS } from '../../shadows';
import { SPACING } from '../../spacing';
import { RADIUS } from '../../radius';
import { TYPOGRAPHY } from '../../typography';

export const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.secondary,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.large,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.sm,
  },
  buttonDisabled: {
    backgroundColor: COLORS.gray,
    ...SHADOWS.none,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  floating: {
    position: 'absolute',
    top: 50, // Alineado con el paddingTop del header (50) para coincidir con UserButton
    right: SPACING.large,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary, // Cambio de secondary (verde) a primary (morado)
    alignItems: 'center',
    justifyContent: 'center',
  },
});
