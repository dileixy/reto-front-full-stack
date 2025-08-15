import React from 'react';
import { View } from 'react-native';
import { useSignUpScreen } from '../presentation/hooks/useSignUpScreen';
import { SignUpHeader, SignUpForm } from '../components/organisms';
import { signUpScreenStyles } from '../styles';

const SignUpScreen = () => {
  const {
    email,
    password,
    confirmPassword,
    loading,
    handleRegister,
    handleGoToLogin,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = useSignUpScreen();

  return (
    <View style={signUpScreenStyles.container}>
      <SignUpHeader onBack={handleGoToLogin} />
      
      <SignUpForm
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        loading={loading}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onConfirmPasswordChange={handleConfirmPasswordChange}
        onRegister={handleRegister}
        onGoToLogin={handleGoToLogin}
      />
    </View>
  );
};

export default SignUpScreen;