import React, { FC, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import styles from '../../scss/StartScreenCheckUser.scss';
import { connect, useDispatch, useSelector } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import Text_ from '../atoms/Text_';
import ButtonBlue from '../atoms/ButtonBlue';
import LottieView from 'lottie-react-native';
import { TYPE } from '../../redux/actions';
import { DARK_THEME, LIGHT_THEME } from '../../utilities/theme';
import db from '@react-native-firebase/firestore';
const StartScreenCheckUser: FC<StartScreenCheckUserProps> = (
  props: StartScreenCheckUserProps,
) => {
  const [store2] = useState<reduxState>(
    useSelector((state) => state) as reduxState,
  );
  const dispatch = useDispatch();
  const [isNewUser, setUser] = useState(true);
  useEffect(() => {
    setUser(props.navigation.route.params.user.additionalUserInfo.isNewUser);
  }, []);

  const navigate = () => {
    if (isNewUser) {
      db()
        .collection('users')
        .doc(props.navigation.route.params.user.user.uid)
        .set({
          avatar:
            'https://genvita.vn/resources/avatar/436fd1ac-626d-4572-aa08-d0d49f079122?width=119&height=119&mode=crop',
          gender: true,
          idMatch: null,
          id: props.navigation.route.params.user.user.uid,
          name: '',
        });
    }
    dispatch({ type: TYPE.LOGIN });
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: props.$store.theme
            ? LIGHT_THEME.THEME
            : DARK_THEME.THEME,
        },
      ]}
    >
      <View style={styles.icon}>
        <Image
          source={require('../../../assets/chatbot2.png')}
          style={styles.icon_Dimension}
        />
      </View>
      {isNewUser ? (
        <View style={styles.text}>
          <Text_
            text={'New to Zipo'}
            style={[
              styles.title,
              {
                color: props.$store.theme
                  ? LIGHT_THEME.FONT_COLOR
                  : DARK_THEME.FONT_COLOR,
              },
            ]}
          />
          <Text_
            text={'Please fill in some information to start Zipping'}
            style={[
              styles.title2,
              {
                color: props.$store.theme
                  ? LIGHT_THEME.FONT_COLOR
                  : DARK_THEME.FONT_COLOR,
              },
            ]}
          />
        </View>
      ) : (
        <View style={styles.text}>
          <Text_
            text={"You're all set"}
            style={[
              styles.title,
              {
                color: props.$store.theme
                  ? LIGHT_THEME.FONT_COLOR
                  : DARK_THEME.FONT_COLOR,
              },
            ]}
          />
          <Text_
            text={'Start Zipping now !'}
            style={[
              styles.title2,
              {
                color: props.$store.theme
                  ? LIGHT_THEME.FONT_COLOR
                  : DARK_THEME.FONT_COLOR,
              },
            ]}
          />
        </View>
      )}
      <LottieView
        source={require('../../../assets/lottie/newUser.json')}
        loop={true}
        style={styles.illustration}
        autoPlay
        speed={0.6}
      />
      <ButtonBlue text={'Next'} isLoading={false} onPress={navigate} />
    </View>
  );
};

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(StartScreenCheckUser);

export interface StartScreenCheckUserProps {
  navigation?: any;
  $store: reduxState;
}

interface StartScreenCheckUserState {}
