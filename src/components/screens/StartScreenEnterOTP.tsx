import React, { ElementRef } from 'react';
import {
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from '../../scss/StartScreenEnterOTP.scss';
import ButtonBlue from '../atoms/ButtonBlue';
import Text_ from '../atoms/Text_';
import { connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import { LIGHT_THEME, DARK_THEME } from '../../utilities/theme';
const OS = Platform.OS;
const OTP = [0, 1, 2, 3];
class StartScreenEnterOTP extends React.Component<
  StartScreenEnterOTPProps,
  StartScreenEnterOTPState
> {
  inputRef: React.RefObject<TextInput>;
  constructor(props: StartScreenEnterOTPProps) {
    super(props);
    this.state = {
      otp: '',
    };
    this.inputRef = React.createRef<TextInput>();
  }
  changeInput = (e: String) => {
    if (e.length > 4) return;
    this.setState({ otp: e });
  };

  focusInput = () => {
    // @ts-ignore:
    this.inputRef.focus();
  };
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
          <Text_ text={'Enter code'} style={styles.title} />
          <Text_
            text={`We have sent you an SMS with the code to\n +84 ${`1309 - 000 - 100`}`}
            style={styles.subTitle}
          />

          <TouchableWithoutFeedback onPress={this.focusInput}>
            <View style={styles.otp}>
              {OTP.map((item, index) =>
                this.state.otp[item] ? (
                  <View key={`otp_${index}`} style={styles.square}>
                    <Text_ text={this.state.otp[item]} style={styles.number} />
                  </View>
                ) : (
                  <View key={`otp_${index}`} style={styles.square}>
                    <View
                      style={[
                        styles.dot,
                        {
                          backgroundColor: this.props.$store.theme
                            ? LIGHT_THEME.INPUT_COLOR
                            : DARK_THEME.INPUT_COLOR,
                        },
                      ]}
                    />
                  </View>
                ),
              )}
            </View>
          </TouchableWithoutFeedback>
          <TextInput
            keyboardType={OS === 'android' ? 'numeric' : 'number-pad'}
            style={{ opacity: 0, width: 0, height: 0 }}
            onChangeText={this.changeInput}
            value={this.state.otp}
            ref={(input: any) => {
              this.inputRef = input;
            }}
          />
          <ButtonBlue text={'Verify'} />
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

export default connect(mapStateToProps)(StartScreenEnterOTP);
export interface StartScreenEnterOTPProps {
  $store: reduxState;
}

interface StartScreenEnterOTPState {
  otp: String | any;
}
interface textInputProps {
  focus?: Function;
  focu?: String;
  current: any;
}
