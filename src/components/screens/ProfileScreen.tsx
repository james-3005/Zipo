import React from 'react';
import { Image, Switch, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../../scss/ProfileScreen.scss';
import ButtonBlue from '../atoms/ButtonBlue';
import Svg from '../../../assets/svg/svg';
import Text_ from '../atoms/Text_';
import TopBar from '../molecules/TopBar';
import { DARK_THEME, LIGHT_THEME } from '../../utilities/theme';
import { reduxState } from '../../redux/reducer';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AvatarSheet from '../molecules/AvatarSheet';
import BottomSheetBehavior from 'reanimated-bottom-sheet';

class ProfileScreen extends React.Component<
  ProfileScreenProps,
  ProfileScreenState
> {
  constructor(props: ProfileScreenProps) {
    super(props);
    this.state = {
      gender: true,
      date: null,
      openDate: false,
      user: {
        name: '',
        avatar:
          'https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg',
        gender: true,
      },
      imageUrl: '',
      newName: '',
    };
    firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.setState({
            gender: doc.data()?.gender,
            user: {
              name: doc.data()?.name,
              avatar: doc.data()?.avatar
                ? doc.data()?.avatar
                : 'https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg',
              gender: doc.data()?.gender,
            },
          });
        }
      });
  }

  setImage = (url: string) => {
    this.setState({
      imageUrl: url,
    });
  };

  sheetRef = React.createRef<BottomSheetBehavior>();

  saveChange = () => {
    const uploadUri = this.state.imageUrl;
    const newName = this.state.newName;
    const newGender = this.state.gender;
    firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .update({
        avatar: uploadUri === '' ? this.state.user.avatar : uploadUri,
        name: newName === '' ? this.state.user.name : newName,
        gender: newGender,
      });

    this.setState({
      imageUrl: '',
      newName: '',
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
        />
        <View style={{ marginTop: '45%' }}>
          <TouchableOpacity onPress={() => this.sheetRef.current?.snapTo(0)}>
            <Image
              source={{
                uri: this.state.imageUrl
                  ? this.state.imageUrl
                  : this.state.user.avatar,
              }}
              style={[
                styles.avatar,
                {
                  borderRadius: 1000,
                },
              ]}
            />
            <Text_ style={styles.text} text={'Choose avatar'} />
          </TouchableOpacity>
        </View>
        <View style={styles.formItem}>
          <TextInput
            style={styles.textInput}
            defaultValue={this.state.user.name}
            onChangeText={(newText) =>
              this.setState({
                newName: newText,
              })
            }
          />

          <View style={[styles.formItem, styles.row]}>
            <View style={styles.rowCheckbox}>
              <Text_ text={'Male'} />
            </View>
            <View style={[styles.switch]}>
              <Switch
                style={styles.switch}
                value={this.state.gender}
                onValueChange={(value) =>
                  this.setState({
                    gender: value,
                  })
                }
              />
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
            this.saveChange();
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
  date: Date | null;
  user: {
    name: string;
    avatar: string;
    gender: boolean;
  };
  gender: boolean;
  imageUrl: string;
  newName: string;
}
