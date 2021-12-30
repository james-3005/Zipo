import React from 'react';
import { Image, Switch, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../../scss/ProfileScreen.scss';
// import {Assets, RadioButton} from 'react-native-ui-lib';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonBlue from '../atoms/ButtonBlue';
import Svg from '../../../assets/svg/svg';
import moment from 'moment';
import Text_ from '../atoms/Text_';
export default class ProfileScreen extends React.Component<
  ProfileScreenProps,
  ProfileScreenState
> {
  constructor(props: ProfileScreenProps) {
    super(props);
    this.state = {
      gender: null,
      date: null,
      openDate: false,
    };
  }

  onChange = (event, selectedDate) => {
    const date = selectedDate || this.state.date;
    this.setState({ date, openDate: false });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: '45%' }}>
          {/* <Svg.Illustration /> */}
          <Image
            source={require('../../../assets/chatbot.png')}
            style={styles.icon}
          />
        </View>
        <View style={styles.formItem}>
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            placeholderTextColor="#A4A4A4"
          />
          <View style={[styles.formItemDob]}>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#A4A4A4"
              editable={false}
              selectTextOnFocus={false}
              value={
                this.state.date
                  ? moment(this.state.date).format('DD-MM-YYYY')
                  : ''
              }
              placeholder="Date of Birth"
            />
            <TouchableOpacity
              onPress={() => this.setState({ openDate: true })}
              style={styles.calendar}
            >
              <Svg.Calendar />
            </TouchableOpacity>
          </View>

          <View style={[styles.formItem, styles.row]}>
            <View style={styles.rowCheckbox}>
              <Text_>Male</Text_>
            </View>
            <View style={[styles.rowCheckbox, styles.mgl]}>
              <Switch />
              <Text_>Female</Text_>
            </View>
          </View>
        </View>
        {this.state.openDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.date || new Date()}
            mode={'date'}
            display="default"
            onChange={this.onChange}
            themeVariant="light"
          />
        )}

        <ButtonBlue text={'Save'} />
      </View>
    );
  }
}

export interface ProfileScreenProps {}

interface ProfileScreenState {
  openDate: Boolean;
  gender: String | null;
  date: Date | null;
}