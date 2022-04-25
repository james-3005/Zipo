import React, { FC, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import BottomNavigator from './BottomNavigator';
import StartNavigator from './StartNavigator';
import { SafeAreaView } from 'react-native';
import AnimatedSplash from 'react-native-animated-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { GET_LOG, GET_THEME } from '../../utilities/asyncStorage';
import { TYPE } from '../../redux/actions';
const Navigator: FC<NavigatorProps> = (props: NavigatorProps) => {
  const [store2] = useState<reduxState>(
    useSelector((state) => state) as reduxState,
  );
  const dispatch = useDispatch();
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  useEffect(() => {
    dispatch(getAsyncStorage() as any);
    setTimeout(() => {
      setIsAppLoaded(true);
    }, 1000);
  }, []);

  const getAsyncStorage =
    () =>
    (dispatch: any): void => {
      GET_THEME().then((result) => {
        dispatch({ type: TYPE.SWITCH_THEME, payload: result });
      });
      GET_LOG().then((result) => {
        if (result) dispatch({ type: TYPE.LOGIN });
        else dispatch({ type: TYPE.LOGOUT });
      });
    };
  return (
    <AnimatedSplash
      isLoaded={isAppLoaded}
      logoImage={require('../../../assets/chatbot2.png')}
      backgroundColor={'#262626'}
      logoHeight={150}
      logoWidth={150}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          {props.$store.isLog ? (
            <>
              <BottomNavigator />
            </>
          ) : (
            <StartNavigator />
          )}
        </NavigationContainer>
      </SafeAreaView>
    </AnimatedSplash>
  );
};

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(Navigator);
export interface NavigatorProps {
  $store: reduxState;
}

interface NavigatorState {}
