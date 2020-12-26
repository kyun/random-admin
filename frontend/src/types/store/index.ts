import { AppState } from 'stores/actions/app';
import { AuthState } from 'stores/actions/auth';
import { UserList } from 'stores/actions/userlist';

export interface StoreState {
  auth: AuthState;
  userlist: UserList;
  app: AppState;
}
