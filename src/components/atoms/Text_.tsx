import React from 'react';
import { Text, TextStyle } from 'react-native';
import styles from '../../scss/Text_.scss';

export default class Text_ extends React.Component<Text_Props, Text_State> {
  constructor(props: Text_Props) {
    super(props);
  }

  render() {
    return (
      <Text style={[styles.container, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}
export interface Text_Props {
  style?: TextStyle;
  numberOfLines?: Number;
}

interface Text_State {}
