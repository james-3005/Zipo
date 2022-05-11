import React, { FC, useState } from 'react';
import { Image, View } from 'react-native';
import styles from '../../scss/SettingScreen.scss';
import { useSelector, connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import Text_ from '../atoms/Text_';
import TopBar from '../molecules/TopBar';
import Svg from '../../../assets/svg/svg';
import { LIGHT_THEME, DARK_THEME } from '../../utilities/theme';
import SettingRow from '../atoms/SettingRow';

class SettingScreen extends React.Component<
  SettingScreenProps,
  SettingScreenState
> {
  animation: React.RefObject<null | any>;
  loading: React.RefObject<null | any>;
  constructor(props: SettingScreenProps) {
    super(props);
    this.state = {
      isSearch: false,
      isLoop: false,
    };
    this.animation = React.createRef();
    this.loading = React.createRef();
  }
  // const [store] = useState<reduxState>(
  //   useSelector((state) => state) as reduxState
  // );

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
          title={'More'}
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
            source={require('../../../assets/chatbot2.png')}
            style={styles.logo}
          />
          <Text_
            style={[
              {
                backgroundColor: this.props.$store.theme
                  ? LIGHT_THEME.THEME
                  : DARK_THEME.THEME,
              },
            ]}
            text={'Minh Truong'}
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
          <SettingRow text={'Account'} icon={<Svg.Account />} />
          <Svg.Line style={[styles.line]} />
          <SettingRow text={'Appearance'} icon={<Svg.Appearance />} />
          <SettingRow
            text={'Notification'}
            icon={<Svg.Notification theme={this.props.$store.theme} />}
          />
          <SettingRow text={'Privacy'} icon={<Svg.Privacy />} />
          <Svg.Line style={[styles.line]} />
          <SettingRow text={'Help'} icon={<Svg.Help />} />
          <SettingRow text={'Invite friends'} icon={<Svg.Mail />} />
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
}

interface SettingScreenState {}
