import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ModalProvider, useModal } from '../context/ModalContext';

// Componente de prueba para testear el contexto
const TestComponent = () => {
  const { showError, showSuccess, showConfirm, showAlert } = useModal();

  return (
    <>
      <TouchableOpacity
        testID="show-error"
        onPress={() => showError('Error de prueba')}
      >
        <Text>Show Error</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="show-success"
        onPress={() => showSuccess('Éxito de prueba')}
      >
        <Text>Show Success</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="show-confirm"
        onPress={() => 
          showConfirm(
            'Confirmar',
            '¿Estás seguro?',
            () => console.log('Confirmado'),
            () => console.log('Cancelado')
          )
        }
      >
        <Text>Show Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="show-alert"
        onPress={() => showAlert('Alerta', 'Mensaje de alerta')}
      >
        <Text>Show Alert</Text>
      </TouchableOpacity>
    </>
  );
};

const TestWrapper = () => (
  <ModalProvider>
    <TestComponent />
  </ModalProvider>
);

describe('ModalContext', () => {
  it('should render error modal when showError is called', async () => {
    const { getByTestId, getByText } = render(<TestWrapper />);
    
    fireEvent.press(getByTestId('show-error'));
    
    await waitFor(() => {
      expect(getByText('Error')).toBeTruthy();
      expect(getByText('Error de prueba')).toBeTruthy();
      expect(getByText('Aceptar')).toBeTruthy();
    });
  });

  it('should render success modal when showSuccess is called', async () => {
    const { getByTestId, getByText } = render(<TestWrapper />);
    
    fireEvent.press(getByTestId('show-success'));
    
    await waitFor(() => {
      expect(getByText('Éxito')).toBeTruthy();
      expect(getByText('Éxito de prueba')).toBeTruthy();
      expect(getByText('Aceptar')).toBeTruthy();
    });
  });

  it('should render confirm modal when showConfirm is called', async () => {
    const { getByTestId, getByText, getAllByText } = render(<TestWrapper />);
    
    fireEvent.press(getByTestId('show-confirm'));
    
    await waitFor(() => {
      expect(getByText('¿Estás seguro?')).toBeTruthy();
      expect(getByText('Cancelar')).toBeTruthy();
      // Verificar que hay dos elementos con "Confirmar" (título y botón)
      expect(getAllByText('Confirmar')).toHaveLength(2);
    });
  });

  it('should render alert modal when showAlert is called', async () => {
    const { getByTestId, getByText } = render(<TestWrapper />);
    
    fireEvent.press(getByTestId('show-alert'));
    
    await waitFor(() => {
      expect(getByText('Alerta')).toBeTruthy();
      expect(getByText('Mensaje de alerta')).toBeTruthy();
      expect(getByText('Aceptar')).toBeTruthy();
    });
  });

  it('should close modal when backdrop is pressed', async () => {
    const { getByTestId, getByText, queryByText } = render(<TestWrapper />);
    
    fireEvent.press(getByTestId('show-error'));
    
    await waitFor(() => {
      expect(getByText('Error')).toBeTruthy();
      expect(getByText('Error de prueba')).toBeTruthy();
    });

    // Simular tap en el backdrop usando su testID
    const backdrop = getByTestId('modal-backdrop');
    fireEvent.press(backdrop);

    await waitFor(() => {
      expect(queryByText('Error de prueba')).toBeNull();
    });
  });
});
