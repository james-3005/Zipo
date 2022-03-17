import React from 'react';
import { Image, Text, Touchable, View } from 'react-native';
import styles from '../../scss/StartScreenLanding.scss';
import Text_ from '../atoms/Text_';
import ButtonBlue from '../atoms/ButtonBlue';
import { connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import { LIGHT_THEME, DARK_THEME } from '../../utilities/theme';
import { store } from '../../../App';
import { TYPE } from '../../redux/actions';
class StartScreenLanding extends React.Component<
  StartScreenLandingProps,
  StartScreenLandingState
> {
  constructor(props: StartScreenLandingProps) {
    super(props);
  }
  naviagate = () => {
    this.props.navigation.navigation.navigate('startEnterPhone');
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: this.props.$store.theme
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
        <Text_
          numberOfLines={3}
          style={[
            styles.title,
            {
              color: this.props.$store.theme
                ? LIGHT_THEME.FONT_COLOR
                : DARK_THEME.FONT_COLOR,
            },
          ]}
          text={'Connect easily with your family and friends over countries'}
        />
        <Text_
          style={[
            styles.policy,
            {
              color: this.props.$store.theme
                ? LIGHT_THEME.FONT_COLOR
                : DARK_THEME.FONT_COLOR,
            },
          ]}
          text={'Terms & Privacy Policy'}
        />
        <ButtonBlue text={'Start Messaging'} onPress={this.naviagate} />
      </View>
    );
  }
}

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(StartScreenLanding);
export interface StartScreenLandingProps {
  $store: reduxState;
  navigation?: any;
}

interface StartScreenLandingState {}
