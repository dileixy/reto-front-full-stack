import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { diContainer } from '../config/DIContainer';
import { Habit, CreateHabitRequest, HabitCompletionRequest } from '../domain/entities/Habit';
import { RootState } from '../store/store';

interface HabitsState {
  habitsList: Habit[];
  error?: string;
}

const initialState: HabitsState = {
  habitsList: [],
  error: undefined,
};

export const fetchHabits = createAsyncThunk(
  'habits/fetchHabits',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const userId = state.auth.user?.id;

      if (!userId) {
        return thunkAPI.rejectWithValue('Usuario no autenticado');
      }

      const getHabitsUseCase = diContainer.getGetHabitsUseCase();
      const habits = await getHabitsUseCase.execute(userId);
      return habits;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerHabit = createAsyncThunk(
  'habits/register',
  async (habitRequest: CreateHabitRequest, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const userId = state.auth.user?.id;

      if (!userId) {
        return thunkAPI.rejectWithValue('Usuario no autenticado');
      }

      const createHabitUseCase = diContainer.getCreateHabitUseCase();
      const habit = await createHabitUseCase.execute(habitRequest, userId);
      return habit;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const toggleHabitCompletion = createAsyncThunk(
  'habits/toggleCompletion',
  async (habitId: string, thunkAPI) => {
    try {
      const toggleUseCase = diContainer.getToggleHabitCompletionUseCase();
      const today = new Date().toISOString().split('T')[0];
      
      const request: HabitCompletionRequest = {
        habitId,
        date: today,
      };

      const habit = await toggleUseCase.execute(request);
      return habit;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteHabit = createAsyncThunk(
  'habits/delete',
  async (habitId: string, thunkAPI) => {
    try {
      const deleteUseCase = diContainer.getDeleteHabitUseCase();
      await deleteUseCase.execute(habitId);
      return habitId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    clearHabitsError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch habits
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.habitsList = action.payload;
        state.error = undefined;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Register habit
      .addCase(registerHabit.fulfilled, (state, action) => {
        state.habitsList.unshift(action.payload);
        state.error = undefined;
      })
      .addCase(registerHabit.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Toggle habit completion
      .addCase(toggleHabitCompletion.fulfilled, (state, action) => {
        const index = state.habitsList.findIndex(h => h.id === action.payload.id);
        if (index !== -1) {
          state.habitsList[index] = action.payload;
        }
        state.error = undefined;
      })
      .addCase(toggleHabitCompletion.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Delete habit
      .addCase(deleteHabit.fulfilled, (state, action) => {
        state.habitsList = state.habitsList.filter(h => h.id !== action.payload);
        state.error = undefined;
      })
      .addCase(deleteHabit.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearHabitsError } = habitsSlice.actions;
export default habitsSlice.reducer;
