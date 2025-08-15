// Utilities for frequency-related logic
import { HabitFrequency } from '../types/frequency';

/**
 * Determines if a habit should be completed today based on its frequency
 */
export const shouldHabitBeCompletedToday = (
  frequency: HabitFrequency,
  createdAt: string,
  completedDates: string[]
): boolean => {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  
  // If already completed today, return true
  if (completedDates.includes(todayString)) {
    return true;
  }

  const createdDate = new Date(createdAt);
  const daysSinceCreated = Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));

  switch (frequency) {
    case HabitFrequency.DAILY:
      return true; // Daily habits should always be available

    case HabitFrequency.WEEKLY:
      // Weekly habits should be available if it's been at least a week since creation
      // or since last completion
      if (completedDates.length === 0) {
        return daysSinceCreated >= 0; // Available from creation day
      }
      
      const lastCompleted = new Date(completedDates[completedDates.length - 1]);
      const daysSinceLastCompleted = Math.floor((today.getTime() - lastCompleted.getTime()) / (1000 * 60 * 60 * 24));
      return daysSinceLastCompleted >= 7;

    case HabitFrequency.MONTHLY:
      // Monthly habits should be available if it's been at least a month since creation
      // or since last completion
      if (completedDates.length === 0) {
        return daysSinceCreated >= 0; // Available from creation day
      }
      
      const lastCompletedMonthly = new Date(completedDates[completedDates.length - 1]);
      const monthsSinceLastCompleted = (today.getFullYear() - lastCompletedMonthly.getFullYear()) * 12 + 
                                     (today.getMonth() - lastCompletedMonthly.getMonth());
      return monthsSinceLastCompleted >= 1;

    default:
      return true;
  }
};

/**
 * Calculates the next due date for a habit based on its frequency
 */
export const getNextDueDate = (
  frequency: HabitFrequency,
  lastCompletedDate?: string
): string => {
  const baseDate = lastCompletedDate ? new Date(lastCompletedDate) : new Date();
  
  switch (frequency) {
    case HabitFrequency.DAILY:
      baseDate.setDate(baseDate.getDate() + 1);
      break;
      
    case HabitFrequency.WEEKLY:
      baseDate.setDate(baseDate.getDate() + 7);
      break;
      
    case HabitFrequency.MONTHLY:
      baseDate.setMonth(baseDate.getMonth() + 1);
      break;
  }
  
  return baseDate.toISOString().split('T')[0];
};

/**
 * Gets a human-readable description of when the habit is due
 */
export const getFrequencyDescription = (frequency: HabitFrequency): string => {
  switch (frequency) {
    case HabitFrequency.DAILY:
      return 'Todos los días';
    case HabitFrequency.WEEKLY:
      return 'Una vez por semana';
    case HabitFrequency.MONTHLY:
      return 'Una vez por mes';
    default:
      return frequency;
  }
};

/**
 * Calculates current streak for a habit
 */
export const calculateStreak = (
  frequency: HabitFrequency,
  completedDates: string[]
): number => {
  if (completedDates.length === 0) return 0;

  const today = new Date();
  const sortedDates = completedDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  let streak = 0;
  let currentDate = new Date(today);
  
  for (const completedDate of sortedDates) {
    const completed = new Date(completedDate);
    
    let expectedInterval: number;
    switch (frequency) {
      case HabitFrequency.DAILY:
        expectedInterval = 1;
        break;
      case HabitFrequency.WEEKLY:
        expectedInterval = 7;
        break;
      case HabitFrequency.MONTHLY:
        expectedInterval = 30; // Approximate
        break;
      default:
        expectedInterval = 1;
    }
    
    const daysDiff = Math.floor((currentDate.getTime() - completed.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= expectedInterval) {
      streak++;
      currentDate = completed;
    } else {
      break;
    }
  }
  
  return streak;
};
