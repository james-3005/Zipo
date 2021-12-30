import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from '../../scss/StartScreenLanding.scss';
import Text_ from '../atoms/Text_';
import ButtonBlue from '../atoms/ButtonBlue';
export default class StartScreenLanding extends React.Component<
  StartScreenLandingProps,
  StartScreenLandingState
> {
  constructor(props: StartScreenLandingProps) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
          <Image
            source={require('../../../assets/chatbot.png')}
            style={styles.icon_Dimension}
          />
        </View>
        <Text_ numberOfLines={3} style={styles.title}>
          Connect easily with your family and friends over countries
        </Text_>
        <Text_ style={styles.policy}>Terms & Privacy Policy</Text_>
        <ButtonBlue text={'Start Messaging'} />
      </View>
    );
  }
}

export interface StartScreenLandingProps {}

interface StartScreenLandingState {}
