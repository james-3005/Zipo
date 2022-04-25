import React, { FC, useEffect, useState } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import styles from '../../scss/CallingScreen.scss';
import { useSelector, connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import Svg from '../../../assets/svg/svg';
import Text_ from '../atoms/Text_';
import { MediaStream, RTCView } from 'react-native-webrtc';
import db from '@react-native-firebase/firestore';
const CallingScreen: FC<CallingScreenProps> = (props: CallingScreenProps) => {
  const [store] = useState<reduxState>(
    useSelector((state) => state) as reduxState,
  );
  const [remoteVideo, setRemoteVideo] = useState(true);
  const [localVideo, setLocalVideo] = useState(true);
  useEffect(() => {
    const listener = db()
      .collection('meet')
      .doc('chatId')
      .onSnapshot((doc) => {
        if (doc.data()) {
          if (props.user === 'caller') {
            setRemoteVideo(doc.data().callee);
            setLocalVideo(doc.data().caller);
          } else {
            setRemoteVideo(doc.data().caller);
            setLocalVideo(doc.data().callee);
          }
        }
      });
    return listener;
  }, []);
  return (
    <View style={styles.container}>
      {props.localStream && !props.remoteStream && (
        <RTCView
          streamURL={props.localStream.toURL()}
          objectFit={'cover'}
          style={styles.localStream}
        />
      )}
      {props.localStream && props.remoteStream && (
        <>
          {remoteVideo && localVideo && (
            <>
              <RTCView
                streamURL={props.remoteStream.toURL()}
                objectFit={'cover'}
                style={styles.localStream}
              />
              <RTCView
                streamURL={props.localStream.toURL()}
                objectFit={'cover'}
                style={styles.remoteStream}
              />
            </>
          )}
          {remoteVideo && !localVideo && (
            <RTCView
              streamURL={props.remoteStream.toURL()}
              objectFit={'cover'}
              style={styles.localStream}
            />
          )}
          {!remoteVideo && localVideo && (
            <>
              <View style={styles.localStream}>
                <Image
                  source={{
                    uri: 'https://c4.wallpaperflare.com/wallpaper/295/163/719/anime-anime-boys-picture-in-picture-kimetsu-no-yaiba-kamado-tanjir%C5%8D-hd-wallpaper-preview.jpg',
                    width: '100%',
                    height: '100%',
                  }}
                  blurRadius={20}
                />
              </View>
              <RTCView
                streamURL={props.localStream.toURL()}
                objectFit={'cover'}
                style={styles.remoteStream}
              />
            </>
          )}
          {!remoteVideo && !localVideo && (
            <>
              <View style={styles.localStream}>
                <Image
                  source={{
                    uri: 'https://c4.wallpaperflare.com/wallpaper/295/163/719/anime-anime-boys-picture-in-picture-kimetsu-no-yaiba-kamado-tanjir%C5%8D-hd-wallpaper-preview.jpg',
                    width: '100%',
                    height: '100%',
                  }}
                  blurRadius={20}
                />
              </View>
            </>
          )}
        </>
      )}
      <View style={styles.action1}>
        <TouchableOpacity onPress={props.muteLocalVideo}>
          <View style={styles.buttonSmall}>
            {localVideo ? <Svg.VideoOff /> : <Svg.VideoOn />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.setMuteRemote}>
          <View style={styles.buttonSmall}>
            {props.muteRemote ? <Svg.SoundOn /> : <Svg.SoundOff />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.setMuteLocal}>
          <View style={styles.buttonSmall}>
            {props.muteLocal ? <Svg.MicOn /> : <Svg.MicOff />}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.action2}>
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

export default connect(mapStateToProps)(CallingScreen);

export interface CallingScreenProps {
  $store: reduxState;
  hangup: () => void;
  // @ts-ignore
  localStream?: MediaStream | null;
  // @ts-ignore
  remoteStream?: MediaStream | null;
  muteLocal: boolean;
  muteRemote: boolean;
  setMuteLocal: () => void;
  setMuteRemote: () => void;
  muteLocalVideo: () => void;
  user: string;
  localVideo: boolean;
}

interface CallingScreenState {}
