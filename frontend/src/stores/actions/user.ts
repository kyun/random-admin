import { createAction, handleActions } from 'redux-actions';

export interface UserList{
  
}
const initialState = {
  isLogin: false,
};

export default handleActions(
  {
    GET_USER_LIST_SUCCESS: (state, { payload }: any) => {
      return {
        ...state,
      }
    },
    GET_USER_LIST_FAILURE: (state) => {
      return {
        ...state,
      }
    },
    LOGOUT: (state, action) => {
      return {
        ...state,
      }
    }
  },
  initialState,
);
