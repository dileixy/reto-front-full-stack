import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: string;
  completed: boolean;
}

interface HabitsState {
  habits: Habit[];
}

const initialState: HabitsState = {
  habits: [],
};

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit(state, action: PayloadAction<Habit>) {
      state.habits.push(action.payload);
    },
    toggleHabit(state, action: PayloadAction<string>) {
      const habit = state.habits.find((h) => h.id === action.payload);
      if (habit) {
        habit.completed = !habit.completed;
      }
    },
    removeHabit(state, action: PayloadAction<string>) {
      state.habits = state.habits.filter((h) => h.id !== action.payload);
    },
    updateHabit(state, action: PayloadAction<Habit>) {
      const index = state.habits.findIndex((h) => h.id === action.payload.id);
      if (index !== -1) {
        state.habits[index] = action.payload;
      }
    },
  },
});

export const { addHabit, toggleHabit, removeHabit, updateHabit } = habitsSlice.actions;
export default habitsSlice.reducer;
