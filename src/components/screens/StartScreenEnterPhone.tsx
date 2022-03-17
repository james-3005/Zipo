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
import TopBar from '../molecules/TopBar';
import Svg from '../../../assets/svg/svg';
import auth from '@react-native-firebase/auth';
class StartScreenEnterPhone extends React.Component<
  StartScreenEnterPhoneProps,
  StartScreenEnterPhoneState
> {
  constructor(props: StartScreenEnterPhoneProps) {
    super(props);
    this.state = {
      loading: false,
      phoneNumber: '',
      isErrPhone: false,
    };
  }
  navigate = async (type: String) => {
    if (type === 'next') {
      if (this.state.loading) return;
      this.setState({ loading: true });
      try {
        const confirm = await auth().signInWithPhoneNumber(
          '+84' + this.state.phoneNumber,
        );
        this.props.navigation.navigation.navigate('startEnterOTP', {
          confirm: confirm,
          phone: this.state.phoneNumber,
        });
      } catch (err: any) {
        // this.props.navigation.navigation.navigate('startEnterOTP',{confirm})
        if (err.code === 'auth/invalid-phone-number')
          this.setState({ isErrPhone: 'Invalid phone number' });
        else console.log(err.code);
      } finally {
        this.setState({ loading: false });
      }
    } else this.props.navigation.navigation.goBack();
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
              value={this.state.phoneNumber}
              onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
              style={[
                !this.state.isErrPhone ? styles.textInput : styles.textInput2,
                {
                  backgroundColor: this.props.$store.theme
                    ? LIGHT_THEME.INPUT_COLOR
                    : DARK_THEME.INPUT_COLOR,
                  color: this.props.$store.theme
                    ? LIGHT_THEME.FONT_COLOR
                    : DARK_THEME.FONT_COLOR,
                },
              ]}
              placeholder="Phone Number"
              placeholderTextColor={
                this.props.$store.theme
                  ? LIGHT_THEME.PLACE_HOLDER
                  : DARK_THEME.PLACE_HOLDER
              }
              keyboardType={OS === 'android' ? 'numeric' : 'number-pad'}
              onFocus={() => this.setState({ isErrPhone: false })}
            />
          </View>
          <View style={styles.errView}>
            <Text_ text={this.state.isErrPhone} style={styles.errText} />
          </View>
          <ButtonBlue
            text={'Continue'}
            onPress={() => this.navigate('next')}
            isLoading={this.state.loading}
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

export default connect(mapStateToProps)(StartScreenEnterPhone);

export interface StartScreenEnterPhoneProps {
  $store: reduxState;
  navigation?: any;
}

interface StartScreenEnterPhoneState {
  loading: Boolean;
  phoneNumber: string;
  isErrPhone: Boolean | string;
}
