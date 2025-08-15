import { StyleSheet } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';
import { TYPOGRAPHY, textStyles } from '../../typography';
import { SHADOWS } from '../../shadows';
import { RADIUS } from '../../radius';

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: SPACING.medium,
    paddingHorizontal: SPACING.medium,
  },
  logoutButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    borderRadius: RADIUS.xl,
  },
  logoutButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: SPACING.medium,
    paddingHorizontal: SPACING.medium,
  },
  title: {
    ...textStyles.title,
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  createButtonContainer: {
    alignItems: 'center',
    marginBottom: SPACING.medium,
    paddingHorizontal: SPACING.medium,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
  },
  listContentContainer: {
    paddingBottom: SPACING.large,
  },
  errorText: {
    color: COLORS.red,
    textAlign: 'center',
    fontSize: 16,
    marginTop: SPACING.large,
  },
});
