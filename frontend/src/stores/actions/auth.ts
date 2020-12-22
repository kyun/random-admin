import { handleActions } from 'redux-actions';


export interface AuthState {
  access_token: string | null;
  user_id: string | null;
  id: string | null;
  role: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  org_id: string | null;
  asyncState: 'PENDING' | 'FULFILLED' | 'REJECTED';
}
const initialState: AuthState = {
  access_token: null,
  user_id: null,
  id: null,
  role: null,
  status: 'ACTIVE',
  org_id: null,
  asyncState: 'PENDING',
};

export default handleActions<AuthState>(
  {
    LOGIN: (state) => {
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
      }
    },
    LOGIN_FAILURE: (state) => {
      return {
        ...state,
        asyncState: 'REJECTED',
      };
    },
  },
  initialState,
)