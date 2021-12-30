import React from 'react';
import { View, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import styles from '../../scss/ButtonWave.scss';
import Svg from '../../../assets/svg/svg';
export default class ButtonWave extends React.Component<
  ButtonWaveProps,
  ButtonWaveState
> {
  constructor(props: ButtonWaveProps) {
    super(props);
    this.state = {
      scale1: new Animated.Value(1),
      opacity1: new Animated.Value(1),
      scale2: new Animated.Value(1),
      opacity2: new Animated.Value(1),
      isWaving: false,
      isBeingWave: false,
    };
  }
  toggleWaving = () => {
    this.setState({ isWaving: !this.state.isWaving }, () => {
      if (!this.state.isWaving) {
        this.state.scale1.stopAnimation();
        this.state.opacity1.stopAnimation();
        this.state.scale2.stopAnimation();
        this.state.opacity2.stopAnimation();
        this.state.opacity2.setValue(1);
        this.state.scale1.setValue(1);
        this.state.opacity1.setValue(1);
        this.state.scale2.setValue(1);
        this.setState({ isBeingWave: false });
        return;
      }
      if (!this.state.isBeingWave) {
        this.waving();
        this.setState({ isBeingWave: true });
      }
    });
  };
  waving = () => {
    Animated.parallel([
      Animated.parallel([
        Animated.loop(
          Animated.timing(this.state.scale1, {
            toValue: 1.4,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ),
        Animated.loop(
          Animated.timing(this.state.opacity1, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ),
      ]),
      Animated.sequence([
        Animated.delay(1000),
        Animated.parallel([
          Animated.loop(
            Animated.timing(this.state.scale2, {
              toValue: 1.4,
              duration: 3000,
              useNativeDriver: true,
              easing: Easing.linear,
            }),
          ),
          Animated.loop(
            Animated.timing(this.state.opacity2, {
              toValue: 0,
              duration: 3000,
              useNativeDriver: true,
              easing: Easing.linear,
            }),
          ),
        ]),
      ]),
    ]).start();
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.toggleWaving}>
        <View style={styles.container}>
          <View style={[styles.mainCircle]}>
            <Svg.WeatherRain />
          </View>
          <Animated.View
            style={[
              styles.wave_1,
              {
                transform: [{ scale: this.state.scale1 }],
                opacity: this.state.opacity1,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.wave_2,
              {
                transform: [{ scale: this.state.scale2 }],
                opacity: this.state.opacity2,
              },
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export interface ButtonWaveProps {}

interface ButtonWaveState {
  scale1: any;
  opacity1: any;
  scale2: any;
  opacity2: any;
  isWaving: Boolean;
  isBeingWave: Boolean;
}
