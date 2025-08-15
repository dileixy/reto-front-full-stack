import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import FormInput from '../atoms/FormInput/FormInput';
import Button from '../atoms/Button/Button';
import { formButtonStyles } from '../../styles/formButtonStyles';
import { SPACING } from '../../styles/spacing';
import { COLORS } from '../../styles/colors';
import { StyleSheet } from 'react-native';

interface CreateHabitFormProps {
  name: string;
  description: string;
  frequency: string;
  isSubmitting: boolean;
  onNameChange: (text: string) => void;
  onDescriptionChange: (text: string) => void;
  onFrequencyChange: (text: string) => void;
  onSubmit: () => void;
}

const CreateHabitForm: React.FC<CreateHabitFormProps> = ({
  name,
  description,
  frequency,
  isSubmitting,
  onNameChange,
  onDescriptionChange,
  onFrequencyChange,
  onSubmit,
}) => {
  return (
    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        
        <View style={styles.fieldContainer}>
          <FormInput
            placeholder="Nombre del Hábito"
            value={name}
            onChangeText={onNameChange}
            maxLength={50}
          />
          {name.length > 0 && name.length < 3 && (
            <Text style={styles.helper}>Mínimo 3 caracteres</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <FormInput
            placeholder="Descripción del hábito..."
            value={description}
            onChangeText={onDescriptionChange}
            multiline
            numberOfLines={4}
            maxLength={200}
            style={styles.textArea}
          />
          {description.length > 0 && description.length < 10 && (
            <Text style={styles.helper}>Mínimo 10 caracteres</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <FormInput
            placeholder="Frecuencia (Ej: Diario, Semanal)"
            value={frequency}
            onChangeText={onFrequencyChange}
            maxLength={30}
          />
          {frequency.length > 0 && frequency.length === 0 && (
            <Text style={styles.helper}>¿Con qué frecuencia quieres realizarlo?</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={isSubmitting ? 'Creando...' : 'Crear Hábito'}
            testID="create-habit-button"
            onPress={onSubmit}
            disabled={isSubmitting}
            style={formButtonStyles.button}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.medium,
    alignItems: 'stretch', // Asegura que los hijos tomen todo el ancho
  },
  fieldContainer: {
    marginBottom: SPACING.large,
    width: '100%',
  },
  helper: {
    fontSize: 12,
    color: '#999',
    marginTop: SPACING.xsmall,
    marginLeft: SPACING.small,
    fontStyle: 'italic',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: COLORS.white, // Forzar fondo blanco
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: SPACING.xLarge,
    width: '100%',
  },
});

export default CreateHabitForm;
