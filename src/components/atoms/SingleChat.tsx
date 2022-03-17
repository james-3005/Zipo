import React, { FC, useState } from 'react';
import { View } from 'react-native';
import styles from '../../scss/SingleChat.scss';
import { connect, useSelector } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import Text_ from './Text_';
const SingleChat: FC<SingleChatProps> = (props: SingleChatProps) => {
  const [store] = useState<reduxState>(
    useSelector((state) => state) as reduxState,
  );

  return (
    <View
      style={[
        styles.container,
        props.isSender ? styles.sender : styles.receiver,
      ]}
    >
      <Text_
        text={props.text}
        style={props.isSender ? styles.whiteText : styles.backText}
      />
      <Text_
        text={props.time}
        style={props.isSender ? styles.whiteTextSmall : styles.blackTextSmall}
      />
    </View>
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
}

interface SingleChatState {}
