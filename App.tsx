import 'react-native-gesture-handler';
import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import Reducer from './src/redux/reducer';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import thunk from 'redux-thunk';
import Navigator from './src/components/navigator/Navigator';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'Non-serializable values were found in the navigation state',
  'Require cycle',
  'Error: [auth/no-current-user] No user currently signed in.',
]);
const App = () => {
  const store = createStore(Reducer as any, applyMiddleware(thunk));
  // dark  : "#262626"
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};
export default App;
