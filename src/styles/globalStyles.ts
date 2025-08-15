import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
import { SPACING } from './spacing';
import { TYPOGRAPHY, textStyles } from './typography';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.small,
    overflow: 'visible',
  },
  title: {
    ...textStyles.title,
    textAlign: 'center',
    marginBottom: SPACING.medium,
  },
  subtitle: {
    ...textStyles.subtitle,
    textAlign: 'center',
    color: '#666',
    marginBottom: SPACING.small,
  },
  input: {
    width: '80%',
    padding: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: SPACING.medium,
  },
  error: {
    color: 'red',
    marginBottom: SPACING.small,
  },
  logo: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },  
});