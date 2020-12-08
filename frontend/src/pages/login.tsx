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
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const dispatch = useDispatch();
  const router = useHistory();
  React.useEffect(() => {
    console.log('??');
    dispatch({ type: 'LOGIN' });
    //router.push('/');
  }, []);

  function handleClick() {
    console.log('ggg');
    router.push('/');
  }

  return (
    <div className="page">
      <div className="card">
        <div className="icon-wrapper">
          <h1 style={{ color: blue[0] }}>{RandomIcon()}</h1>
        </div>
        <div className="wrapper">
          <Input />
        </div>
        <div className="wrapper">
          <Input />
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
