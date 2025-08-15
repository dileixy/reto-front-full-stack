// Infrastructure Implementation
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { AuthCredentials, AuthResult, User } from '../../domain/entities/User';
import { supabase } from '../../config/supabase';

export class SupabaseAuthRepository implements AuthRepository {
  async login(credentials: AuthCredentials): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('No se recibieron datos del usuario');
    }

    return {
      user: {
        id: data.user.id,
        name: data.user.user_metadata?.name ?? '',
        email: data.user.email ?? '',
      },
    };
  }

  async register(credentials: AuthCredentials): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('No se pudo crear el usuario');
    }

    return {
      user: {
        id: data.user.id,
        name: data.user.user_metadata?.name ?? '',
        email: data.user.email ?? '',
      },
    };
  }

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw new Error(error.message);
    }

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.user_metadata?.name ?? '',
      email: user.email ?? '',
    };
  }

  async isAuthenticated(): Promise<boolean> {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  }
}
