// App.tsx
import React from 'react';
import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { ModalProvider } from './src/context/ModalContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <ModalProvider>
        <AppNavigator />
      </ModalProvider>
    </Provider>
  );
};

export default App;
