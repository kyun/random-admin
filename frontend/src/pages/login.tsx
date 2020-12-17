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
  const { isLogin } = useSelector(({ user: { isLogin } }: any) => ({ isLogin }));

  const router = useHistory();
  const [token, setToken] = React.useState('');
  const [id, setId] = React.useState('');
  const [password, setPassword] = React.useState('');
  // React.useEffect(() => {
  //   console.log('??');
  //   dispatch({ type: 'LOGIN', payload: {
  //     id,
  //     password
  //   } });
  //   // Axios.post(`http://localhost:4000/dev`).then((res)=>{
  //   //   console.log(res);
  //   // })
  //   //router.push('/');
  // }, []);
  React.useEffect(()=>{
    isLogin && router.push('/d');
  },[isLogin]);


  function handleClick() {
    console.log(id, password);
    dispatch({ type: 'LOGIN', payload: {
      id,
      password
    } });
    // Axios.get(`http://localhost:4000/dev/hello`, {
    //   withCredentials: true,  
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // }).then((res)=>{
    //   console.log(res);
    // });
    // Axios.post(`http://localhost:4000/dev/login`, {
    //   id, password
    // }, {
    //   withCredentials: true,  
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // }).then((res)=>{
    //   console.log(res);
    // })
    // Axios.post(`http://localhost:4000/dev`,{}, {
    //   withCredentials: true,
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // }).then((res)=>{
    //   console.log(res);
    // })
    // router.push('/d');
  }
  function getToken() {

    Axios.post(`http://localhost:4000/dev/generateToken`, { id: 'RANDOME'}, { withCredentials: true }).then((res: any)=>{
      console.log(res.data);
      console.log(res.data.token);
      setToken(res.data.token || '');
    })
  }

  return (
    <div className="page">
      <div className="card">
        <div className="icon-wrapper">
          <h1 style={{ color: blue[0] }}>{RandomIcon()}</h1>
          <Button onClick={getToken}>GGG</Button>
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
