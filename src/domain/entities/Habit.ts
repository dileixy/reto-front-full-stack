// Domain Entity - Habit
import { HabitFrequency } from '../../types/frequency';

export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: HabitFrequency;
  isCompleted: boolean;
  completedDates: string[];
  createdAt: string;
  userId: string;
}

export interface CreateHabitRequest {
  name: string;
  description: string;
  frequency: HabitFrequency;
}

export interface UpdateHabitRequest {
  id: string;
  name?: string;
  description?: string;
  frequency?: HabitFrequency;
  isCompleted?: boolean;
}

export interface HabitCompletionRequest {
  habitId: string;
  date: string;
}
