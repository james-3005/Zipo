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

const OS = Platform.OS;
const OTP = [0, 1, 2, 3];
export default class StartScreenEnterOTP extends React.Component<
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
    this.inputRef.focus();
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text_ style={styles.title}>Enter Code</Text_>
          <Text_ style={styles.subTitle}>
            {`We have sent you an SMS with the code to\n +84 ${`1309 - 000 - 100`}`}
          </Text_>
          <TouchableWithoutFeedback onPress={this.focusInput}>
            <View style={styles.otp}>
              {OTP.map((item, index) =>
                this.state.otp[item] ? (
                  <View key={`otp_${index}`} style={styles.square}>
                    <Text_ style={styles.number}>{this.state.otp[item]}</Text_>
                  </View>
                ) : (
                  <View key={`otp_${index}`} style={styles.square}>
                    <View style={styles.dot} />
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
            ref={(input) => {
              /* eslint-disable  @typescript-eslint/no-explicit-any */
              this.inputRef = input;
            }}
          />
          <ButtonBlue text={'Verify'} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export interface StartScreenEnterOTPProps {}

interface StartScreenEnterOTPState {
  otp: String | any;
}
interface textInputProps {
  focus?: Function;
  focu?: String;
  current: any;
}
