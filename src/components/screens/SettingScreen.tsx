import React, { FC, useState } from 'react';
import { Image, View } from 'react-native';
import styles from '../../scss/SettingScreen.scss';
import { connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import Text_ from '../atoms/Text_';
import TopBar from '../molecules/TopBar';
import Svg from '../../../assets/svg/svg';
import { LIGHT_THEME, DARK_THEME } from '../../utilities/theme';
import SettingRow from '../atoms/SettingRow';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

class SettingScreen extends React.Component<
  SettingScreenProps,
  SettingScreenState
> {
  animation: React.RefObject<null | any>;
  loading: React.RefObject<null | any>;
  subcriber: any;
  constructor(props: SettingScreenProps) {
    super(props);
    this.state = {
      isSearch: false,
      isLoop: false,
      user: {
        name: '',
        avatar:
          'https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg',
      },
    };
    this.animation = React.createRef();
    this.loading = React.createRef();
    this.subcriber = firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .onSnapshot((doc) => {
        if (doc != null && doc.exists) {
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
          title={'Setting'}
        />
        <View
          style={[
            styles.accountDataContainer,
            {
              backgroundColor: this.props.$store.theme
                ? LIGHT_THEME.THEME
                : DARK_THEME.THEME,
            },
          ]}
        >
          <Image
            source={{ uri: this.state.user.avatar }}
            style={[
              styles.avatar,
              {
                borderRadius: 1000,
              },
            ]}
          />
          <Text_
            style={[
              {
                backgroundColor: this.props.$store.theme
                  ? LIGHT_THEME.THEME
                  : DARK_THEME.THEME,
              },
            ]}
            text={this.state.user.name}
          />
        </View>
        <View
          style={[
            styles.menuContainer,
            {
              backgroundColor: this.props.$store.theme
                ? LIGHT_THEME.THEME
                : DARK_THEME.THEME,
            },
          ]}
        >
          <SettingRow
            text={'Account'}
            icon={<Svg.Account theme={this.props.$store.theme} />}
            navigation={this.props.navigation}
          />
          <Svg.Line style={[styles.line]} />
          <SettingRow
            text={'Appearance'}
            icon={<Svg.Appearance theme={this.props.$store.theme} />}
          />
          <SettingRow
            text={'Notification'}
            icon={<Svg.Notification theme={this.props.$store.theme} />}
          />
          <SettingRow
            text={'Privacy'}
            icon={<Svg.Privacy theme={this.props.$store.theme} />}
          />
          <Svg.Line style={[styles.line]} />
          <SettingRow
            text={'Help'}
            icon={<Svg.Help theme={this.props.$store.theme} />}
          />
          <SettingRow
            text={'Invite friends'}
            icon={<Svg.Mail theme={this.props.$store.theme} />}
          />
          <SettingRow
            text={'Log out'}
            icon={<Svg.Logout theme={this.props.$store.theme} />}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(SettingScreen);

export interface SettingScreenProps {
  $store: reduxState;
  navigation?: any;
}

interface SettingScreenState {
  isSearch: false;
  isLoop: false;
  user: {
    name: string;
    avatar: string;
  };
}
