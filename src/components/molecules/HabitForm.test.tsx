import { render, fireEvent, screen } from '@testing-library/react-native';
import HabitForm from './HabitForm';
import { Alert } from 'react-native';

describe('HabitForm ', () => {
  it('debería renderizar los campos y el botón HabitForm', () => {
    const mockSubmit = jest.fn();

    render(<HabitForm onSubmit={mockSubmit} />);

    const placeHolderName = screen.getByPlaceholderText('Nombre del Hábito');
    const placeHolderDescription = screen.getByPlaceholderText('Descripción');
    const placeHolderFrecuencia = screen.getByPlaceholderText('Frecuencia');
    const buttonText = screen.getByText('Registrar Hábito');

    expect(placeHolderName).toBeTruthy();
    expect(placeHolderDescription).toBeTruthy();
    expect(placeHolderFrecuencia).toBeTruthy();
    expect(buttonText).toBeTruthy();
  });

  it('debería poder escribir en los inputs', () => {
    const handleChange = jest.fn();
    render(<HabitForm onSubmit={handleChange} />);

    const placeHolderName = 'Nombre del Hábito';
    const nameExp = 'Correr';
    const placeHolderDescription = 'Descripción';
    const descriptionExp = 'A mediana intensidad';
    const placeHolderFrecuencia = 'Frecuencia';
    const frecuenciaExp = '30min';

    const inputName = screen.getByPlaceholderText(placeHolderName);
    const inputDescription = screen.getByPlaceholderText(placeHolderDescription);
    const inputFrequency = screen.getByPlaceholderText(placeHolderFrecuencia);
    
    fireEvent.changeText(inputName, nameExp);
    fireEvent.changeText(inputDescription, descriptionExp);
    fireEvent.changeText(inputFrequency, frecuenciaExp);

    expect(inputName.props.value).toBe('Correr');
    expect(inputDescription.props.value).toBe('A mediana intensidad');
    expect(inputFrequency.props.value).toBe('30min');
  });

  it('debería mostrar una alerta al presionar el botón', () => {
    const mockSubmit = jest.fn();

    render(<HabitForm onSubmit={mockSubmit} />);

    const alertMock = jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(<HabitForm onSubmit={mockSubmit} />);
    
    const button = getByTestId('registrar-habito');
    fireEvent.press(button);

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith(
      'Error',
      'Por favor ingresa todos los campos',
    );

    // Limpieza del mock
    alertMock.mockRestore();
  });

  it('debería llamar onSubmit con los valores correctos', () => {
    const mockOnSubmit = jest.fn();
    render(<HabitForm onSubmit={mockOnSubmit} />);

    const placeHolderName = 'Nombre del Hábito';
    const nameExp = 'Correr';
    const placeHolderDescription = 'Descripción';
    const descriptionExp = 'A mediana intensidad';
    const placeHolderFrecuencia = 'Frecuencia';
    const frecuenciaExp = '30min';

    const inputName = screen.getByPlaceholderText(placeHolderName);
    const inputDescription = screen.getByPlaceholderText(placeHolderDescription);
    const inputFrequency = screen.getByPlaceholderText(placeHolderFrecuencia);
    
    fireEvent.changeText(inputName, nameExp);
    fireEvent.changeText(inputDescription, descriptionExp);
    fireEvent.changeText(inputFrequency, frecuenciaExp);

    fireEvent.press(screen.getByTestId('registrar-habito'));

    // Verificamos que se haya llamado el submit correctamente
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Correr',
      description: 'A mediana intensidad',
      frequency: '30min',
    });
  });
});
