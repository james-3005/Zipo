import React, { FC, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import styles from '../../scss/SingleChat.scss';
import { connect, useSelector } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import Text_ from './Text_';
import DoubleTap from './DoubleTap';
import LottieView from 'lottie-react-native';
import { DARK_THEME, LIGHT_THEME } from '../../utilities/theme';
const SingleChat: FC<SingleChatProps> = (props: SingleChatProps) => {
  const [store] = useState<reduxState>(
    useSelector((state) => state) as reduxState,
  );
  const refLike = useRef();
  useEffect(() => {
    if (props.like) refLike.current.play(32, 55);
    else refLike.current.play(96, 96);
  }, [props.like]);
  return (
    <DoubleTap onPress={props.doubleTap}>
      <View
        style={[
          styles.container,
          props.isSender ? styles.sender : styles.receiver,
          {
            backgroundColor: props.isSender
              ? props.$store.theme
                ? LIGHT_THEME.SENDER_CHAT
                : DARK_THEME.SENDER_CHAT
              : props.$store.theme
              ? LIGHT_THEME.RECEIVER_CHAT
              : DARK_THEME.RECEIVER_CHAT,
          },
        ]}
      >
        <Text_
          text={props.text}
          style={[
            props.isSender ? styles.whiteText : styles.backText,

            {
              backgroundColor: props.isSender
                ? props.$store.theme
                  ? LIGHT_THEME.SENDER_CHAT
                  : DARK_THEME.SENDER_CHAT
                : props.$store.theme
                ? LIGHT_THEME.RECEIVER_CHAT
                : DARK_THEME.RECEIVER_CHAT,
            },
          ]}
        />

        <Text_
          text={props.time}
          style={[
            props.isSender ? styles.whiteTextSmall : styles.blackTextSmall,
            {
              color: props.isSender
                ? props.$store.theme
                  ? LIGHT_THEME.RECEIVER_CHAT
                  : LIGHT_THEME.RECEIVER_CHAT
                : props.$store.theme
                ? DARK_THEME.RECEIVER_CHAT
                : LIGHT_THEME.RECEIVER_CHAT,
            },
          ]}
        />
        <View
          style={props.isSender ? styles.likeContainer2 : styles.likeContainer1}
        >
          <LottieView
            source={require('../../../assets/lottie/like.json')}
            loop={false}
            style={styles.like}
            ref={refLike}
          />
        </View>
      </View>
    </DoubleTap>
  );
};

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(SingleChat);

export interface SingleChatProps {
  $store: reduxState;
  text: string;
  isSender?: boolean;
  time?: string;
  doubleTap: () => void;
  like: boolean | undefined | null;
}

interface SingleChatState {}
