import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import BottomNavigator from './src/components/navigator/BottomNavigator';
import StartNavigator from './src/components/navigator/StartNavigator';
import AnimatedSplash from 'react-native-animated-splash-screen';
import { createStore } from 'redux';
import Reducer from './src/redux/reducer';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import auth from '@react-native-firebase/auth';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
const App = () => {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [currentUser, setCurrentAuth] = useState(auth().currentUser);
  // @ts-ignore
  const store = createStore(Reducer);
  useEffect(() => {
    setTimeout(() => {
      setIsAppLoaded(true);
    }, 1000);
    auth().onAuthStateChanged((user) => {
      if (user) setCurrentAuth(user);
    });
  }, []);
  return (
    <AnimatedSplash
      translucent={false}
      isLoaded={isAppLoaded}
      logoImage={require('./assets/chatbot2.png')}
      backgroundColor={'#262626'}
      logoHeight={150}
      logoWidth={150}
    >
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            {!currentUser ? <BottomNavigator /> : <StartNavigator />}
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    </AnimatedSplash>
  );
};

export default App;
