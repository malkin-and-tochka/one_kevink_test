/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import store from './src/data/store/store';
import {ToastProvider} from 'react-native-toast-notifications';
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <ToastProvider>
        <AppNavigator />
      </ToastProvider>
    </Provider>
  );
}

export default App;
