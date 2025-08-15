import React from 'react';
import { View, Text } from 'react-native';
import CircularBackButton from '../atoms/CircularBackButton';
import { signUpScreenStyles } from '../../styles';
import { COLORS } from '../../styles/colors';

interface SignUpHeaderProps {
  onBack: () => void;
}

const SignUpHeader: React.FC<SignUpHeaderProps> = ({ onBack }) => {
  return (
    <View style={signUpScreenStyles.headerContainer}>
      <View style={signUpScreenStyles.backButtonContainer}>
        <CircularBackButton 
          onPress={onBack} 
          color={COLORS.secondary} 
        />
      </View>
      
      <View style={signUpScreenStyles.titleContainer}>
        <Text style={signUpScreenStyles.title}>Crear Cuenta</Text>
        <Text style={signUpScreenStyles.subtitle}>Únete a nosotros</Text>
      </View>
    </View>
  );
};

export default SignUpHeader;
