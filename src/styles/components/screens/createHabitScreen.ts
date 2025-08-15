import { StyleSheet } from 'react-native';
import { COLORS } from '../../colors';
import { SPACING } from '../../spacing';
import { TYPOGRAPHY, textStyles } from '../../typography';
import { SHADOWS } from '../../shadows';
import { RADIUS } from '../../radius';

export const createHabitScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    paddingTop: 50,
    paddingBottom: SPACING.medium,
    paddingHorizontal: SPACING.medium,
    backgroundColor: COLORS.background,
  },
  backButtonContainer: {
    marginBottom: SPACING.large,
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
  title: {
    ...textStyles.title,
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
  },
  errorText: {
    color: COLORS.red,
    textAlign: 'center',
    fontSize: 16,
    marginTop: SPACING.large,
  },
});
