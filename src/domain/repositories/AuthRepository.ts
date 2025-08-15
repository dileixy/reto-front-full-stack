// Domain Repository Interface
import { AuthCredentials, AuthResult, User } from '../entities/User';

export interface AuthRepository {
  login(credentials: AuthCredentials): Promise<AuthResult>;
  register(credentials: AuthCredentials): Promise<AuthResult>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  isAuthenticated(): Promise<boolean>;
}
