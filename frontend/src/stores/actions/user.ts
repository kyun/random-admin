import { createAction, handleActions } from 'redux-actions';

const initialState = {
  isLogin: false,
};

export default handleActions(
  {
    // LOGIN: (state, action) => {
    //   return {
    //     ...state,
    //     isLogin: true,
    //   };
    // },
    LOGIN_SUCCESS: (state, action) => {
      console.log('SUCCESS');
      return {
        ...state,
        isLogin: true,
        status: 'fullfiled',
      };
    },
    LOGIN_FAILURE: (state) => {
      console.log('FAILURE');
      return {
        ...state
      }
    },
    LOGOUT: (state, action) => {
      return {
        ...state,
        isLogin: false,
      }
    }
  },
  initialState,
);
