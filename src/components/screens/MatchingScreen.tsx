import React from 'react';
import { View } from 'react-native';
import styles from '../../scss/MatchingScreen.scss';
import TopBar from '../molecules/TopBar';
import Svg from '../../../assets/svg/svg';
import ButtonWave from '../atoms/ButtonWave';
import Text_ from '../atoms/Text_';
export default class MatchingScreen extends React.Component<
  MatchingScreenProps,
  MatchingScreenState
> {
  constructor(props: MatchingScreenProps) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <TopBar
          rightComponent={
            <View>
              <Svg.Notification />
            </View>
          }
          title={'Matching'}
        />
        <View style={styles.centerContainer}>
          <Text_ style={styles.titleText}>Tap to flirt</Text_>
          <ButtonWave />
        </View>
      </View>
    );
  }
}

export interface MatchingScreenProps {}

interface MatchingScreenState {}
