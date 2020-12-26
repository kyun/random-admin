import { handleActions } from 'redux-actions';

export interface AppState {
  error: {
    message: string;
    code: string;
  };
}
export const APP_INITIAL_STATE: AppState = {
  error: {
    message: '',
    code: '',
  },
};

export default handleActions<AppState>(
  {
    UPDATE_ERROR: (state, { payload }: any) => {
      return {
        ...state,
        error: {
          ...payload,
        },
      };
    },
  },
  APP_INITIAL_STATE,
);
