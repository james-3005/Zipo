import React, { FC, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import styles from '../../scss/IncomingCall.scss';
import { useSelector, connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import Text_ from '../atoms/Text_';
import Svg from '../../../assets/svg/svg';
import { DARK_THEME, LIGHT_THEME } from '../../utilities/theme';

const IncomingCall: FC<IncomingCallProps> = (props: IncomingCallProps) => {
  const [store] = useState<reduxState>(
    useSelector((state) => state) as reduxState,
  );
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: props.$store.theme
            ? DARK_THEME.THEME
            : LIGHT_THEME.THEME,
        },
      ]}
    >
      <Image
        source={{
          uri: 'https://c4.wallpaperflare.com/wallpaper/295/163/719/anime-anime-boys-picture-in-picture-kimetsu-no-yaiba-kamado-tanjir%C5%8D-hd-wallpaper-preview.jpg',
          width: '100%',
          height: '100%',
        }}
        style={styles.bg}
        blurRadius={20}
      />
      <Text_ text={'Incoming call'} style={styles.text} />
      <View style={styles.action}>
        <TouchableOpacity onPress={props.join}>
          <View style={[styles.buttonMedium, { backgroundColor: '#67CE67' }]}>
            <Svg.Phone white={true} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.hangup}>
          <View style={[styles.buttonMedium, { backgroundColor: '#EB5545' }]}>
            <Svg.X />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(IncomingCall);

export interface IncomingCallProps {
  $store: reduxState;
  hangup: () => void;
  join: () => void;
}

interface IncomingCallState {}
