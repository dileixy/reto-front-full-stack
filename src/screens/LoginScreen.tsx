import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

const LoginScreen = ({ navigation }: any) => {

	const dispatch = useDispatch();
	
	const handleLogin = () => {
    // Ejemplo de login.
		// se deben validar credenciales ect para luego realizaar esto.
    dispatch(login({ id: '1', name: 'Dileixy G' }));
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <Button title="Ingresar" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
    fontSize: 24,
    marginBottom: 20
  }
});

export default LoginScreen;
