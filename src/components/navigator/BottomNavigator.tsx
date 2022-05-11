import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from '../../scss/BottomNavigator.scss';
import Svg from '../../../assets/svg/svg';
import Text_ from '../atoms/Text_';
import MatchingScreen from '../screens/MatchingScreen';
import { connect, useDispatch } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import { LIGHT_THEME, DARK_THEME } from '../../utilities/theme';
import ChatScreen from '../screens/ChatScreen';
// @ts-ignore
class BottomNavigator extends React.Component<
  BottomNavigatorProps,
  BottomNavigatorState
> {
  constructor(props: BottomNavigatorProps) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Tabs theme={this.props.$store.theme} />
      </View>
    );
  }
}
// @ts-ignore
const Tabs = ({ theme }) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} theme={theme} />}>
      <Tab.Screen
        name="setting"
        options={{ headerShown: false }}
        component={SettingScreen}
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
        component={ChatScreen}
        key="chat"
      />
      <Tab.Screen
        name="chatScreenDetail"
        options={{ headerShown: false, tabBarStyle: { display: 'none' } }}
        component={ChatScreenDetail}
        key="chatScreenDetail"
      />
    </Tab.Navigator>
  );
};

import { Text } from 'react-native';
import ChatScreenDetail from '../screens/ChatScreenDetail';
import TopBar from '../molecules/TopBar';

import { TYPE } from '../../redux/actions';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';

function Home() {
  // Set an initializing state whilst Firebase connects
  const dispatch = useDispatch();
  // Handle user state changes

  const changeMode = () => {
    dispatch({ type: TYPE.SWITCH_THEME });
  };
  const logOut = () => {
    dispatch({ type: TYPE.LOGOUT });
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TopBar title={'More'} />
      <TouchableOpacity onPress={changeMode}>
        <Text>Change mode</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logOut}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const MyTabBar = ({ state, descriptors, navigation, theme }: any) => {
  if (state.index === 3) return null;
  return (
    <View
      style={[
        styles.bottomTabBar,
        {
          shadowColor: theme ? '#000' : '#FFFFFF',
          shadowOffset: {
            width: 0,
            height: 30,
          },
          shadowOpacity: 1,
          shadowRadius: 28.0,
          elevation: 12,
          backgroundColor: theme ? LIGHT_THEME.THEME : DARK_THEME.THEME,
        },
      ]}
    >
      {state.routes.slice(0, 3).map((route: any, index: Number) => {
        const label = route.name;
        let img;
        const isFocused = state.index === index;
        if (isFocused) {
          if (label === 'setting') img = <Svg.Setting2 theme={theme} />;
          else if (label === 'heart') img = <Svg.Heart2 theme={theme} />;
          else img = <Svg.Chat2 theme={theme} />;
        } else {
          if (label === 'setting') img = <Svg.Setting1 theme={theme} />;
          else if (label === 'heart') img = <Svg.Heart1 theme={theme} />;
          else img = <Svg.Chat1 theme={theme} />;
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

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(BottomNavigator);
export interface BottomNavigatorProps {
  $store: reduxState;
}

interface BottomNavigatorState {}
