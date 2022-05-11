import React, { FC, useState } from 'react';
import { TextStyle, View } from 'react-native';
import styles from '../../scss/SettingRow.scss';
import { useSelector, connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import { DARK_THEME, LIGHT_THEME } from '../../utilities/theme';
import Text_ from './Text_';
import Svg from '../../../assets/svg/svg';
class SettingRow extends React.Component<SettingRowProps, SettingRowState> {
  constructor(props: SettingRowProps) {
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
        <View
          style={[
            styles.icon,
            {
              backgroundColor: this.props.$store.theme
                ? LIGHT_THEME.THEME
                : DARK_THEME.THEME,
            },
          ]}
        >
          {this.props.icon}
        </View>
        <Text_
          style={[
            styles.text,
            {
              backgroundColor: this.props.$store.theme
                ? LIGHT_THEME.THEME
                : DARK_THEME.THEME,
            },
          ]}
          text={this.props.text}
        />
        <Svg.ArrowRight
          style={[
            styles.icon,
            {
              backgroundColor: this.props.$store.theme
                ? LIGHT_THEME.THEME
                : DARK_THEME.THEME,
            },
            styles.ArrowRight,
          ]}
        />
      </View>
    );
  }
}

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(SettingRow);

export interface SettingRowProps {
  $store: reduxState;
  style?: TextStyle | TextStyle[];
  numberOfLines?: Number;
  text?: String | Number | undefined | Boolean;
  svg?: typeof Svg;
  icon?: any;
}

interface SettingRowState {}
