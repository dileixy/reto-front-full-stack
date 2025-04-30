import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../config/supabase';
import { Habit, HabitInsert } from '../types';
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
    const state = thunkAPI.getState() as RootState;
    const userId = state.auth.user?.id;

    if (!userId) {
      return thunkAPI.rejectWithValue('Usuario no autenticado');
    }

    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    return data;
  }
);

export const registerHabit = createAsyncThunk<Habit, HabitInsert, { rejectValue: string }>( // tipado -> response, payload, errors
  'habits/register',
  async (habit: HabitInsert, thunkAPI) => {
    const userId = (thunkAPI.getState() as any).auth.user?.id;

    if (!userId) return thunkAPI.rejectWithValue('Usuario no autenticado');

    const { data, error } = await supabase
      .from('habits')
      .insert([{ ...habit, user_id: userId }]);

    if (error) {
      console.error('Error de Supabase:', error);
      return thunkAPI.rejectWithValue(error?.message || 'Error al registrar hábito');
    }
    const { data: habitData, error: selectError } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false }) 
      .limit(1); 

    if (selectError) {
      console.error('Error al recuperar el hábito:', selectError);
      return thunkAPI.rejectWithValue(selectError?.message || 'Error al recuperar el hábito');
    }

    return habitData ? habitData[0] : null;  // Devuelve el primer hábito insertado

  }
);

export const toggleHabitCompletion = createAsyncThunk<Habit, string, { rejectValue: string }>(
  'habits/toggleCompletion',
  async (habitId: string, thunkAPI) => {
    // Obtener el usuario desde el estado global (auth)
    const userId = (thunkAPI.getState() as RootState).auth.user?.id;
    console.log("userId----------------", userId, habitId)
    const { data: habits, error: fetchError } = await supabase
      .from('habits')
      .select('*')
      .eq('id', habitId)
      .eq('user_id', userId);

    console.log('Resultados de la consulta:', habits); // Imprime los datos devueltos

    if (fetchError || habits.length === 0) {
      return thunkAPI.rejectWithValue(fetchError?.message || 'Hábito no encontrado');
    }

    console.log('Hábito:', habits[0]);
    console.log('Valor de completed:', habits[0].completed);
    const { error: updateError } = await supabase
      .from('habits')
      .update({ completed: !habits[0].completed })
      .eq('id', habitId)
      .eq('user_id', userId)
      .single();

    if (updateError) {
      console.error('Error al actualizar hábito:', updateError);
      return thunkAPI.rejectWithValue(updateError?.message || 'Error al actualizar hábito');
    }

    return {
      ...habits[0],
      completed: !habits[0].completed
    };
  }
);

export const deleteHabit = createAsyncThunk<string, string, { rejectValue: string }>(
  'habits/delete',
  async (habitId: string, thunkAPI) => {
    const userId = (thunkAPI.getState() as RootState).auth.user?.id;
    const { data: habits, error: fetchError } = await supabase
      .from('habits')
      .select('*')
      .eq('id', habitId)
      .eq('user_id', userId);

    console.log('Resultados de la consulta:', habits); // Imprime los datos devueltos

    if (fetchError || habits.length === 0) {
      return thunkAPI.rejectWithValue(fetchError?.message || 'Hábito no encontrado');
    }

    const { error: deleteError } = await supabase
      .from('habits')
      .delete()
      .eq('id', habitId)
      .eq('user_id', userId);

    if (deleteError) {
      console.error('Error al actualizar hábito:', deleteError);
      return thunkAPI.rejectWithValue(deleteError?.message || 'Error al Eliminar hábito');
    }

    return habitId;
  }
);

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.habitsList = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        console.error('Error al obtener listado de habitos:', action.payload);
        state.error = action.payload as string;
      })
      .addCase(registerHabit.fulfilled, (state, action) => {
        state.habitsList.push(action.payload);
        state.error = undefined;
      })
      .addCase(registerHabit.rejected, (state, action) => {
        console.error('Error al registrar hábito:', action.payload);
        console.error('Error completo:', action.error);  // Muestra también el objeto completo de error
        state.error = action.payload as string;
      })
      .addCase(toggleHabitCompletion.fulfilled, (state, action) => {
        const index = state.habitsList.findIndex(h => h.id === action.payload.id);
        if (index !== -1) {
          state.habitsList[index] = action.payload;
        }
      })
      .addCase(toggleHabitCompletion.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteHabit.fulfilled, (state, action) => {
        console.log('habito eliminado:', action.payload);
        const habits = state.habitsList.filter((item) => item.id !== action.payload); // Crear un nuevo array sin el item
        state.habitsList = habits;
      })
      .addCase(deleteHabit.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export default habitsSlice.reducer;
