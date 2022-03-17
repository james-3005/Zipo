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
import TopBar from '../molecules/TopBar';

const OS = Platform.OS;
const OTP = [0, 1, 2, 3, 4, 5];
class StartScreenEnterOTP extends React.Component<
  StartScreenEnterOTPProps,
  StartScreenEnterOTPState
> {
  inputRef: React.RefObject<TextInput>;
  constructor(props: StartScreenEnterOTPProps) {
    super(props);
    this.state = {
      otp: '',
      isLoading: false,
    };
    this.inputRef = React.createRef<TextInput>();
  }
  changeInput = (e: String) => {
    if (e.length > 6) return;
    this.setState({ otp: e });
  };

  focusInput = () => {
    // @ts-ignore:
    this.inputRef.focus();
  };
  navigate = async (type: String) => {
    if (type === 'next') {
      if (this.state.isLoading) return;
      this.setState({ isLoading: true });
      try {
        const data = await this.props.navigation.route.params.confirm.confirm(
          this.state.otp,
        );
        this.props.navigation.navigation.navigate('startEnterCheckUser', {
          user: data,
        });
      } catch (err) {
        console.log(err.code);
      } finally {
        this.setState({ isLoading: false });
      }
    } else this.props.navigation.navigation.goBack();
  };
  formatPhoneNumber = (phoneNumberString: string) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
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
          <TopBar
            back={true}
            title={'Back'}
            onPress={() => this.navigate('back')}
          />
          <Text_ text={'Enter code'} style={styles.title} />
          <Text_
            text={`We have sent you an SMS with the code to\n +84 ${this.formatPhoneNumber(
              this.props.navigation.route.params.phone,
            )}`}
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
          <ButtonBlue
            text={'Verify'}
            onPress={() => this.navigate('next')}
            isLoading={this.state.isLoading}
          />
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
  navigation?: any;
  confirm?: any;
}

interface StartScreenEnterOTPState {
  otp: String | any;
  isLoading: Boolean;
}
interface textInputProps {
  focus?: Function;
  current: any;
}
