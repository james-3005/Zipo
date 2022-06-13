import React, { FC, useEffect, useState } from 'react';
import {
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
import 'react-native-gesture-handler';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utilities/firebase';
import { DARK_THEME, LIGHT_THEME } from '../../utilities/theme';

const AvatarSheet: FC<AvatarSheetProps> = (props: AvatarSheetProps) => {
  const [store] = useState<reduxState>(
    useSelector((state) => state) as reduxState,
  );

  const [image, setImage] = useState('');

  useEffect(() => {
    const uploadImage = async () => {
      let result = await fetch(image);
      const name = new Date().getTime() + image;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, await result.blob());
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            props.setImage(downloadURL);
          });
        },
      );
    };
    image && uploadImage();
  }, [image]);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
      }
      return false;
    } else return true;
  };

  const captureImage = async () => {
    let options = {
      mediaType: 'photo' as MediaType,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1 as PhotoQuality,
      saveToPhotos: true,
      cropping: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log(response);
        if (response.assets) {
          setImage(response.assets[0].uri ? response.assets[0].uri : '');
        }
      });
    }
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
        setImage(response.assets[0].uri ? response.assets[0].uri : '');
      }
    });
  };

  const renderContent = () => (
    <View
      style={[
        styles.container,
        {
          backgroundColor: props.$store.theme
            ? DARK_THEME.THEME
            : LIGHT_THEME.THEME,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          captureImage();
        }}
      >
        <Text
          style={[
            styles.textButton,
            {
              color: props.$store.theme
                ? DARK_THEME.FONT_COLOR
                : LIGHT_THEME.FONT_COLOR,
            },
          ]}
        >
          Camera
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          chooseFile();
        }}
      >
        <Text
          style={[
            styles.textButton,
            {
              color: props.$store.theme
                ? DARK_THEME.FONT_COLOR
                : LIGHT_THEME.FONT_COLOR,
            },
          ]}
        >
          Gallery
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.sheetRef.current?.snapTo(1);
        }}
      >
        <Text
          style={[
            styles.textButton,
            {
              color: props.$store.theme
                ? DARK_THEME.FONT_COLOR
                : LIGHT_THEME.FONT_COLOR,
            },
          ]}
        >
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <BottomSheet
      ref={props.sheetRef}
      snapPoints={[200, 0]}
      initialSnap={1}
      borderRadius={13}
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
