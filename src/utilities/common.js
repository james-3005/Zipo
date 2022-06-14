import moment from 'moment';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';

export const JSON_PRETTY = (data) => JSON.stringify(data, null, 2);

export const TO_MOMENT = (item) => {
  const date = moment(
    new Date(item.seconds * 1000 + item.nanoseconds / 1000000),
  );
  const isSameDay = date.isSame(moment(Date.now()), 'day');
  return isSameDay ? date.format('HH:mm') : date.format('D/M HH:mm');
};

export const EMOTION = [
  'picture',
  'folderPicture',
  'angry',
  'blink',
  'love',
  'no',
  'smile',
  'lazy',
];
export const GET_REQUIRE = (type) => {
  switch (type) {
    case 'angry':
      return require('../../assets/lottie/emotion/angry.json');
    case 'lazy':
      return require('../../assets/lottie/emotion/lazy.json');
    case 'blink':
      return require('../../assets/lottie/emotion/blink.json');
    case 'smile':
      return require('../../assets/lottie/emotion/smile.json');
    case 'no':
      return require('../../assets/lottie/emotion/no.json');
    default:
      return require('../../assets/lottie/emotion/love.json');
  }
};

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

export const captureImage = async (setImage) => {
  let options = {
    mediaType: 'photo',
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
    saveToPhotos: true,
    cropping: true,
  };
  let isCameraPermitted = await requestCameraPermission();
  let isStoragePermitted = await requestExternalWritePermission();
  if (isCameraPermitted && isStoragePermitted) {
    launchCamera(options, (response) => {
      if (response.assets) {
        setImage(response.assets[0].uri ? response.assets[0].uri : '');
      }
    });
  }
};

export const chooseImage = (setImage) => {
  let options = {
    mediaType: 'photo',
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
    cropping: true,
  };
  launchImageLibrary(options, (response) => {
    if (response.assets) {
      setImage(response.assets[0].uri ? response.assets[0].uri : '');
    }
  });
};
