import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from '../../scss/BottomNavigator.scss';
import Svg from '../../../assets/svg/svg';
import Text_ from '../atoms/Text_';
import MatchingScreen from '../screens/MatchingScreen';
import { connect } from 'react-redux';
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
        component={ChatScreen}
        key="chat"
      />
    </Tab.Navigator>
  );
};
import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import auth from '@react-native-firebase/auth';

function Home() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}
// const Home = () => {
//   return (
//     <View style={{ flex: 1 }}>
//       <Text_ text={'Home'} />
//     </View>
//   );
// };
const MyTabBar = ({ state, descriptors, navigation, theme }: any) => {
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
      {state.routes.map((route: any, index: Number) => {
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
