import { StyleSheet } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';
import { TYPOGRAPHY, textStyles } from '../../typography';
import { SHADOWS } from '../../shadows';
import { RADIUS } from '../../radius';

export const signUpScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    paddingTop: 60,
    paddingBottom: SPACING.medium,
    paddingHorizontal: SPACING.medium,
    backgroundColor: COLORS.background,
  },
  backButtonContainer: {
    marginBottom: SPACING.medium,
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
  title: {
    ...textStyles.title,
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: SPACING.xsmall,
  },
  subtitle: {
    ...textStyles.subtitle,
    color: COLORS.text,
    fontSize: 16,
    opacity: 0.7,
  },
  errorText: {
    color: COLORS.red,
    textAlign: 'center',
    fontSize: 16,
    marginTop: SPACING.large,
  },
});
