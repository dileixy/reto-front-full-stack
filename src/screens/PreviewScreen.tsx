import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import HabitCardPreview from '../components/molecules/HabitCardPreview';
import { HabitFrequency } from '../types/frequency';
import { Habit } from '../types/index';

const PreviewScreen: React.FC = () => {
  // Hábito de ejemplo para probar los diseños
  const sampleHabit: Habit = {
    id: '1',
    name: 'Ejercicio diario',
    description: 'Hacer 30 minutos de ejercicio cardiovascular para mantener una buena salud',
    frequency: HabitFrequency.DAILY,
    isCompleted: false,
    completedDates: ['2025-08-13', '2025-08-14'], // Para probar la racha
    createdAt: '2025-08-10T00:00:00Z',
    userId: 'user1',
  };

  const handleComplete = (id: string) => {
    console.log('Completar hábito:', id);
  };

  const handleEdit = (id: string) => {
    console.log('Editar hábito:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Eliminar hábito:', id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <HabitCardPreview
          habit={sampleHabit}
          onComplete={handleComplete}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
});

export default PreviewScreen;
