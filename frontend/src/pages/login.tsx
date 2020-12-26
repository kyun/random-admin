import React from 'react';
import './login.scss';
import { Input, Button, Tooltip } from 'antd';
import {
  QuestionOutlined,
  InstagramOutlined,
  TwitterOutlined,
  GithubOutlined,
  SlackOutlined,
  IeOutlined,
} from '@ant-design/icons';
import { blue } from '@ant-design/colors';

import { useInterval } from 'hooks/useInterval';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

function LoginPage() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(({ 
    auth: { access_token, asyncState } 
  }: any) => ({ isLogin: access_token && asyncState === 'FULFILLED' }));

  const router = useHistory();
  const [token, setToken] = React.useState('');
  const [id, setId] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(()=>{
    isLogin && router.push('/');
  },[isLogin]);


  function handleClick() {
    console.log(id, password);
    dispatch({ type: 'LOGIN', payload: {
      id,
      password
    } });
    // Axios.get(`http://localhost:4000/dev/hello`, {

  }
  function getToken() {
    dispatch({
      type: 'LOGIN',
      payload: {
        id: '123',
        password: '123',
      }
    })
  }

  return (
    <div className="page">
      <div className="card">
        <div className="icon-wrapper">
          <h1 style={{ color: blue[0] }}>{RandomIcon()}</h1>
          <Button onClick={getToken}>POWER LOGIN</Button>
        </div>
        <div className="wrapper">
          <Input value={id} onChange={(e)=>setId(e.target.value)} />
        </div>
        <div className="wrapper">
          <Input value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className="wrapper" style={{ justifyContent: 'space-between' }}>
          <Tooltip title="You can access restrictly" placement="bottom">
            <span className="guest-text">I am a guest...</span>
          </Tooltip>
          <Button onClick={handleClick}>Hell Yeah</Button>
        </div>
      </div>
    </div>
  );
}

const ICONS = [
  <SlackOutlined />,
  <InstagramOutlined />,
  <QuestionOutlined />,
  <TwitterOutlined />,
  <GithubOutlined />,
  <IeOutlined />,
];
function RandomIcon() {
  const [idx, setIdx] = React.useState(0);
  useInterval(() => {
    let randomnumber = randomNumber(0, 5);
    setIdx(randomnumber);
  }, 100);
  return ICONS[idx];
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export default LoginPage;
