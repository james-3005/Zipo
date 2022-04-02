import React, { FC, useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from '../../scss/ChatScreenDetail.scss';
import { useSelector, connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import TopBar from '../molecules/TopBar';
import Svg from '../../../assets/svg/svg';
import { DARK_THEME, LIGHT_THEME } from '../../utilities/theme';
import SingleChat from '../atoms/SingleChat';
import db from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { EMOTION, GET_REQUIRE, TO_MOMENT } from '../../utilities/common';
import LottieView from 'lottie-react-native';
const ChatScreenDetail: FC<ChatScreenDetailProps> = (
  props: ChatScreenDetailProps,
) => {
  const [store] = useState<reduxState>(
    useSelector((state) => state) as reduxState,
  );
  const [text, setText] = useState('');
  const [idChat, setIdChat] = useState<string>('');
  const [messsage, setMessage] = useState<any>([]);
  const [senderId, setSenderId] = useState('');
  const [partnerUser, setPartnerUser] = useState({});
  const [showExtend, setShowExtend] = useState(false);
  const inputRef = useRef();
  const navigateBack = () => {
    props.navigation.navigate('chat');
  };
  const getIdChat = async (partnerUserId: string) => {
    setIdChat(
      await db()
        .collection('chats')
        .where(`${auth().currentUser?.uid}.exist`, '==', true)
        .where(`${partnerUserId}.exist`, '==', true)
        .get()
        .then((docs) => {
          let subId = '';
          docs.forEach((doc) => {
            subId = doc.id;
          });
          return subId;
        }),
    );
  };
  const getAllMessage = async () => {
    db()
      .collection('chats')
      .doc(idChat)
      .collection('message')
      .orderBy('time', 'desc')
      .onSnapshot((doc) => {
        setMessage(
          doc.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
      });
  };
  useEffect((): any => {
    setSenderId(auth().currentUser?.uid as string);
    const { user } = props.route.params;
    setPartnerUser(user);
    getIdChat(user.id);
    return;
  }, []);
  useEffect(() => {
    getAllMessage();
    return;
  }, [idChat]);

  const sendMessage = async () => {
    const time = db.Timestamp.now();
    if (!text) return;
    await db().collection('chats').doc(idChat).collection('message').add({
      userId: auth().currentUser?.uid,
      message: text,
      time,
      like: false,
    });
    await db()
      .collection('chats')
      .doc(idChat)
      .update({
        [auth().currentUser?.uid as string]: {
          exist: true,
          time,
          message: text,
        },
      });
    setText('');
  };
  const sendIcon = async (emotion: string) => {
    const time = db.Timestamp.now();
    await db().collection('chats').doc(idChat).collection('message').add({
      userId: auth().currentUser?.uid,
      emotion,
      time,
      like: false,
    });
  };
  const toggleLike = (item: any, like: boolean) => {
    if (item.userId !== senderId)
      db()
        .collection('chats')
        .doc(idChat)
        .collection('message')
        .doc(item.id)
        .update({
          like: !like,
        });
  };
  const choosePicture = () => {};
  return (
    <View style={styles.container}>
      <TopBar
        onPress={navigateBack}
        back={true}
        title={partnerUser.name}
        rightComponent={
          <View style={{ flexDirection: 'row' }}>
            <Svg.Phone theme={props.$store.theme} />
            <View style={{ width: 4 }} />
            <Svg.General theme={props.$store.theme} />
          </View>
        }
      />
      {messsage.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={[
            styles.containerInside,
            {
              backgroundColor: props.$store.theme
                ? LIGHT_THEME.THEME2
                : DARK_THEME.THEME2,
            },
          ]}
          data={messsage}
          keyExtractor={(item, index) => `chat${index}`}
          inverted
          renderItem={({ item }) =>
            item.message ? (
              <SingleChat
                text={item.message}
                isSender={item.userId === senderId}
                time={TO_MOMENT(item.time)}
                like={item.like}
                doubleTap={() => toggleLike(item, item.like)}
              />
            ) : (
              <View
                style={[
                  item.userId === senderId
                    ? styles.emotionSideSender
                    : styles.emotionSideReceiver,
                ]}
              >
                <LottieView
                  source={GET_REQUIRE(item.emotion)}
                  loop={true}
                  style={styles.emotion}
                  autoPlay
                />
              </View>
            )
          }
        />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: props.$store.theme
              ? LIGHT_THEME.THEME2
              : DARK_THEME.THEME2,
          }}
        >
          <LottieView
            source={require('../../../assets/lottie/chatLoad.json')}
            loop={false}
            style={styles.containerInside2}
          />
        </View>
      )}
      <View
        style={[
          styles.bottomChat,
          {
            backgroundColor: props.$store.theme
              ? LIGHT_THEME.THEME
              : DARK_THEME.THEME,
          },
        ]}
      >
        <TouchableOpacity onPress={() => setShowExtend(!showExtend)}>
          <Svg.Plus />
        </TouchableOpacity>
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}
          ref={inputRef}
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

        <TouchableOpacity onPress={sendMessage}>
          <Svg.Sent color={text.length !== 0 ? '#002de3' : '#adb5bd'} />
        </TouchableOpacity>
      </View>
      {showExtend && (
        <View
          style={[
            styles.emotionAndPicture,
            {
              backgroundColor: props.$store.theme
                ? LIGHT_THEME.THEME
                : DARK_THEME.THEME,
            },
          ]}
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[
              styles.emotionList,
              {
                backgroundColor: props.$store.theme
                  ? LIGHT_THEME.THEME
                  : DARK_THEME.THEME,
              },
            ]}
            data={EMOTION}
            keyExtractor={(item, index) => `emitonList${index}`}
            renderItem={({ item, index }) => {
              if (index === 0)
                return (
                  <TouchableOpacity
                    style={[styles.camera]}
                    activeOpacity={1}
                    onPress={choosePicture}
                  >
                    <Svg.Camera theme={props.$store.theme} />
                  </TouchableOpacity>
                );
              else if (index === 1)
                return (
                  <TouchableOpacity
                    style={[styles.camera]}
                    activeOpacity={1}
                    onPress={choosePicture}
                  >
                    <Svg.FolderPicture theme={props.$store.theme} />
                  </TouchableOpacity>
                );
              else
                return (
                  <TouchableOpacity
                    style={{ marginLeft: index === 0 ? 0 : 9, marginRight: 9 }}
                    onPress={() => sendIcon(item)}
                    activeOpacity={1}
                  >
                    <LottieView
                      source={GET_REQUIRE(item)}
                      loop={true}
                      style={styles.emotion2}
                      autoPlay
                    />
                  </TouchableOpacity>
                );
            }}
          />
        </View>
      )}
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
  route?: any;
}
