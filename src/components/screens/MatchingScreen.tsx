import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
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
class MatchingScreen extends React.Component<
  MatchingScreenProps,
  MatchingScreenState
> {
  animation: React.RefObject<null | any>;
  loading: React.RefObject<null | any>;
  constructor(props: MatchingScreenProps) {
    super(props);
    this.state = {
      isSearch: false,
      isLoop: false,
    };
    this.animation = React.createRef();
    this.loading = React.createRef();
  }
  toggleSearch = () => {
    if (this.state.isSearch) {
      db().collection('pool').doc(auth().currentUser?.uid).delete();
    } else {
      db().collection('pool').doc(auth().currentUser?.uid).set({});
    }
    this.setState(
      { isSearch: !this.state.isSearch, isLoop: !this.state.isLoop },
      () => {
        if (this.state.isSearch) {
          this.animation.current.play(0, 251);
          this.loading.current.play(0, 81);
        } else {
          this.animation.current.play(0, 0);
          this.loading.current.play(62, 62);
        }
      },
    );
  };
  componentDidMount() {
    db()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .onSnapshot(async (doc) => {
        if (doc.data().idMatch) {
          const partner = await db()
            .collection('users')
            .doc(doc.data().idMatch)
            .get()
            .then((doc) => doc.data());
        }
      });
    // let bool = true;
    // const listener = db()
    //   .collection("pool")
    //   .onSnapshot(async (doc) => {
    //     for (let i = 0; i < doc.docs.length; i++) {
    //       if (!bool) break;
    //       await db()
    //         .collection("chats")
    //         .where(`${auth().currentUser?.uid}.exist`, "==", true)
    //         .where(`${doc.docs[i].id}.exist`, "==", true)
    //         .get()
    //         .then((docs2) => {
    //           if (docs2.size === 0)
    //             db()
    //               .collection("chats")
    //               .add({
    //                 [doc.docs[i].id]: {
    //                   exist: true,
    //                 },
    //                 [auth().currentUser?.uid as string]: {
    //                   exist: true,
    //                 },
    //               });
    //           db()
    //             .collection("users")
    //             .doc(auth().currentUser?.uid)
    //             .update({ idMatch: doc.docs[i].id });
    //           db()
    //             .collection("users")
    //             .doc(doc.docs[i].id)
    //             .update({ idMatch: auth().currentUser?.uid });
    //           bool = false;
    //         });
    //     }
    //   });
    // listener();
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
          <View style={styles.loadingContainer}>
            <LottieView
              source={require('../../../assets/lottie/loadingDot.json')}
              loop={true}
              style={styles.loading}
              ref={this.loading}
            />
          </View>
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
}
