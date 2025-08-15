// Use Cases - Business Logic for Habits
import { HabitsRepository } from '../repositories/HabitsRepository';
import { Habit, CreateHabitRequest, UpdateHabitRequest, HabitCompletionRequest } from '../entities/Habit';
import { HabitFrequency } from '../../types/frequency';

export class GetHabitsUseCase {
  constructor(private habitsRepository: HabitsRepository) {}

  async execute(userId: string): Promise<Habit[]> {
    if (!userId) {
      throw new Error('ID de usuario es requerido');
    }

    return await this.habitsRepository.getHabits(userId);
  }
}

export class CreateHabitUseCase {
  constructor(private habitsRepository: HabitsRepository) {}

  async execute(request: CreateHabitRequest, userId: string): Promise<Habit> {
    // Validaciones de negocio
    if (!request.name || request.name.trim().length === 0) {
      throw new Error('El nombre del hábito es requerido');
    }

    if (request.name.trim().length < 3) {
      throw new Error('El nombre del hábito debe tener al menos 3 caracteres');
    }

    if (!request.description || request.description.trim().length === 0) {
      throw new Error('La descripción del hábito es requerida');
    }

    if (request.description.trim().length < 5) {
      throw new Error('La descripción debe tener al menos 5 caracteres');
    }

    if (request.description.trim().length > 80) {
      throw new Error('La descripción no puede exceder 80 caracteres');
    }

    if (!request.frequency || !Object.values(HabitFrequency).includes(request.frequency)) {
      throw new Error('La frecuencia del hábito es requerida y debe ser válida');
    }

    const validFrequencies = Object.values(HabitFrequency);
    if (!validFrequencies.includes(request.frequency)) {
      throw new Error('La frecuencia debe ser: Diario, Semanal o Mensual');
    }

    if (!userId) {
      throw new Error('ID de usuario es requerido');
    }

    // Normalizar datos
    const normalizedRequest: CreateHabitRequest = {
      name: request.name.trim(),
      description: request.description.trim(),
      frequency: request.frequency,
    };

    return await this.habitsRepository.createHabit(normalizedRequest, userId);
  }
}

export class UpdateHabitUseCase {
  constructor(private habitsRepository: HabitsRepository) {}

  async execute(request: UpdateHabitRequest): Promise<Habit> {
    if (!request.id) {
      throw new Error('ID del hábito es requerido');
    }

    // Validaciones opcionales para campos que se actualizan
    if (request.name !== undefined) {
      if (request.name.trim().length === 0) {
        throw new Error('El nombre del hábito no puede estar vacío');
      }
      if (request.name.trim().length < 3) {
        throw new Error('El nombre del hábito debe tener al menos 3 caracteres');
      }
    }

    if (request.description !== undefined) {
      if (request.description.trim().length === 0) {
        throw new Error('La descripción no puede estar vacía');
      }
      if (request.description.trim().length < 5) {
        throw new Error('La descripción debe tener al menos 5 caracteres');
      }
      if (request.description.trim().length > 80) {
        throw new Error('La descripción no puede exceder 80 caracteres');
      }
    }

    if (request.frequency !== undefined) {
      const validFrequencies = Object.values(HabitFrequency);
      if (!validFrequencies.includes(request.frequency)) {
        throw new Error('La frecuencia debe ser: Diario, Semanal o Mensual');
      }
    }

    return await this.habitsRepository.updateHabit(request);
  }
}

export class DeleteHabitUseCase {
  constructor(private habitsRepository: HabitsRepository) {}

  async execute(habitId: string): Promise<void> {
    if (!habitId) {
      throw new Error('ID del hábito es requerido');
    }

    // Verificar que el hábito existe antes de eliminarlo
    const habit = await this.habitsRepository.getHabitById(habitId);
    if (!habit) {
      throw new Error('El hábito no existe o ya fue eliminado');
    }

    return await this.habitsRepository.deleteHabit(habitId);
  }
}

export class ToggleHabitCompletionUseCase {
  constructor(private habitsRepository: HabitsRepository) {}

  async execute(request: HabitCompletionRequest): Promise<Habit> {
    if (!request.habitId) {
      throw new Error('ID del hábito es requerido');
    }

    if (!request.date) {
      throw new Error('Fecha es requerida');
    }

    // Validar formato de fecha
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(request.date)) {
      throw new Error('Formato de fecha inválido. Use YYYY-MM-DD');
    }

    // Verificar que el hábito existe
    const habit = await this.habitsRepository.getHabitById(request.habitId);
    if (!habit) {
      throw new Error('El hábito no existe');
    }

    return await this.habitsRepository.toggleHabitCompletion(request);
  }
}
