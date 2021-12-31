import React from 'react';
import {
  Keyboard,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from '../../scss/StartScreenEnterPhone.scss';
import Text_ from '../atoms/Text_';
import ButtonBlue from '../atoms/ButtonBlue';
const OS = Platform.OS;
import { connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import { LIGHT_THEME, DARK_THEME } from '../../utilities/theme';
class StartScreenEnterPhone extends React.Component<
  StartScreenEnterPhoneProps,
  StartScreenEnterPhoneState
> {
  constructor(props: StartScreenEnterPhoneProps) {
    super(props);
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
          <Text_ text={'Enter Your Phone Number'} style={styles.title} />
          <Text_
            text={
              'Please confirm your country code and enter your phone number'
            }
            style={styles.subTitle}
          />
          <View style={styles.enterPhoneContainer}>
            <Text_ text={'VN'} style={{ marginRight: 15 }} />
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: this.props.$store.theme
                    ? LIGHT_THEME.INPUT_COLOR
                    : DARK_THEME.INPUT_COLOR,
                },
              ]}
              placeholder="Phone Number"
              placeholderTextColor={
                this.props.$store.theme
                  ? LIGHT_THEME.FONT_COLOR
                  : DARK_THEME.FONT_COLOR
              }
              keyboardType={OS === 'android' ? 'numeric' : 'number-pad'}
            />
          </View>
          <ButtonBlue text={'Continue'} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(StartScreenEnterPhone);

export interface StartScreenEnterPhoneProps {
  $store: reduxState;
}

interface StartScreenEnterPhoneState {}
