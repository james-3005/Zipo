import React, { useState } from 'react';
import {
  Alert,
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
import initializeApp from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import storage, { firebase } from '@react-native-firebase/storage';
import AvatarSheet from '../molecules/AvatarSheet';
import BottomSheetBehavior from 'reanimated-bottom-sheet';

class ProfileScreen extends React.Component<
  ProfileScreenProps,
  ProfileScreenState
> {
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
      image: null,
    };
    firestore()
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

  onChange = (event: Event, selectedDate: Date | undefined | null) => {
    const date = selectedDate || this.state.date;
    this.setState({ date, openDate: false });
  };

  setImage = (image: any) => {
    this.setState({
      image: image,
    });
  };

  sheetRef = React.createRef<BottomSheetBehavior>();

  saveChange = async () => {
    const uploadUri = this.state.image as string;

    try {
      firestore().collection('users').doc(auth().currentUser?.uid).update({
        avatar: uploadUri,
      });
    } catch (e) {
      console.log(e);
    }

    this.setState({
      image: null,
    });
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
          onPress={() => {
            this.saveChange();
          }}
        />
        <View style={{ marginTop: '45%' }}>
          <TouchableOpacity onPress={() => this.sheetRef.current?.snapTo(0)}>
            <Image
              source={{
                uri: this.state.image
                  ? this.state.image
                  : this.state.user.avatar,
              }}
              style={[
                styles.avatar,
                {
                  borderRadius: 1000,
                },
              ]}
            />
            <Text_ style={styles.text} text={'Chose avatar'} />
          </TouchableOpacity>
        </View>
        <View style={styles.formItem}>
          <TextInput style={styles.textInput} value={this.state.user.name} />

          <View style={[styles.formItem, styles.row]}>
            <View style={styles.rowCheckbox}>
              <Text_ text={'Male'} />
            </View>
            <View style={[styles.switch]}>
              <Switch style={styles.switch} />
            </View>
            <View style={styles.rowCheckbox}>
              <Text_ text={'Female'} />
            </View>
          </View>
        </View>
        <AvatarSheet
          user={this.state.user}
          sheetRef={this.sheetRef}
          setImage={this.setImage}
        />
        <ButtonBlue
          text={'Save'}
          onPress={() => {
            this.saveChange;
          }}
        />
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
  image: any;
}
