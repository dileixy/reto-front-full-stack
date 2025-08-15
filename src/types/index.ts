// Re-export domain entities for backward compatibility
export type { Habit, CreateHabitRequest, UpdateHabitRequest, HabitCompletionRequest } from '../domain/entities/Habit';
export type { User, AuthCredentials, AuthResult } from '../domain/entities/User';

// Legacy types - deprecated, use domain entities instead
export interface LegacyHabit {
  id: string;
  name: string;
  description: string;
  frequency: string;
  completed: boolean;
  created_at: string;
  user_id: string;
}

export type HabitInsert = {
  name: string;
  description: string;
  frequency: string;
}
