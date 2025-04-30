import { StyleSheet } from 'react-native';
import { SPACING } from '../../../styles/spacing';
import { COLORS } from '../../../styles/colors';

export const styles = StyleSheet.create({
  input: {
    width: '90%',
    padding: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: SPACING.medium,
  },
});
