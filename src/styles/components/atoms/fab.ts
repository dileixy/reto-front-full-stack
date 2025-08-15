import { StyleSheet } from 'react-native';
import { COLORS } from '../../colors';
import { SHADOWS } from '../../shadows';
import { SPACING } from '../../spacing';
import { RADIUS } from '../../radius';

export const fabStyles = StyleSheet.create({
  fab: {
    backgroundColor: COLORS.primary,
    width: 56,
    height: 56,
    borderRadius: RADIUS.circle,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginVertical: SPACING.medium,
    marginRight: SPACING.medium,
  },
  fabDisabled: {
    backgroundColor: COLORS.gray,
  },
  icon: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
