// Types and constants for habit frequencies

export enum HabitFrequency {
  DAILY = 'Diario',
  WEEKLY = 'Semanal', 
  MONTHLY = 'Mensual'
}

export const FREQUENCY_OPTIONS = [
  { value: HabitFrequency.DAILY, label: 'Diario', description: 'Todos los días' },
  { value: HabitFrequency.WEEKLY, label: 'Semanal', description: 'Una vez por semana' },
  { value: HabitFrequency.MONTHLY, label: 'Mensual', description: 'Una vez por mes' }
];

export const FREQUENCY_ICONS = {
  [HabitFrequency.DAILY]: '📅',
  [HabitFrequency.WEEKLY]: '🗓️',
  [HabitFrequency.MONTHLY]: '📆'
};

export const FREQUENCY_COLORS = {
  [HabitFrequency.DAILY]: '#4CAF50',    // Verde
  [HabitFrequency.WEEKLY]: '#2196F3',   // Azul
  [HabitFrequency.MONTHLY]: '#FF9800'   // Naranja
};
