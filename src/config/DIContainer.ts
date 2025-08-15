// Dependency Injection Container
import { AuthRepository } from '../domain/repositories/AuthRepository';
import { HabitsRepository } from '../domain/repositories/HabitsRepository';
import { LoginUseCase, RegisterUseCase, LogoutUseCase } from '../domain/usecases/AuthUseCases';
import { 
  GetHabitsUseCase, 
  CreateHabitUseCase, 
  UpdateHabitUseCase, 
  DeleteHabitUseCase, 
  ToggleHabitCompletionUseCase 
} from '../domain/usecases/HabitsUseCases';
import { SupabaseAuthRepository } from '../infrastructure/repositories/SupabaseAuthRepository';
import { SupabaseHabitsRepository } from '../infrastructure/repositories/SupabaseHabitsRepository';

class DIContainer {
  private authRepository: AuthRepository;
  private habitsRepository: HabitsRepository;
  
  private loginUseCase: LoginUseCase;
  private registerUseCase: RegisterUseCase;
  private logoutUseCase: LogoutUseCase;
  
  private getHabitsUseCase: GetHabitsUseCase;
  private createHabitUseCase: CreateHabitUseCase;
  private updateHabitUseCase: UpdateHabitUseCase;
  private deleteHabitUseCase: DeleteHabitUseCase;
  private toggleHabitCompletionUseCase: ToggleHabitCompletionUseCase;

  constructor() {
    // Infrastructure layer
    this.authRepository = new SupabaseAuthRepository();
    this.habitsRepository = new SupabaseHabitsRepository();
    
    // Auth use cases
    this.loginUseCase = new LoginUseCase(this.authRepository);
    this.registerUseCase = new RegisterUseCase(this.authRepository);
    this.logoutUseCase = new LogoutUseCase(this.authRepository);
    
    // Habits use cases
    this.getHabitsUseCase = new GetHabitsUseCase(this.habitsRepository);
    this.createHabitUseCase = new CreateHabitUseCase(this.habitsRepository);
    this.updateHabitUseCase = new UpdateHabitUseCase(this.habitsRepository);
    this.deleteHabitUseCase = new DeleteHabitUseCase(this.habitsRepository);
    this.toggleHabitCompletionUseCase = new ToggleHabitCompletionUseCase(this.habitsRepository);
  }

  // Auth repository
  getAuthRepository(): AuthRepository {
    return this.authRepository;
  }

  // Auth use cases
  getLoginUseCase(): LoginUseCase {
    return this.loginUseCase;
  }

  getRegisterUseCase(): RegisterUseCase {
    return this.registerUseCase;
  }

  getLogoutUseCase(): LogoutUseCase {
    return this.logoutUseCase;
  }

  // Habits repository
  getHabitsRepository(): HabitsRepository {
    return this.habitsRepository;
  }

  // Habits use cases
  getGetHabitsUseCase(): GetHabitsUseCase {
    return this.getHabitsUseCase;
  }

  getCreateHabitUseCase(): CreateHabitUseCase {
    return this.createHabitUseCase;
  }

  getUpdateHabitUseCase(): UpdateHabitUseCase {
    return this.updateHabitUseCase;
  }

  getDeleteHabitUseCase(): DeleteHabitUseCase {
    return this.deleteHabitUseCase;
  }

  getToggleHabitCompletionUseCase(): ToggleHabitCompletionUseCase {
    return this.toggleHabitCompletionUseCase;
  }
}

export const diContainer = new DIContainer();
