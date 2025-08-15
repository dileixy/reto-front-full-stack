import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { diContainer } from '../config/DIContainer';
import { User, AuthCredentials } from '../domain/entities/User';

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};

// Thunks now use business logic from use cases
export const register = createAsyncThunk(
  'auth/register',
  async (credentials: AuthCredentials, thunkAPI) => {
    try {
      const registerUseCase = diContainer.getRegisterUseCase();
      const result = await registerUseCase.execute(credentials);
      return result.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: AuthCredentials, thunkAPI) => {
    try {
      const loginUseCase = diContainer.getLoginUseCase();
      const result = await loginUseCase.execute(credentials);
      return result.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const logoutUseCase = diContainer.getLogoutUseCase();
    await logoutUseCase.execute();
    return null;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
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
        state.isLoggedIn = false; // User needs to confirm email for registration
        state.user = action.payload;
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
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
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
