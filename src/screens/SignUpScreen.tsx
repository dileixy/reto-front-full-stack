import React from 'react';
import { View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import SignUpForm from '../components/molecules/SignUpForm';

const SignUpScreen = () => {
  return (
    <View style={globalStyles.container}>
      <SignUpForm />
    </View>
  );
};

export default SignUpScreen;