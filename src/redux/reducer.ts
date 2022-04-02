import { GET_THEME, SET_LOG, SET_THEME } from '../utilities/asyncStorage';
import auth from '@react-native-firebase/auth';
import { TYPE } from './actions';
const initState = {
  isLoading: false,
  isErr: false,
  theme: true,
  isLog: false,
};
// true: white, false: dark
const reducer = (state = initState, action: action) => {
  switch (action.type) {
    case TYPE.SWITCH_THEME: {
      if (action.payload === undefined) {
        SET_THEME(!state.theme);
        return {
          ...state,
          theme: !state.theme,
        };
      } else SET_THEME(action.payload as boolean);
      return {
        ...state,
        theme: action.payload,
      };
    }
    case TYPE.LOGIN: {
      SET_LOG(true);
      return {
        ...state,
        isLog: true,
      };
    }
    case TYPE.LOGOUT:
      auth().signOut();
      return {
        ...state,
        isLog: false,
      };
    default:
      return state;
  }
};
export default reducer;

interface action {
  type: String;
  payload: Object | String | undefined | boolean;
}

export type reduxState = {
  isLoading: boolean;
  isErr: boolean;
  theme: boolean;
  isLog: boolean;
};
