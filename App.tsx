import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

import styles from './App.scss';
import Text_ from './src/components/atoms/Text_';
import BottomNavigator from './src/components/navigator/BottomNavigator';
import ProfileScreen from './src/components/screens/ProfileScreen';
import StartScreenEnterOTP from './src/components/screens/StartScreenEnterOTP';
import StartScreenEnterPhone from './src/components/screens/StartScreenEnterPhone';
import StartScreenLanding from './src/components/screens/StartScreenLanding';
import { createStore } from 'redux';
import Reducer from './src/redux/reducer';
import { Provider } from 'react-redux';
const App = () => {
  // @ts-ignore
  const store = createStore(Reducer);

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <BottomNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
