import React, { FC, useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
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
import {
  MediaStream,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import IncomingCall from '../molecules/IncomingCall';
import CallingScreen from './CallingScreen';
import Utils from '../../utilities/call';

const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };
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
  const [muteLocal, setMuteLocal] = useState(false);
  const [muteRemote, setMuteRemote] = useState(false);
  const [localVideo, setLocalVideo] = useState(false);
  // rtc
  const [localStream, setLocalStream] = useState<MediaStream | null>();
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>();
  const [gettingCall, setGettingCall] = useState(false);
  const [user, setUser] = useState('');
  const pc = useRef<RTCPeerConnection>();
  const connecting = useRef(false);
  //
  useEffect(() => {
    const cRef = db().collection('meet').doc('chatId');
    const subscribe = cRef.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (pc.current && !pc.current.remoteDescription && data && data.answer) {
        pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
      if (data && data.offer && !connecting.current) {
        setGettingCall(true);
      } else {
        setGettingCall(false);
      }
    });
    const subscribeDelete = cRef.collection('callee').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'removed') {
          hangup();
        }
      });
    });
    return () => {
      subscribe();
      subscribeDelete();
    };
  }, []);
  const setupWebrtc = async () => {
    pc.current = new RTCPeerConnection(configuration);
    const stream = await Utils.getStream();
    if (stream) {
      setLocalStream(stream);

      setLocalVideo(true);
      pc.current.addStream(stream);
    }
    pc.current.onaddstream = (e: any) => {
      setRemoteStream(e.stream);
      db()
        .collection('meet')
        .doc('chatId')
        .update({ caller: true, callee: true });
    };
  };
  const create = async () => {
    setUser('caller');
    connecting.current = true;
    await setupWebrtc();
    const cRef = db().collection('meet').doc('chatId');
    collectIceCandidates(cRef, 'caller', 'callee');
    if (pc.current) {
      const offer = await pc.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      pc.current.setLocalDescription(offer);
      const cWithOffer = {
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      };
      cRef.set(cWithOffer);
    }
  };
  const join = async () => {
    connecting.current = true;
    setGettingCall(false);
    setUser('callee');
    const cRef = db().collection('meet').doc('chatId');
    const offer = (await cRef.get()).data()?.offer;
    if (offer) {
      await setupWebrtc();
      collectIceCandidates(cRef, 'callee', 'caller');
      if (pc.current) {
        pc.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.current.createAnswer();
        pc.current.setLocalDescription(answer);
        const cWithAnswer = {
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        };
        cRef.update(cWithAnswer);
      }
    }
  };
  const hangup = async () => {
    setGettingCall(false);
    connecting.current = false;
    streamCleanUp();
    firestoreCleanUp();
    if (pc.current) {
      pc.current.close();
    }
  };
  const streamCleanUp = async () => {
    if (localStream) {
      localStream.getTracks().forEach((t) => t.stop());
      localStream.release();
    }
    setLocalStream(null);
    setRemoteStream(null);
  };
  const firestoreCleanUp = async () => {
    const cRef = db().collection('meet').doc('chatId');
    if (cRef) {
      const calleeCandidate = await cRef.collection('callee').get();
      calleeCandidate.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      const callerCandidate = await cRef.collection('caller').get();
      callerCandidate.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      cRef.delete();
    }
  };
  const setMuteLocalCustom = () => {
    if (localStream) {
      const newStream = localStream;
      const isMute = muteLocal;
      setMuteLocal(!isMute);
      // newStream.getAudioTracks()[0].enabled = isMute;
      setLocalStream(newStream);
    }
  };
  const setMuteRemoteCustom = () => {
    if (remoteStream) {
      const newStream = remoteStream;
      const isMute = muteRemote;
      setMuteRemote(!isMute);
      // console.log(newStream.getAudioTracks());
      setRemoteStream(newStream);
    }
  };
  const setMuteVideo = () => {
    db()
      .collection('meet')
      .doc('chatId')
      .update({ [user]: !localVideo });
    setLocalVideo(!localVideo);
  };
  const navigateBack = () => {
    props.navigation.navigate('chat');
  };

  const collectIceCandidates = async (
    cRef: any,
    localName: String,
    remoteName: String,
  ) => {
    const candidateCollection = cRef.collection(localName);
    if (pc.current) {
      pc.current.onicecandidate = (e: any) => {
        if (e.candidate) {
          candidateCollection.add(e.candidate);
        }
      };
    }

    cRef.collection(remoteName).onSnapshot((snapshot: any) => {
      snapshot.docChanges().forEach((change: any) => {
        if (change.type == 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current?.addIceCandidate(candidate);
        }
      });
    });
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
  // const call = () => {
  //   props.navigation.navigate("CallScreen");
  // };
  return (
    <View style={styles.container}>
      {gettingCall && <IncomingCall hangup={hangup} join={join} />}
      {localStream && (
        <CallingScreen
          hangup={hangup}
          localStream={localStream}
          remoteStream={remoteStream}
          muteLocal={muteLocal}
          setMuteLocal={setMuteLocalCustom}
          muteRemote={muteRemote}
          setMuteRemote={setMuteRemoteCustom}
          muteLocalVideo={setMuteVideo}
          user={user}
          localVideo={localVideo}
        />
      )}

      <TopBar
        onPress={navigateBack}
        back={true}
        title={partnerUser.name}
        rightComponent={
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={create}>
              <Svg.Phone theme={props.$store.theme} />
            </TouchableOpacity>
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
            ) : item.emotion ? (
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
            ) : (
              <View
                style={[
                  item.userId === senderId
                    ? styles.emotionSideSender
                    : styles.emotionSideReceiver,
                ]}
              >
                <Image
                  source={{
                    width: 200,
                    height: 250,
                    uri: item.image,
                  }}
                  style={styles.imagePerson}
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
