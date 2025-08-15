// Domain Repository Interface
import { Habit, CreateHabitRequest, UpdateHabitRequest, HabitCompletionRequest } from '../entities/Habit';

export interface HabitsRepository {
  getHabits(userId: string): Promise<Habit[]>;
  createHabit(request: CreateHabitRequest, userId: string): Promise<Habit>;
  updateHabit(request: UpdateHabitRequest): Promise<Habit>;
  deleteHabit(habitId: string): Promise<void>;
  toggleHabitCompletion(request: HabitCompletionRequest): Promise<Habit>;
  getHabitById(habitId: string): Promise<Habit | null>;
}
