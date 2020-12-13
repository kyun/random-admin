import React from 'react';
import styled from 'styled-components';
// import './pages.scss';
import { UsergroupAddOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Button, Avatar } from 'antd';


const Page = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
  border: 2px solid #f0f0f0;
`

function MainPage() {
  const dispatch = useDispatch();
  const [isOpen, setToggle] = React.useState(false);

  function logout(){
    dispatch({ type: 'LOGOUT' });
  }
  return (
    <>
    <h1>Title</h1>
      <Page />
    </>
  );
}

export default MainPage;
