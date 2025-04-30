import { fireEvent, render, screen } from '@testing-library/react-native';
import FormInput from './FormInput';

describe('FormInput component', () => {
  it('debería renderizar el FormInput con el placeholder correcto', () => {
    const placeHolderText = "Nombre del hábito";

    render(<FormInput placeholder={placeHolderText} value="" onChangeText={() => {}} />);
    

    const placeHolder =  screen.getByPlaceholderText(placeHolderText)
    expect(placeHolder).toBeTruthy();
  });

  it('debería llamar a onChangeText al escribir', () => {
    const handleChange = jest.fn();
    const placeHolderText = "Nombre";
    const placeHolderExpect = 'Nuevo nombre';
    render(<FormInput placeholder={placeHolderText} value="" onChangeText={handleChange} />);

    const placeHolder = screen.getByPlaceholderText(placeHolderText);
    
    fireEvent.changeText(placeHolder, placeHolderExpect);
    
    expect(handleChange).toHaveBeenCalledWith(placeHolderExpect);
  });
  
});