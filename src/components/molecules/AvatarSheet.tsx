import React, { FC, useState } from 'react';
import {
  Button,
  Image,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../scss/AvatarSheet.scss';
import { useSelector, connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import 'react-native-gesture-handler';

const AvatarSheet: FC<AvatarSheetProps> = (props: AvatarSheetProps) => {
  const [store] = useState<reduxState>(
    useSelector((state) => state) as reduxState,
  );

  const captureImage = async () => {
    let options = {
      mediaType: 'photo' as MediaType,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1 as PhotoQuality,
      saveToPhotos: true,
      cropping: true,
    };
    launchCamera(options, (response) => {
      if (response.assets) {
        console.log('Response = ', response.assets[0]);
        props.setImage(response.assets[0].uri);
      }
    });
  };

  const chooseFile = () => {
    let options = {
      mediaType: 'photo' as MediaType,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1 as PhotoQuality,
      cropping: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.assets) {
        console.log('Response = ', response.assets[0]);
        props.setImage(response.assets[0].uri);
      }
    });
  };

  const renderContent = () => (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          captureImage();
        }}
      >
        <Text style={styles.textButton}>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          chooseFile();
        }}
      >
        <Text style={styles.textButton}>Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.sheetRef.current?.snapTo(1);
        }}
      >
        <Text style={styles.textButton}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <BottomSheet
      ref={props.sheetRef}
      snapPoints={[200, 0]}
      initialSnap={1}
      borderRadius={10}
      renderContent={renderContent}
      enabledGestureInteraction={true}
    />
  );
};

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(AvatarSheet);

export interface AvatarSheetProps {
  $store: reduxState;
  user: any;
  sheetRef: any;
  setImage: any;
}

interface AvatarSheetState {}
