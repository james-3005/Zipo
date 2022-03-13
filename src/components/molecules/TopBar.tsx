import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from '../../scss/TopBar.scss';
import Text_ from '../atoms/Text_';
import { connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import { LIGHT_THEME, DARK_THEME } from '../../utilities/theme';
import Svg from '../../../assets/svg/svg';
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {this.props.back && (
            <TouchableOpacity onPress={this.props.onPress}>
              <Svg.ArrowLeft theme={this.props.$store.theme} />
            </TouchableOpacity>
          )}
          {this.props.title && (
            <Text_
              text={this.props.title}
              style={this.props.back ? styles.headerText2 : styles.headerText}
            />
          )}
        </View>
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
  back?: Boolean;
  onPress?: () => void;
}

interface TopBarState {}
