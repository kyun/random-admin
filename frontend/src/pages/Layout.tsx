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
import { Link, NavLink } from 'react-router-dom';
import { Avatar, Button, Menu, Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  [key: string]: any;
}

const Layout = styled.div`
  display: flex;
  height: 100vh;
  background: rgba(250, 251, 254, 1);
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
  &.--active {
    color: #ff4d4f;
    border-left: 3px solid #ff4d4f;
    background: #fdfdfd;
  }
  border-right: 3px solid transparent;
  font-size: 24px;
  &:hover {
  }
`;

const menu = (
  <Menu>
    <Link to="/d/mypage">
      <Menu.Item>MY</Menu.Item>
    </Link>

    {/* <NavLink to="/d/mypage">Mypage</NavLink> */}
  </Menu>
);
function DefaultLayout(props: Props) {
  const dispatch = useDispatch();
  const { user_id } = useSelector(({ auth: { user_id } }: any) => ({ user_id }));
  function logout() {
    console.log('logout');
    dispatch({ type: 'LOGOUT' });
    // dispatch({ type: 'RESET_STATE' });
  }
  return (
    <Layout>
      <Sidebar>
        <MenuLink exact to="/" activeClassName="--active">
          <AppstoreOutlined />
        </MenuLink>
        <MenuLink exact to="/users" activeClassName="--active">
          <UsergroupAddOutlined />
        </MenuLink>
        <MenuLink exact to="/banner/add" activeClassName="--active">
          <SettingOutlined />
        </MenuLink>
      </Sidebar>
      <Content>
        <Header>
          <Dropdown overlay={menu}>
            <Avatar style={{ marginRight: 8 }} size={32} icon={<UserOutlined />} />
          </Dropdown>
          <div style={{ marginRight: 24 }}>
            <Nickname>{user_id}</Nickname>

            <IpAddress>49.171.227.158</IpAddress>
          </div>
          <Button onClick={logout} shape="circle" icon={<PoweroffOutlined />} />
        </Header>
        <Main>{props.children}</Main>
      </Content>
    </Layout>
  );
}

export default DefaultLayout;
