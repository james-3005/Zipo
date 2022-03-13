import React, { FC, useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, TextInput, View } from 'react-native';
import styles from '../../scss/ChatScreen.scss';
import Text_ from '../atoms/Text_';
import TopBar from '../molecules/TopBar';
import Svg from '../../../assets/svg/svg';
import { useSelector } from 'react-redux';
import { reduxState } from '../../redux/reducer';
const ChatScreen: FC = (props: ChatScreenProps) => {
  const [store] = useState<reduxState>(
    useSelector((state) => state) as reduxState,
  );
  const people = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1];
  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <TopBar
        rightComponent={
          <View>
            <Svg.Notification theme={store.theme} />
          </View>
        }
        title={'Chats'}
      />
      <View style={[styles.listOnline, { borderBottomWidth: 2 }]}>
        <FlatList
          horizontal
          data={people}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            if (index === 0)
              return (
                <View style={[styles.eachPerson, { marginLeft: 0 }]}>
                  <View style={styles.story}>
                    <Svg.Plus />
                  </View>
                  <Text_ style={styles.personName} text={'Chat'} />
                </View>
              );
            else
              return (
                <View style={[styles.eachPerson]}>
                  <Image
                    source={{
                      width: 60,
                      height: 60,
                      uri: 'https://scontent.fhan3-1.fna.fbcdn.net/v/t39.30808-6/267620900_1332001227228647_7579166299747361701_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=RIrJsLZe268AX9cspSx&tn=JlXeofjKcUaQwvQP&_nc_ht=scontent.fhan3-1.fna&oh=00_AT8Ey6qELtFo11h3BDJ392C10RhGIRsqNs-9opSQmuBGfw&oe=62161329',
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
              );
          }}
          scrollEnabled
        />
      </View>
      <View style={styles.containerFilterName}>
        <TextInput style={styles.filterName} placeholder={'Find name'} />
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
                  uri: 'https://scontent.fhan3-1.fna.fbcdn.net/v/t39.30808-6/267620900_1332001227228647_7579166299747361701_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=RIrJsLZe268AX9cspSx&tn=JlXeofjKcUaQwvQP&_nc_ht=scontent.fhan3-1.fna&oh=00_AT8Ey6qELtFo11h3BDJ392C10RhGIRsqNs-9opSQmuBGfw&oe=62161329',
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

export default ChatScreen;

export interface ChatScreenProps {}

interface ChatScreenState {}
