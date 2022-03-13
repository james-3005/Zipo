import React from 'react';
import { Text, TextStyle, View } from 'react-native';
import styles from '../../scss/Text_.scss';
import { connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import { LIGHT_THEME, DARK_THEME } from '../../utilities/theme';
class Text_ extends React.Component<Text_Props, Text_State> {
  constructor(props: Text_Props) {
    super(props);
  }

  render() {
    return (
      <Text
        style={[
          styles.container,
          {
            color: this.props.$store.theme
              ? LIGHT_THEME.FONT_COLOR
              : DARK_THEME.FONT_COLOR,
          },
          this.props.style,
        ]}
      >
        {this.props.text}
      </Text>
    );
  }
}
function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(Text_);
export interface Text_Props {
  style?: TextStyle | TextStyle[];
  numberOfLines?: Number;
  $store: reduxState;
  text?: String | Number | undefined | Boolean;
}

interface Text_State {}
