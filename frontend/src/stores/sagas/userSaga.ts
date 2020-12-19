import Axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
function* gen(p:any) {
  try{
    console.log('LOGIN SAGA');
    const res = yield call(loginAPI, p.payload);
    console.log(res.data);
    yield put({ type: 'LOGIN_SUCCESS', payload: { ...res.data } });
  }catch (e){
    console.log(e);
    yield put({ type: 'LOGIN_FAILURE'});
  }

}
function* login() {
  yield takeLatest('LOGIN', gen);
}
export default function* userSaga() {
  yield all([login()]);
}


async function loginAPI({id, password}: any){
  return Axios.post(`http://localhost:4000/dev/login`,{
    id, password
  }, {
    withCredentials: true,
  }).then((res)=>res);
}