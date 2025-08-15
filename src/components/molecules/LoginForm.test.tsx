import { render, fireEvent, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import React from 'react';
import LoginForm from './LoginForm';
import { store } from '../../store/store';
import { NavigationContainer } from '@react-navigation/native';


describe('LoginForm ', () => {
  it('debería poder escribir en los inputs', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <LoginForm />
        </NavigationContainer>
      </Provider>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Contraseña');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, '123456');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('123456');
  });

});