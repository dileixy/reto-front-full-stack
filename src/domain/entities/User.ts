// Domain Entity - User
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  user: User;
  token?: string;
}
