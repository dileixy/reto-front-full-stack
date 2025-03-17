// App.tsx
import React from 'react';
import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
