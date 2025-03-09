import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store'; // configurar un atajo para que quede mejor.

const HomeScreen = () => {
 // Extraemos el usuario del slice de autenticación
 const user = useSelector((state: RootState) => state.auth.user);
  
 return (
    <View style={styles.container}>
       {user ? (
        <Text style={styles.title}>Bienvenido, {user.name}!</Text>
      ) : (
        <Text style={styles.title}>Bienvenido!</Text>
      )}
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
    fontSize: 24
  }
});

export default HomeScreen;
