import AsyncStorage from '@react-native-async-storage/async-storage';

export const SET_THEME = async (theme: boolean) => {
  try {
    await AsyncStorage.setItem('@theme', JSON.stringify(theme));
  } catch (e) {
    // saving error
  }
};

export const GET_THEME = async () => {
  try {
    // const a =
    return JSON.parse((await AsyncStorage.getItem('@theme')) || 'true');
  } catch (e) {
    // saving error
  }
};

export const SET_LOG = async (type: boolean) => {
  try {
    await AsyncStorage.setItem('@isLog', JSON.stringify(type));
  } catch (e) {
    // saving error
  }
};
export const GET_LOG = async () => {
  try {
    return await AsyncStorage.getItem('@isLog');
  } catch (e) {
    // saving error
  }
};
