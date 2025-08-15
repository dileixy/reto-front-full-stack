import { StyleSheet } from 'react-native';
import { COLORS } from '../../colors';
import { SHADOWS } from '../../shadows';
import { SPACING } from '../../spacing';
import { RADIUS } from '../../radius';
import { TYPOGRAPHY } from '../../typography';

export const userButtonStyles = StyleSheet.create({
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  container: {
    height: 56,
    overflow: 'hidden',
    zIndex: 1001,
  },
  button: {
    backgroundColor: COLORS.primary, // Morado principal 💜
    height: 56,
    borderRadius: 28, // Radio circular completo
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 0, // Sin padding para mantener forma circular
    overflow: 'hidden',
    position: 'relative', // Para controlar z-index
  },
  buttonDisabled: {
    backgroundColor: COLORS.gray,
  },
  iconContainer: {
    width: 56, // Igual al FloatingActionButton
    height: 56, // Igual al FloatingActionButton
    borderRadius: 28, // Circular perfecto
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary, // Mismo color de fondo
    position: 'absolute', // Posición absoluta para estar encima del texto
    left: 0,
    top: 0,
    zIndex: 10, // Encima del texto
  },
  icon: {
    fontSize: 20,
    color: COLORS.white, // Blanco para contrastar con morado 💜
    fontWeight: 'bold',
  },
  iconText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 40, // Espacio para el icono
    paddingRight: SPACING.large,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary, // Mismo color de fondo
    height: 56,
    borderRadius: 28,
    position: 'relative', // Para estar debajo del icono
    zIndex: 1, // Debajo del icono
  },
  expandedText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  // Mantener estilos legacy por si se necesitan
  tooltip: {
    position: 'absolute',
    top: 45,
    left: -20,
    backgroundColor: COLORS.black,
    paddingHorizontal: SPACING.small,
    paddingVertical: SPACING.xsmall,
    borderRadius: RADIUS.sm,
    minWidth: 100,
    alignItems: 'center',
    ...SHADOWS.lg,
  },
  tooltipText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  tooltipArrow: {
    position: 'absolute',
    top: -5,
    left: 25,
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.black,
  },
});
