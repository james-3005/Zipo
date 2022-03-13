import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import styles from '../../scss/MatchingScreen.scss';
import TopBar from '../molecules/TopBar';
import Svg from '../../../assets/svg/svg';
import ButtonWave from '../atoms/ButtonWave';
import Text_ from '../atoms/Text_';
import { connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import { LIGHT_THEME, DARK_THEME } from '../../utilities/theme';
import LottieView from 'lottie-react-native';
class MatchingScreen extends React.Component<
  MatchingScreenProps,
  MatchingScreenState
> {
  animation: React.RefObject<null | any>;
  constructor(props: MatchingScreenProps) {
    super(props);
    this.state = {
      isSearch: false,
      isLoop: false,
    };
    this.animation = React.createRef();
  }
  toggleSearch = () => {
    this.setState(
      { isSearch: !this.state.isSearch, isLoop: !this.state.isLoop },
      () => {
        if (this.state.isSearch) {
          this.animation.current.play(0, 251);
        } else this.animation.current.play(0, 0);
      },
    );
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
        <TopBar
          rightComponent={
            <View>
              <Svg.Notification theme={this.props.$store.theme} />
            </View>
          }
          title={'Matching'}
        />
        <View style={styles.centerContainer}>
          <Text_ style={styles.titleText} text={'Tap to flirt'} />
          <TouchableWithoutFeedback onPress={this.toggleSearch}>
            <LottieView
              source={require('../../../assets/lottie/searching.json')}
              loop={this.state.isLoop}
              style={styles.searching}
              ref={this.animation}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(MatchingScreen);
export interface MatchingScreenProps {
  $store: reduxState;
}

interface MatchingScreenState {
  isSearch: boolean;
  isLoop: boolean;
}
