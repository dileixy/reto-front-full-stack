import React from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Platform, Image, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import LoginForm from '../components/molecules/LoginForm';
import { images } from '../assets/images/images';
import { COLORS } from '../styles/colors';

const LoginScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[globalStyles.container, { justifyContent: 'center', backgroundColor: COLORS.primary }]}>
          <Image source={images.logo} style={globalStyles.logo} />

          <LoginForm />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
