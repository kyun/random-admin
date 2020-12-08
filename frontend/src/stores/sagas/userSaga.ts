import { all, put, takeLatest } from 'redux-saga/effects';
function* gen() {
  console.log('LOGIN SAGA');
  yield put({ type: 'LOGIN_SUCCESS' });
}
function* login() {
  yield takeLatest('LOGIN', gen);
}
export default function* userSaga() {
  yield all([login()]);
}
