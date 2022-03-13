import { TYPE } from './actions';
const initState = {
  isLoading: false,
  isErr: false,
  theme: true,
};
// true: white, false: dark
const reducer = (state = initState, action: action) => {
  switch (action.type) {
    case TYPE.SWITCH_THEME:
      return {
        ...state,
        theme: action.type,
      };
    default:
      return state;
  }
};
export default reducer;

interface action {
  type: String;
  payload: Object | String | undefined;
}

export type reduxState = {
  isLoading: Boolean;
  isErr: Boolean;
  theme: Boolean;
};
