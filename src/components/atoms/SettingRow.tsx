import React, { FC, useState } from 'react';
import { TextStyle, TouchableOpacity, View } from 'react-native';
import styles from '../../scss/SettingRow.scss';
import { connect, useDispatch, useSelector } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import { DARK_THEME, LIGHT_THEME } from '../../utilities/theme';
import Text_ from './Text_';
import Svg from '../../../assets/svg/svg';
import { TYPE } from '../../redux/actions';

const SettingRow: FC<SettingRowProps> = (props: SettingRowProps) => {
  const [store] = useState<reduxState>(
    useSelector((state) => state) as reduxState,
  );
  const navigateBack = () => {
    props.navigation.navigate('chat');
  };

  const dispatch = useDispatch();

  const changeMode = () => {
    dispatch({ type: TYPE.SWITCH_THEME });
  };

  const logOut = () => {
    dispatch({ type: TYPE.LOGOUT });
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: props.$store.theme
            ? LIGHT_THEME.THEME
            : DARK_THEME.THEME,
        },
      ]}
      onPress={() => {
        switch (props.text) {
          case 'Account':
            navigateBack();
          case 'Appearance':
            changeMode();
          case 'Log out':
            logOut();

          default:
        }
      }}
    >
      <View
        style={[
          styles.icon,
          {
            backgroundColor: props.$store.theme
              ? LIGHT_THEME.THEME
              : DARK_THEME.THEME,
          },
        ]}
      >
        {props.icon}
      </View>
      <Text_
        style={[
          styles.text,
          {
            backgroundColor: props.$store.theme
              ? LIGHT_THEME.THEME
              : DARK_THEME.THEME,
          },
        ]}
        text={props.text}
      />
      <Svg.ArrowRight
        style={[
          styles.icon,
          {
            backgroundColor: props.$store.theme
              ? LIGHT_THEME.THEME
              : DARK_THEME.THEME,
          },
          styles.ArrowRight,
        ]}
      />
    </TouchableOpacity>
  );
};

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
  action?: () => void;
  navigation?: any;
}
