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
export default class StartScreenEnterPhone extends React.Component<
  StartScreenEnterPhoneProps,
  StartScreenEnterPhoneState
> {
  constructor(props: StartScreenEnterPhoneProps) {
    super(props);
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text_ style={styles.title}>Enter Your Phone Number</Text_>
          <Text_ style={styles.subTitle}>
            Please confirm your country code and enter your phone number
          </Text_>
          <View style={styles.enterPhoneContainer}>
            <Text_ style={{ marginRight: 15 }}>VN</Text_>
            <TextInput
              style={styles.textInput}
              placeholder="Phone Number"
              keyboardType={OS === 'android' ? 'numeric' : 'number-pad'}
            />
          </View>
          <ButtonBlue text={'Continue'} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export interface StartScreenEnterPhoneProps {}

interface StartScreenEnterPhoneState {}
