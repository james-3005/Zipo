import React, { FC, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from '../../scss/ChatScreen.scss';
import Text_ from '../atoms/Text_';
import TopBar from '../molecules/TopBar';
import Svg from '../../../assets/svg/svg';
import { connect, useSelector } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import { DARK_THEME, LIGHT_THEME } from '../../utilities/theme';
import db from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { TO_MOMENT } from '../../utilities/common';
const ChatScreen: FC<ChatScreenProps> = (props: ChatScreenProps) => {
  const [store] = useState<reduxState>(
    useSelector((state) => state) as reduxState,
  );
  const [people, setPeople] = useState<any[]>([]);
  const [peopleId, setPeopleId] = useState<any[]>([]);
  const [findText, setFindText] = useState('');
  const navigateToChat = (user: any) => {
    props.navigation.navigate('chatScreenDetail', { user });
  };
  const getAllUserMatchId = async () => {
    let pp: any[] = [];
    db()
      .collection('chats')
      .where(`${auth().currentUser?.uid}.exist`, '==', true)
      .onSnapshot((doc) => {
        pp = doc.docs.map((doc) => {
          const user = doc.data();
          for (let i in user) {
            if (i !== auth().currentUser?.uid) {
              return {
                id: i,
                ...user[i],
              };
            }
          }
        });
        pp.sort(function (a, b) {
          return ('' + a.id).localeCompare(b.id);
        });
        setPeopleId(pp);
      });
  };
  const getAllUserMatch = async () => {
    let pp: any[] = [];
    db()
      .collection('users')
      .where(
        'id',
        'in',
        peopleId.map((item) => item.id),
      )
      .onSnapshot((doc) => {
        pp = doc.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        });
        pp.sort(function (a, b) {
          return ('' + a.id).localeCompare(b.id);
        });
        setPeople(pp);
      });
  };
  useEffect((): any => {
    getAllUserMatchId();
    return;
  }, []);
  useEffect((): any => {
    if (peopleId.length === 0) return;
    getAllUserMatch();
    return;
  }, [peopleId]);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: props.$store.theme
            ? LIGHT_THEME.THEME
            : DARK_THEME.THEME,
        },
      ]}
    >
      <TopBar
        rightComponent={
          <View>
            <Svg.Notification theme={store.theme} />
          </View>
        }
        title={'Chats'}
      />
      <View style={styles.containerFilterName}>
        <TextInput
          style={[
            styles.filterName,
            {
              backgroundColor: props.$store.theme
                ? LIGHT_THEME.INPUT_COLOR
                : DARK_THEME.INPUT_COLOR,
              color: props.$store.theme
                ? LIGHT_THEME.PLACE_HOLDER
                : DARK_THEME.PLACE_HOLDER,
            },
          ]}
          placeholder={'Find name'}
          placeholderTextColor={
            props.$store.theme
              ? LIGHT_THEME.PLACE_HOLDER
              : DARK_THEME.PLACE_HOLDER
          }
          onChangeText={(text) => setFindText(text)}
        />
        <View style={styles.searchIcon}>
          <Svg.Search />
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.scrollPerson}
        data={people.filter((item) =>
          item.name.toLowerCase().includes(findText.toLowerCase()),
        )}
        renderItem={({ item, index }) => (
          <TouchableWithoutFeedback onPress={() => navigateToChat(item)}>
            <View style={[styles.eachChat, index === 0 && { marginTop: 0 }]}>
              <View style={styles.eachPerson2}>
                <Image
                  source={{
                    width: 60,
                    height: 60,
                    uri: item.avatar,
                  }}
                  style={styles.imagePerson}
                />
                <View style={styles.Badge} />
              </View>
              <View style={styles.content}>
                <Text_
                  numberOfLines={1}
                  style={[
                    styles.name,
                    {
                      color: props.$store.theme
                        ? LIGHT_THEME.FONT_COLOR
                        : DARK_THEME.FONT_COLOR,
                    },
                  ]}
                  text={item.name}
                />
                <Text_
                  numberOfLines={1}
                  style={[
                    styles.chat,
                    {
                      color: props.$store.theme
                        ? LIGHT_THEME.PLACE_HOLDER
                        : DARK_THEME.PLACE_HOLDER,
                    },
                  ]}
                  text={peopleId[index].message || 'Say hi'}
                />
              </View>
              <View style={styles.noti}>
                <Text_
                  numberOfLines={1}
                  style={styles.chat}
                  text={
                    peopleId[index].time ? TO_MOMENT(peopleId[index].time) : ''
                  }
                />
                {index === 0 && <View style={styles.blueDot} />}
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
};

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(ChatScreen);

export interface ChatScreenProps {
  navigation?: any;
  $store: reduxState;
}

interface ChatScreenState {}
