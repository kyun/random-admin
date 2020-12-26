import { handleActions } from 'redux-actions';

export interface AuthState {
  access_token: string | null;
  user_id: string | null;
  id: string | null;
  role: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  org_id: string | null;
  asyncState: 'PENDING' | 'FULFILLED' | 'REJECTED';
  error?: {
    message: string;
    code: string;
  };
}
export const AUTH_INITIAL_STATE: AuthState = {
  access_token: null,
  user_id: null,
  id: null,
  role: null,
  status: 'ACTIVE',
  org_id: null,
  asyncState: 'PENDING',
  error: {
    message: '',
    code: '000',
  },
};

export default handleActions<AuthState>(
  {
    LOGIN: state => {
      return {
        ...state,
        asyncState: 'PENDING',
      };
    },
    LOGIN_SUCCESS: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        asyncState: 'FULFILLED',
      };
    },
    LOGIN_FAILURE: state => {
      return {
        ...state,
        asyncState: 'REJECTED',
      };
    },
    LOGOUT: state => {
      console.log('KOGGGG??');
      return AUTH_INITIAL_STATE;
    },
  },
  AUTH_INITIAL_STATE,
);
