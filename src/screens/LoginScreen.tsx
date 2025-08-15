import React from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useLoginScreen } from '../presentation/hooks/useLoginScreen';
import { LoginHeader, LoginContainer } from '../components/organisms';
import { globalStyles } from '../styles/globalStyles';
import { COLORS } from '../styles/colors';

const LoginScreen = () => {
  const {
    email,
    password,
    loading,
    error,
    handleLogin,
    handleGoToSignUp,
    handleEmailChange,
    handlePasswordChange,
  } = useLoginScreen();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[globalStyles.container, { justifyContent: 'center', backgroundColor: COLORS.primary }]}>
          <LoginHeader />
          
          <LoginContainer
            email={email}
            password={password}
            loading={loading}
            error={error}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            onLogin={handleLogin}
            onGoToSignUp={handleGoToSignUp}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
