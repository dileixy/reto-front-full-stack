import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button';

describe('Button component', () => {
  it('debería renderizar el título que recibe', () => {
    //Arrange
    const titleExpect = "Ingresar";

    //Act
    const { getByText } = render(<Button title={titleExpect} onPress={() => {}} />);

    //Assert
    const currentText = getByText(titleExpect);
    expect(currentText).toBeTruthy();
  });

  it('debería llamar a onPress cuando se presiona', () => {
    //Arrange
    const mockOnPress = jest.fn();

    const { getByTestId } = render(
      <Button title="Ingresar" onPress={mockOnPress} testID="login-button" />
    );
    //Act
    const button = getByTestId('login-button');
    fireEvent.press(button);

    //Assert
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('debería estar deshabilitado si recibe disabled', () => {
    const disabled = true;
    const mockOnPress = jest.fn();

    const { getByTestId } = render(
      <Button title="Ingresar" disabled={disabled} onPress={mockOnPress} testID="login-button" />
    );

    const button = getByTestId('login-button');
    const buttomProps = button.props.accessibilityState.disabled;
    expect(buttomProps).toBe(true);
  });
});