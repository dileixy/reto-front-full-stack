export interface Habit {
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
