import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignUpForm from './SignUpForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../store/authSlice';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: { auth: authReducer },
  });

  return render(
    <Provider store={store}>
      <NavigationContainer>
        {ui}
      </NavigationContainer>
    </Provider>
  );
};

describe('SignUpForm', () => {
  it('debería permitir escribir en los inputs de correo y contraseña', () => {
    const { getByPlaceholderText } = renderWithProviders(<SignUpForm />);

    const emailInput = getByPlaceholderText('Correo electrónico');
    const passwordInput = getByPlaceholderText('Contraseña');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, '123456');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('123456');
  });
});

describe('SignUpForm - validación de Alertas', () => {
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('muestra alerta si los campos están vacíos', () => {
      const { getByText } = renderWithProviders(<SignUpForm />);
      fireEvent.press(getByText('Registrarse'));
  
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Por favor, ingresa tu email y contraseña.'
      );
    });
  
    it('muestra alerta si el email no es válido', () => {
      const { getByPlaceholderText, getByText } = renderWithProviders(<SignUpForm />);
      fireEvent.changeText(getByPlaceholderText('Correo electrónico'), 'correo');
      fireEvent.changeText(getByPlaceholderText('Contraseña'), '123456');
      fireEvent.press(getByText('Registrarse'));
  
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Por favor, ingresa un email válido.'
      );
    });
  
    it('muestra alerta si la contraseña es muy corta', () => {
      const { getByPlaceholderText, getByText } = renderWithProviders(<SignUpForm />);
      fireEvent.changeText(getByPlaceholderText('Correo electrónico'), 'test@example.com');
      fireEvent.changeText(getByPlaceholderText('Contraseña'), '123');
      fireEvent.press(getByText('Registrarse'));
  
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'La contraseña debe tener al menos 6 caracteres.'
      );
    });
});
