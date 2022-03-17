import React, { FC, useState } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from '../../scss/ChatScreenDetail.scss';
import { useSelector, connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import TopBar from '../molecules/TopBar';
import Svg from '../../../assets/svg/svg';
import { DARK_THEME, LIGHT_THEME } from '../../utilities/theme';
import SingleChat from '../atoms/SingleChat';
const ChatScreenDetail: FC<ChatScreenDetailProps> = (
  props: ChatScreenDetailProps,
) => {
  const [store] = useState<reduxState>(
    useSelector((state) => state) as reduxState,
  );
  const [text, setText] = useState('');
  const navigateBack = () => {
    props.navigation.navigate('chat');
  };
  return (
    <View style={styles.container}>
      <TopBar
        onPress={navigateBack}
        back={true}
        title={'Andrian'}
        rightComponent={
          <View style={{ flexDirection: 'row' }}>
            <Svg.SearchBold />
            <View style={{ width: 4 }} />
            <Svg.General />
          </View>
        }
      />
      <View style={styles.containerInside}>
        <SingleChat text="lorem20" isSender={true} time="09.30PM" />
        <SingleChat
          text="asfdasfsdf sdf sfasd dsfas sf asd  fdas sdfas fasdf  asdf sds"
          isSender={false}
          time="09.30PM"
        />
        <SingleChat
          text="asfdasfsdf sdf sfasd dsfas sf asd  fdas sdfas fasdf  asdf sds"
          isSender={false}
          time="09.30PM"
        />
        <SingleChat
          text="asfdasfsdf sdf sfasd dsfas sf asd  fdas sdfas fasdf  asdf sds"
          isSender={true}
          time="09.30PM"
        />
      </View>
      <View style={styles.bottomChat}>
        <TouchableOpacity>
          <Svg.Plus />
        </TouchableOpacity>
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}
          style={[
            styles.phone,
            {
              backgroundColor: props.$store.theme
                ? LIGHT_THEME.INPUT_COLOR
                : DARK_THEME.INPUT_COLOR,
              color: props.$store.theme
                ? LIGHT_THEME.FONT_COLOR
                : DARK_THEME.FONT_COLOR,
            },
          ]}
          placeholder="Write something"
          placeholderTextColor={
            props.$store.theme
              ? LIGHT_THEME.PLACE_HOLDER
              : DARK_THEME.PLACE_HOLDER
          }
        />
        <TouchableOpacity>
          <Svg.Sent color={text.length !== 0 ? '#002de3' : '#adb5bd'} />
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

export default connect(mapStateToProps)(ChatScreenDetail);

export interface ChatScreenDetailProps {
  $store: reduxState;
  navigation?: any;
}

interface ChatScreenDetailState {}
