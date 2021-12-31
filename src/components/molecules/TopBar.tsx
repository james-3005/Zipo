import React from 'react';
import { View } from 'react-native';
import styles from '../../scss/TopBar.scss';
import Text_ from '../atoms/Text_';
import { connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import { LIGHT_THEME, DARK_THEME } from '../../utilities/theme';
class TopBar extends React.Component<TopBarProps, TopBarState> {
  constructor(props: TopBarProps) {
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
        <Text_ text={this.props.title} style={styles.headerText} />
        <View>{this.props.rightComponent}</View>
      </View>
    );
  }
}

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(TopBar);
export interface TopBarProps {
  rightComponent?: any;
  title?: String;
  $store: reduxState;
}

interface TopBarState {}
