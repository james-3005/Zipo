import React from 'react';
import Text_ from './Text_';
import styles from '../../scss/ButtonBlue.scss';
import Ripple from 'react-native-material-ripple';
export default class ButtonBlue extends React.Component<
  ButtonBlueProps,
  ButtonBlueState
> {
  constructor(props: ButtonBlueProps) {
    super(props);
  }
  render() {
    return (
      <Ripple style={styles.container}>
        <Text_ text={this.props.text} />
      </Ripple>
    );
  }
}

export interface ButtonBlueProps {
  text: String;
}

interface ButtonBlueState {}
