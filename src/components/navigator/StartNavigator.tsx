import React, { FC, useState } from 'react';
import { View } from 'react-native';
import styles from '../../scss/StartNavigator.scss';
import { useSelector } from 'react-redux';
import { reduxState } from '../../redux/reducer';

import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import StartScreenLanding from '../screens/StartScreenLanding';
import StartScreenEnterPhone from '../screens/StartScreenEnterPhone';
import StartScreenEnterOTP from '../screens/StartScreenEnterOTP';
import StartScreenCheckUser from '../screens/StartScreenCheckUser';

const StartNavigator: FC = (props: StartNavigatorProps) => {
  const [store] = useState<reduxState>(
    useSelector((state) => state) as reduxState,
  );
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen
        name="startLanding"
        options={{
          headerShown: false,
        }}
        key="startLanding"
      >
        {(navigation) => <StartScreenLanding navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="startEnterPhone"
        options={{ headerShown: false }}
        key="startEnterPhone"
      >
        {(navigation) => <StartScreenEnterPhone navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="startEnterOTP"
        options={{ headerShown: false }}
        key="startEnterOTP"
      >
        {(navigation) => <StartScreenEnterOTP navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="startEnterCheckUser"
        options={{ headerShown: false }}
        key="startEnterCheckUser"
      >
        {(navigation) => <StartScreenCheckUser navigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default StartNavigator;

export interface StartNavigatorProps {}

interface StartNavigatorState {}
