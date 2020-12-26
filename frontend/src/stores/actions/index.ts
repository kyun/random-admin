import { combineReducers } from 'redux';
import userlist, { USERLIST_INITIAL_STATE } from './userlist';
import auth, { AUTH_INITIAL_STATE } from './auth';
import app, { APP_INITIAL_STATE } from './app';
import { StoreState } from 'types/store';

// const rootReducer = (state: StoreState, action: any) => {
//   if (action.type === 'RESET_STATE') {
//     state = {
//       auth: AUTH_INITIAL_STATE,
//       userlist: USERLIST_INITIAL_STATE,
//     };
//   }
//   return appReducer(state, action);
// };
const rootReducer = combineReducers<StoreState>({
  userlist,
  auth,
  app,
});
export default (state: any, action: any) =>
  rootReducer(
    action.type === 'LOGOUT'
      ? {
          auth: AUTH_INITIAL_STATE,
          userlist: USERLIST_INITIAL_STATE,
          app: APP_INITIAL_STATE,
        }
      : state,
    action,
  );
