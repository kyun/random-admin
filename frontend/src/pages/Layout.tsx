import React from 'react';
import styled from 'styled-components';
import {
  UserOutlined,
  PoweroffOutlined,
  QuestionOutlined,
  InstagramOutlined,
  TwitterOutlined,
  GithubOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { Avatar, Button } from 'antd';

interface Props {
  [key: string]: any;
}

const Layout = styled.div`
  display: flex;
  height: 100vh;
  background: rgba(250,251,254,1);
`;
const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 16px;
  width: 100%;
  min-height: 60px;
  background: #fff;
  border-bottom: 2px solid #f0f0f0;
`;
const IpAddress = styled.p`
  font-size: 11px;
  color: #999;
  margin: 0;
`;
const Nickname = styled.p`
  margin: 0;
  font-size: 14px;
  color: #444;
`;
const Sidebar = styled.nav`
  flex: 0 0 60px;
  background: #fff;
  border-right: 2px solid #f0f0f0;
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Main = styled.main`
  padding: 16px;
  height: 100%;
`;
const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  border-left: 3px solid transparent;
  color: #222;
  background: #fff;
  &.--active{
    color: #ff4d4f;
    border-left: 3px solid #ff4d4f;
    background: #fdfdfd;
  }
  border-right: 3px solid transparent;
  font-size: 24px;
  &:hover{
    
  }
`
function DefaultLayout(props: Props){

  return (
    <Layout>
      <Sidebar>
        <MenuLink exact to="/d" activeClassName="--active">
          <AppstoreOutlined />        
        </MenuLink>
        <MenuLink exact to="/d/a" activeClassName="--active">
          <UsergroupAddOutlined /> 
        </MenuLink>
        <MenuLink exact to="/d/b" activeClassName="--active">
          <SettingOutlined />
        </MenuLink>
      </Sidebar>
      <Content>
        <Header>
          <Avatar style={{marginRight: 8}} size={32} icon={<UserOutlined />} />
          <div style={{marginRight: 24}}>
            <Nickname>username123</Nickname>
            <IpAddress>49.171.227.158</IpAddress>
          </div>
          <Button shape="circle" icon={<PoweroffOutlined />} />
        </Header>
        <Main>
          {props.children}
        </Main>
      </Content>
    </Layout>
  )
};

export default DefaultLayout;