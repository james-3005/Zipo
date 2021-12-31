import React from 'react';
import { View } from 'react-native';
import styles from '../../scss/MatchingScreen.scss';
import TopBar from '../molecules/TopBar';
import Svg from '../../../assets/svg/svg';
import ButtonWave from '../atoms/ButtonWave';
import Text_ from '../atoms/Text_';
import { connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import { LIGHT_THEME, DARK_THEME } from '../../utilities/theme';
class MatchingScreen extends React.Component<
  MatchingScreenProps,
  MatchingScreenState
> {
  constructor(props: MatchingScreenProps) {
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
          <ButtonWave />
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

interface MatchingScreenState {}
