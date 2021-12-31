import AsyncStorage from '@react-native-async-storage/async-storage';

export const setTheme = async (theme = 'LIGHT') => {
  try {
    await AsyncStorage.setItem('@theme', theme);
  } catch (e) {
    // saving error
  }
};
