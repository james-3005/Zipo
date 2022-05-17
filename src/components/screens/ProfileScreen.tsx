import React from 'react';
import { Image, Switch, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../../scss/ProfileScreen.scss';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonBlue from '../atoms/ButtonBlue';
import Svg from '../../../assets/svg/svg';
import moment from 'moment';
import Text_ from '../atoms/Text_';
import TopBar from '../molecules/TopBar';
import { DARK_THEME, LIGHT_THEME } from '../../utilities/theme';
import { reduxState } from '../../redux/reducer';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

class ProfileScreen extends React.Component<
  ProfileScreenProps,
  ProfileScreenState
> {
  subcriber: any;
  constructor(props: ProfileScreenProps) {
    super(props);
    this.state = {
      gender: null,
      date: null,
      openDate: false,
      user: {
        name: '',
        avatar:
          'https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg',
      },
    };
    this.subcriber = firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.setState({
            user: {
              name: doc.data()?.name,
              avatar: doc.data()?.avatar
                ? doc.data()?.avatar
                : 'https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg',
            },
          });
        }
      });
  }

  // getUser = async () => {
  //   const userDocument = await firestore().collection("users").doc(USER_ID).get();
  //   console.log(userDocument.data());
  // }

  onChange = (event: Event, selectedDate: Date | undefined | null) => {
    const date = selectedDate || this.state.date;
    this.setState({ date, openDate: false });
  };
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
        <TopBar
          rightComponent={
            <View>
              <Svg.Notification theme={this.props.$store.theme} />
            </View>
          }
          back={true}
          title={'Account'}
        />
        <View style={{ marginTop: '45%' }}>
          <Image
            source={{ uri: this.state.user.avatar }}
            style={[
              styles.avatar,
              {
                borderRadius: 1000,
              },
            ]}
          />
        </View>
        <View style={styles.formItem}>
          <TextInput
            style={styles.textInput}
            placeholder={this.state.user.name}
            placeholderTextColor="#A4A4A4"
          />
          {/* <View style={[styles.formItemDob]}>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#A4A4A4"
              editable={false}
              selectTextOnFocus={false}
              value={
                this.state.date
                  ? moment(this.state.date).format('DD-MM-YYYY')
                  : ''
              }
              placeholder="Date of birth"
            />
            <TouchableOpacity
              onPress={() => this.setState({ openDate: true })}
              style={styles.calendar}
            >
              <Svg.Calendar />
            </TouchableOpacity>
          </View> */}

          <View style={[styles.formItem, styles.row]}>
            <View style={styles.rowCheckbox}>
              <Text_ text={'Male'} />
            </View>
            <View
              style={[
                // styles.rowCheckbox,
                styles.switch,
              ]}
            >
              <Switch style={styles.switch} />
            </View>
            <View style={styles.rowCheckbox}>
              <Text_ text={'Female'} />
            </View>
          </View>
        </View>
        {this.state.openDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.date || new Date()}
            mode={'date'}
            display="default"
            onChange={this.onChange}
            themeVariant="light"
          />
        )}

        <ButtonBlue text={'Save'} />
      </View>
    );
  }
}

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(ProfileScreen);

export interface ProfileScreenProps {
  $store: reduxState;
}

interface ProfileScreenState {
  openDate: Boolean;
  gender: String | null;
  date: Date | null;
  user: {
    name: string;
    avatar: string;
  };
}
