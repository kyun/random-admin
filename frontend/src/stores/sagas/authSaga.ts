import Axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

function* _login({ payload }: any) {
  try {
    console.log(payload);
    const res = yield call(({ id, password }) => {
      return Axios.post(`/login`, {
        id,
        password,
      }).then(({ data }) => {
        if (data.access_token) {
          Axios.defaults.headers = {
            Authorization: `Bearer ${data.access_token}`,
          };
          Axios.defaults.withCredentials = true;
        }
        return data;
      });
    }, payload);
    yield put({ type: 'LOGIN_SUCCESS', payload: { ...res.rows[0] } });
  } catch (e) {
    yield put({ type: 'LOGIN_FAILURE' });
  }
}
function* login() {
  yield takeLatest('LOGIN', _login);
}
export default function* authSaga() {
  yield all([
    //login(),
  ]);
}
