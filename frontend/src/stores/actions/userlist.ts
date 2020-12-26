import { createAction, handleActions } from 'redux-actions';
import { User } from 'types/User';

export interface UserList {
  users: Array<User>;
  asyncState: 'PENDING' | 'FULFILLED' | 'REJECTED';
  error?: {
    message: string;
    code: string;
  };
}
export const USERLIST_INITIAL_STATE: UserList = {
  users: [],
  asyncState: 'PENDING',
  error: {
    message: '',
    code: '000',
  },
};

export default handleActions<UserList>(
  {
    GET_USER_LIST_SUCCESS: (state, { payload }: any) => {
      console.log(payload);
      return {
        ...state,
        users: payload.rows,
      };
    },
    GET_USER_LIST_FAILURE: (state, { payload }: any) => {
      return {
        ...state,
        error: {
          ...payload,
        },
      };
    },
    LOGOUT: (state, action) => {
      return {
        ...state,
      };
    },
  },
  USERLIST_INITIAL_STATE,
);
