// Utility function to translate and customize error messages from Supabase
export const getCustomErrorMessage = (error: string): string => {
  // Defensive check for null/undefined
  if (!error || typeof error !== 'string') {
    return 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.';
  }

  const errorLower = error.toLowerCase();

  // Authentication errors
  if (errorLower.includes('invalid login credentials')) {
    return 'Las credenciales ingresadas no son correctas. Por favor, verifica tu email y contraseña.';
  }
  
  if (errorLower.includes('user not found')) {
    return 'No existe una cuenta con este email. ¿Te gustaría crear una cuenta nueva?';
  }
  
  if (errorLower.includes('email not confirmed')) {
    return 'Tu cuenta aún no ha sido confirmada. Por favor, revisa tu correo electrónico y confirma tu cuenta.';
  }
  
  if (errorLower.includes('too many requests')) {
    return 'Has intentado iniciar sesión muchas veces. Por favor, espera unos minutos antes de intentar nuevamente.';
  }
  
  if (errorLower.includes('weak password')) {
    return 'La contraseña debe tener al menos 6 caracteres y ser más segura.';
  }
  
  if (errorLower.includes('email already registered') || errorLower.includes('user already registered')) {
    return 'Ya existe una cuenta con este email. ¿Te gustaría iniciar sesión en su lugar?';
  }
  
  if (errorLower.includes('invalid email')) {
    return 'Por favor, ingresa un email válido.';
  }
  
  if (errorLower.includes('password should be at least')) {
    return 'La contraseña debe tener al menos 6 caracteres.';
  }
  
  // Network errors
  if (errorLower.includes('network') || errorLower.includes('connection')) {
    return 'No se pudo conectar al servidor. Por favor, verifica tu conexión a internet.';
  }
  
  if (errorLower.includes('timeout')) {
    return 'La operación tardó demasiado tiempo. Por favor, inténtalo nuevamente.';
  }
  
  // Registration errors
  if (errorLower.includes('signup is disabled')) {
    return 'El registro de nuevas cuentas está temporalmente deshabilitado.';
  }
  
  // Generic errors
  if (errorLower.includes('server error') || errorLower.includes('internal error')) {
    return 'Ocurrió un error en el servidor. Por favor, inténtalo más tarde.';
  }
  
  // If no specific error is found, return a generic friendly message
  return 'Ocurrió un error inesperado. Por favor, inténtalo nuevamente.';
};
