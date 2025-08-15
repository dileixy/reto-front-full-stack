// Infrastructure Implementation for Habits
import { HabitsRepository } from '../../domain/repositories/HabitsRepository';
import { Habit, CreateHabitRequest, UpdateHabitRequest, HabitCompletionRequest } from '../../domain/entities/Habit';
import { supabase } from '../../config/supabase';

export class SupabaseHabitsRepository implements HabitsRepository {
  private readonly tableName = 'habits';

  async getHabits(userId: string): Promise<Habit[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error al obtener hábitos: ${error.message}`);
    }
    
    return (data || []).map(this.mapToHabit);
  }

  async createHabit(request: CreateHabitRequest, userId: string): Promise<Habit> {
    const habitData = {
      name: request.name,
      description: request.description,
      frequency: request.frequency,
      is_completed: false,
      completed_dates: [],
      user_id: userId,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from(this.tableName)
      .insert(habitData)
      .select()
      .single();

    if (error) {
      throw new Error(`Error al crear hábito: ${error.message}`);
    }

    if (!data) {
      throw new Error('No se pudo crear el hábito');
    }

    return this.mapToHabit(data);
  }

  async updateHabit(request: UpdateHabitRequest): Promise<Habit> {
    const updateData: any = {};
    
    if (request.name !== undefined) updateData.name = request.name;
    if (request.description !== undefined) updateData.description = request.description;
    if (request.frequency !== undefined) updateData.frequency = request.frequency;
    if (request.isCompleted !== undefined) updateData.is_completed = request.isCompleted;

    const { data, error } = await supabase
      .from(this.tableName)
      .update(updateData)
      .eq('id', request.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error al actualizar hábito: ${error.message}`);
    }

    if (!data) {
      throw new Error('No se pudo actualizar el hábito');
    }

    return this.mapToHabit(data);
  }

  async deleteHabit(habitId: string): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', habitId);

    if (error) {
      throw new Error(`Error al eliminar hábito: ${error.message}`);
    }
  }

  async toggleHabitCompletion(request: HabitCompletionRequest): Promise<Habit> {
    // Primero obtenemos el hábito actual
    const currentHabit = await this.getHabitById(request.habitId);
    if (!currentHabit) {
      throw new Error('Hábito no encontrado');
    }

    const completedDates = [...currentHabit.completedDates];
    const dateIndex = completedDates.indexOf(request.date);
    
    // Toggle: si ya está completado para esa fecha, lo removemos; si no, lo agregamos
    if (dateIndex > -1) {
      completedDates.splice(dateIndex, 1);
    } else {
      completedDates.push(request.date);
    }

    // Actualizar en la base de datos
    const { data, error } = await supabase
      .from(this.tableName)
      .update({
        completed_dates: completedDates,
        is_completed: completedDates.includes(new Date().toISOString().split('T')[0])
      })
      .eq('id', request.habitId)
      .select()
      .single();

    if (error) {
      throw new Error(`Error al actualizar completación del hábito: ${error.message}`);
    }

    if (!data) {
      throw new Error('No se pudo actualizar la completación del hábito');
    }

    return this.mapToHabit(data);
  }

  async getHabitById(habitId: string): Promise<Habit | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', habitId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      throw new Error(`Error al obtener hábito: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    return this.mapToHabit(data);
  }

  private mapToHabit(data: any): Habit {
    // Determinar el estado de completado
    let isCompleted = false;
    let completedDates: string[] = [];
    
    // Priorizar la nueva estructura, pero ser retrocompatible
    if (data.is_completed !== null && data.is_completed !== undefined) {
      isCompleted = data.is_completed;
    } else if (data.completed !== null && data.completed !== undefined) {
      isCompleted = data.completed;
    }
    
    // Manejar las fechas completadas
    if (data.completed_dates && Array.isArray(data.completed_dates)) {
      completedDates = data.completed_dates;
    } else if (data.completedDates && Array.isArray(data.completedDates)) {
      completedDates = data.completedDates;
    } else {
      // Si es un hábito antiguo que estaba completado, asumir que fue completado hoy
      if (isCompleted && !completedDates.length) {
        const today = new Date().toISOString().split('T')[0];
        completedDates = [today];
      }
    }
    
    // Actualizar isCompleted basado en si está completado hoy
    const today = new Date().toISOString().split('T')[0];
    isCompleted = completedDates.includes(today);
    
    const mapped: Habit = {
      id: data.id,
      name: data.name || '',
      description: data.description || '',
      frequency: data.frequency || 'Diario',
      isCompleted,
      completedDates,
      createdAt: data.created_at || data.createdAt || new Date().toISOString(),
      userId: data.user_id || data.userId || '',
    };
    
    return mapped;
  }
}
