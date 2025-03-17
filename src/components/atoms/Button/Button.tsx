import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles'; // Importando estilos locales

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const Button = ({ title, onPress, disabled = false }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
