import { createAction, handleActions } from 'redux-actions';

const login = createAction('LOGIN')();

const initialState = {
  isLogin: false,
};

export default handleActions(
  {
    LOGIN: (state, action) => {
      return {
        ...state,
        isLogin: true,
      };
    },
    LOGIN_SUCCESS: (state, action) => {
      return {
        ...state,
        status: 'fullfiled',
      };
    },
  },
  initialState,
);
