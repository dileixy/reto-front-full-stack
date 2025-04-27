import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../config/supabase';

interface AuthState {
  isLoggedIn: boolean;
  user: { id: string; name: string; email: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    // Asegurar que se devuelven los datos correctos
    return { id: data.user?.id, name: data.user?.user_metadata?.name ?? '', email: data.user?.email };
  }
);

// Acción asíncrona para iniciar sesión con Supabase
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    return { id: data.user?.id, name: data.user?.user_metadata?.name ?? '', email: data.user?.email };
  }
);

// Acción asíncrona para cerrar sesión
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}, //Se deja vacío porque todas las acciones son asíncronas
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = {
          id: action.payload.id ?? '',
          name: action.payload.name,
          email: action.payload.email ?? '', // <-- Si es undefined, usa un string vacío
        };
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (!action.payload) {
          state.error = 'No se recibieron datos del usuario.';
          return;
        }
        state.loading = false;
        state.isLoggedIn = true;
        state.user = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email ?? '', // <-- Si es undefined, usa un string vacío
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
