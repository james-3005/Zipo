import React, { FC, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
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
const ChatScreen: FC<ChatScreenProps> = (props: ChatScreenProps) => {
  const [store] = useState<reduxState>(
    useSelector((state) => state) as reduxState,
  );
  const people = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1];
  const navigateToChat = () => {
    console.log(props.navigation.navigate('chatScreenDetail'));
  };
  useEffect(() => {}, []);
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
      <View
        style={[
          styles.listOnline,
          {
            borderBottomWidth: 2,
            borderBottomColor: props.$store.theme
              ? LIGHT_THEME.INPUT_COLOR
              : DARK_THEME.INPUT_COLOR,
          },
        ]}
      >
        <FlatList
          horizontal
          data={people}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            if (index === 0)
              return (
                <View
                  style={[
                    styles.eachPerson,
                    {
                      marginLeft: 0,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.story,
                      {
                        backgroundColor: props.$store.theme
                          ? LIGHT_THEME.INPUT_COLOR
                          : DARK_THEME.INPUT_COLOR,
                      },
                    ]}
                  >
                    <Svg.Plus />
                  </View>
                  <Text_ style={styles.personName} text={'Chat'} />
                </View>
              );
            else
              return (
                <TouchableWithoutFeedback onPress={navigateToChat}>
                  <View style={[styles.eachPerson]}>
                    <Image
                      source={{
                        width: 60,
                        height: 60,
                        uri: 'https://olptienganh.vn/wp-content/uploads/2022/01/Tap-2-Kimetsu-no-Yaiba-Season-2-Entertainment-District-Arc.jpg',
                      }}
                      style={styles.imagePerson}
                    />
                    <Text_
                      numberOfLines={2}
                      text={'Huy Nhật'}
                      style={styles.personName}
                    />
                    <View style={styles.greenBadge} />
                  </View>
                </TouchableWithoutFeedback>
              );
          }}
          scrollEnabled
        />
      </View>
      <View style={styles.containerFilterName}>
        <TextInput
          style={[
            styles.filterName,
            {
              backgroundColor: props.$store.theme
                ? LIGHT_THEME.INPUT_COLOR
                : DARK_THEME.INPUT_COLOR,
            },
          ]}
          placeholder={'Find name'}
          placeholderTextColor={
            props.$store.theme
              ? LIGHT_THEME.PLACE_HOLDER
              : DARK_THEME.PLACE_HOLDER
          }
        />
        <View style={styles.searchIcon}>
          <Svg.Search />
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.scrollPerson}
        data={people}
        renderItem={({ item, index }) => (
          <View style={[styles.eachChat, index === 0 && { marginTop: 0 }]}>
            <View style={styles.eachPerson2}>
              <Image
                source={{
                  width: 60,
                  height: 60,
                  uri: 'https://mondaycareer.com/wp-content/uploads/2020/11/anime-l%C3%A0-g%C3%AC-vampire.jpg',
                }}
                style={styles.imagePerson}
              />
              <View style={styles.Badge} />
            </View>
            <View style={styles.content}>
              <Text_ numberOfLines={1} style={styles.name} text={'Huy'} />
              <Text_
                numberOfLines={1}
                style={styles.chat}
                text={'Lorem ipsum dolor sit amet.'}
              />
            </View>
            <View style={styles.noti}>
              <Text_ numberOfLines={1} style={styles.chat} text={'17/2'} />
              <View style={styles.blueDot} />
            </View>
          </View>
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
