import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from '../../scss/StartScreenLanding.scss';
import Text_ from '../atoms/Text_';
import ButtonBlue from '../atoms/ButtonBlue';
import { connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import { LIGHT_THEME, DARK_THEME } from '../../utilities/theme';
class StartScreenLanding extends React.Component<
  StartScreenLandingProps,
  StartScreenLandingState
> {
  constructor(props: StartScreenLandingProps) {
    super(props);
  }
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
            source={require('../../../assets/chatbot.png')}
            style={styles.icon_Dimension}
          />
        </View>
        <Text_
          numberOfLines={3}
          style={styles.title}
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
        <ButtonBlue text={'Start Messaging'} />
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
}

interface StartScreenLandingState {}
