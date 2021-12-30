import React from 'react';
import { View } from 'react-native';
import styles from '../../scss/TopBar.scss';
import Text_ from '../atoms/Text_';

export default class TopBar extends React.Component<TopBarProps, TopBarState> {
  constructor(props: TopBarProps) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text_ style={styles.headerText}>{this.props.title}</Text_>
        <View>{this.props.rightComponent}</View>
      </View>
    );
  }
}

export interface TopBarProps {
  rightComponent: any;
  title: String;
}

interface TopBarState {}
