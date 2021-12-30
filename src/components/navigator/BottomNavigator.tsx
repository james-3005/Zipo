import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from '../../scss/BottomNavigator.scss';
import Svg from '../../../assets/svg/svg';
import Text_ from '../atoms/Text_';
import MatchingScreen from '../screens/MatchingScreen';
export default class BottomNavigator extends React.Component<
  BottomNavigatorProps,
  BottomNavigatorState
> {
  constructor(props: BottomNavigatorProps) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Tabs />
      </View>
    );
  }
}

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen
        name="setting"
        options={{ headerShown: false }}
        component={Home}
        key="setting"
      />
      <Tab.Screen
        name="heart"
        options={{ headerShown: false }}
        component={MatchingScreen}
        key="heart"
      />
      <Tab.Screen
        name="chat"
        options={{ headerShown: false }}
        component={Home}
        key="chat"
      />
    </Tab.Navigator>
  );
};
const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text_>HomeScreen</Text_>
    </View>
  );
};
const MyTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View
      style={[
        styles.bottomTabBar,
        {
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 24,
          },
          shadowOpacity: 1,
          shadowRadius: 16.0,
          elevation: 24,
        },
      ]}
    >
      {state.routes.map((route: any, index: Number) => {
        const label = route.name;
        let img;
        const isFocused = state.index === index;
        if (isFocused) {
          if (label === 'setting') img = <Svg.Setting2 />;
          else if (label === 'heart') img = <Svg.Heart2 />;
          else img = <Svg.Chat2 />;
        } else {
          if (label === 'setting') img = <Svg.Setting1 />;
          else if (label === 'heart') img = <Svg.Heart1 />;
          else img = <Svg.Chat1 />;
        }
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return (
          <TouchableOpacity
            key={`tab_${index}`}
            onPress={onPress}
            style={styles.icon}
          >
            {img}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export interface BottomNavigatorProps {}

interface BottomNavigatorState {}
