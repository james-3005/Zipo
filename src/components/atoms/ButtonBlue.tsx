import React from 'react';
import Text_ from './Text_';
import styles from '../../scss/ButtonBlue.scss';
import Ripple from 'react-native-material-ripple';
import { connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import { LIGHT_THEME, DARK_THEME } from '../../utilities/theme';
import LottieView from 'lottie-react-native';
class ButtonBlue extends React.Component<ButtonBlueProps, ButtonBlueState> {
  constructor(props: ButtonBlueProps) {
    super(props);
    this.state = {
      THEME: this.props.$store.theme ? LIGHT_THEME : DARK_THEME,
    };
  }

  render() {
    return (
      <Ripple
        style={
          this.props.isLoading ? styles.container_loading : styles.container
        }
        onPress={this.props.onPress}
      >
        {this.props.isLoading ? (
          <LottieView
            source={require('../../../assets/lottie/loading2.json')}
            loop={true}
            style={styles.loading}
            autoPlay
            speed={1.5}
          />
        ) : (
          <Text_
            text={this.props.text}
            style={{
              color: this.state.THEME.INPUT_COLOR,
            }}
          />
        )}
      </Ripple>
    );
  }
}

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(ButtonBlue);
export interface ButtonBlueProps {
  text: String;
  $store: reduxState;
  onPress?: any;
  isLoading?: Boolean;
}
interface ButtonBlueState {
  THEME: typeof DARK_THEME;
}
