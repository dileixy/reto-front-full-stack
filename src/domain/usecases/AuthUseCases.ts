// Use Cases - Business Logic
import { AuthRepository } from '../repositories/AuthRepository';
import { AuthCredentials, AuthResult } from '../entities/User';

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(credentials: AuthCredentials): Promise<AuthResult> {
    // Aquí puedes agregar validaciones de negocio
    if (!credentials.email || !credentials.password) {
      throw new Error('Email y contraseña son requeridos');
    }

    if (!this.isValidEmail(credentials.email)) {
      throw new Error('El formato del email no es válido');
    }

    return await this.authRepository.login(credentials);
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(credentials: AuthCredentials): Promise<AuthResult> {
    // Validaciones de negocio
    if (!credentials.email || !credentials.password) {
      throw new Error('Email y contraseña son requeridos');
    }

    if (!this.isValidEmail(credentials.email)) {
      throw new Error('El formato del email no es válido');
    }

    if (credentials.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    return await this.authRepository.register(credentials);
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

export class LogoutUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<void> {
    return await this.authRepository.logout();
  }
}
