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

function* _getUserList({ payload }: any) {
  try{
    console.log('GET_USER_LIST_SAGA')
    const res = yield call(getUserListAPI);
    console.log(res.data);
    yield put({ type: 'GET_USER_LIST_SUCCESS', payload: { ...res.data }});
  }catch(e){
    yield put({ type: 'GET_USER_LIST_FAILURE'})
  }
}
function* getUserList() {
  yield takeLatest('GET_USER_LIST', _getUserList);
}
export default function* userSaga() {
  yield all([
    login(),
    getUserList(),
  ]);
}

async function getUserListAPI(){
  return Axios.get(`http://localhost:4000/dev/users?page=1`, {
    withCredentials: true
  }).then((res)=>res);
}

async function loginAPI({id, password}: any){
  return Axios.post(`http://localhost:4000/dev/login`,{
    id, password
  }, {
    withCredentials: true,
  }).then((res)=>{
    if(res.data.access_token){
      setAxiosDefault(res.data.access_token)
    }
    return res;
  });
}

function setAxiosDefault(token: string){
  Axios.defaults.headers = {
    Authorization: `Bearer ${token}`
  }
}