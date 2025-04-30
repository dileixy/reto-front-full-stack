import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa tus pantallas. Asegúrate de crearlas en src/screens/
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CreateHabitScreen from '../screens/CreateHabitScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SignUp:undefined;
  CreateHabit:undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Registro' }} />
        <Stack.Screen name="CreateHabit" component={CreateHabitScreen} options={{ title: 'Nuevo Hábito' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
