import React from 'react';
import {
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from '../../scss/MatchingScreen.scss';
import TopBar from '../molecules/TopBar';
import Svg from '../../../assets/svg/svg';
import Text_ from '../atoms/Text_';
import { connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import { LIGHT_THEME, DARK_THEME } from '../../utilities/theme';
import LottieView from 'lottie-react-native';
import db from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
let listener = null;
let listenerMatch = null;
class MatchingScreen extends React.Component<
  MatchingScreenProps,
  MatchingScreenState
> {
  animation: React.RefObject<null | any>;
  constructor(props: MatchingScreenProps) {
    super(props);
    this.state = {
      isSearch: false,
      isLoop: false,
      userMatch: null,
      listen: null,
      gender: false,
    };
    this.animation = React.createRef();
  }
  toggleSearch = async () => {
    if (this.state.gender) this.toggleSearchFemale();
    else {
      if (this.state.isSearch) {
        this.state.listen();
        if (listenerMatch instanceof Function) listenerMatch();
      } else {
        listenerMatch = db()
          .collection('users')
          .doc(auth().currentUser?.uid)
          .onSnapshot(async (doc) => {
            if (doc.data().idMatch) {
              const partner = await db()
                .collection('users')
                .doc(doc.data().idMatch)
                .get()
                .then((doc) => {
                  db().collection('pool').doc(auth().currentUser?.uid).delete();
                  this.setState({ isSearch: false, isLoop: false }, () => {
                    this.animation.current.play(0, 0);
                  });
                  if (listener) listener();
                  this.setState({ userMatch: doc.data() as Object });
                });
            }
          });
        this.setState({
          listen: db()
            .collection('pool')
            .onSnapshot(async (doc) => {
              for (let i = 0; i < doc.docs.length; i++) {
                await db()
                  .collection('chats')
                  .where(`${auth().currentUser?.uid}.exist`, '==', true)
                  .where(`${doc.docs[i].id}.exist`, '==', true)
                  .get()
                  .then((docs2) => {
                    if (docs2.size === 0) {
                      db()
                        .collection('chats')
                        .add({
                          [doc.docs[i].id]: {
                            exist: true,
                          },
                          [auth().currentUser?.uid as string]: {
                            exist: true,
                          },
                        });
                      db()
                        .collection('users')
                        .doc(auth().currentUser?.uid)
                        .update({ idMatch: doc.docs[i].id });
                      db()
                        .collection('users')
                        .doc(doc.docs[i].id)
                        .update({ idMatch: auth().currentUser?.uid });
                      this.state.listen();
                    }
                  });
              }
            }),
        });
      }
    }
    this.setState(
      { isSearch: !this.state.isSearch, isLoop: !this.state.isLoop },
      () => {
        if (this.state.isSearch) {
          this.animation.current.play(0, 251);
        } else {
          this.animation.current.play(0, 0);
        }
      },
    );
  };
  toggleSearchFemale() {
    if (this.state.isSearch) {
      db().collection('pool').doc(auth().currentUser?.uid).delete();
      if (listenerMatch instanceof Function) listenerMatch();
    } else {
      db().collection('pool').doc(auth().currentUser?.uid).set({});
      listenerMatch = db()
        .collection('users')
        .doc(auth().currentUser?.uid)
        .onSnapshot(async (doc) => {
          if (doc.data().idMatch) {
            const partner = await db()
              .collection('users')
              .doc(doc.data().idMatch)
              .get()
              .then((doc) => {
                db().collection('pool').doc(auth().currentUser?.uid).delete();
                this.setState({ isSearch: false, isLoop: false }, () => {
                  this.animation.current.play(0, 0);
                });
                if (listener) listener();
                this.setState({ userMatch: doc.data() as Object });
              });
          }
        });
    }
  }
  async componentDidMount() {
    const data = await db()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .get()
      .then((data) => {
        return data.data().gender;
      });
    this.setState({ gender: data });
  }
  componentWillUnmount() {
    if (listenerMatch instanceof Function) listenerMatch();
  }
  clearUserMatch() {
    this.setState({ userMatch: null });
    db().collection('users').doc(auth().currentUser?.uid).update({
      idMatch: null,
    });
  }
  render() {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: this.props.$store.theme
              ? LIGHT_THEME.THEME
              : DARK_THEME.THEME,
          },
        ]}
      >
        <TopBar
          rightComponent={
            <View>
              <Svg.Notification theme={this.props.$store.theme} />
            </View>
          }
          title={'Matching'}
        />
        {this.state.userMatch && (
          <View style={styles.absolute}>
            <Image
              source={{
                uri: this.state.userMatch?.avatar,
              }}
              style={styles.imagePerson}
            />
            <View
              style={[styles.bottomAbsolute, { backgroundColor: '#0000005e' }]}
            >
              <Text_ text={this.state.userMatch?.name} style={styles.name} />
              <TouchableOpacity
                style={[
                  styles.icon,
                  {
                    backgroundColor: this.props.$store.theme
                      ? LIGHT_THEME.THEME
                      : DARK_THEME.THEME,
                  },
                ]}
                onPress={() => this.clearUserMatch()}
              >
                {this.props.$store.theme ? (
                  <Svg.Heart1 theme={true} />
                ) : (
                  <Svg.Heart1 theme={false} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.centerContainer}>
          <Text_ style={styles.titleText} text={'Tap to flirt'} />
          <TouchableWithoutFeedback onPress={this.toggleSearch}>
            <LottieView
              source={require('../../../assets/lottie/searching.json')}
              loop={this.state.isLoop}
              style={styles.searching}
              ref={this.animation}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(MatchingScreen);
export interface MatchingScreenProps {
  $store: reduxState;
}

interface MatchingScreenState {
  isSearch: boolean;
  isLoop: boolean;
  userMatch: null | Object;
  gender: boolean;
  listen: () => void | null | any;
}
