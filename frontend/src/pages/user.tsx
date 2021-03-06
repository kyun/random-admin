import React from 'react';
import styled from 'styled-components';
import { Table, Tag, Breadcrumb,Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import withAuth from 'hocs/withAuth';

const columns = [
  {
    title: 'Index',
    dataIndex: 'idx',
    key: 'idx',
    render: (text: any) => <a>{text}</a>,
  },
  {
    title: 'User_Id',
    dataIndex: 'user_id',
    key: 'user_id',
  },
  {
    title: 'is',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Role',
    key: 'role',
    dataIndex: 'role',
    render: (text: any) => (
      <>

        <Tag color={'red'} key={text}>
          {text.toUpperCase()}
        </Tag>

      </>
    ),
  },
];

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const UserListWrapper = styled.div`
  border: 2px solid #f0f0f0;
  background: #fff;
  padding: 0 8px;
  width: 100%;
`;
const Title = styled.h3`
  font-size: 20px;
  font-weight: regular;
  color: #222;
  padding: 8px 16px;
`;
interface Props {
  [key: string]: any;
}
function UserPage(props: Props){
  const dispatch = useDispatch();
  const { users } = useSelector(({ user: { users } }: any) => ({ users }));
  React.useEffect(()=>{
    dispatch({type: 'GET_USER_LIST'});
  },[]);
  return (
    <Layout>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application Center</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <UserListWrapper>
        <Title>회원 관리</Title>
        <Link to="/d/user">
        <Button>
          유저 추가
        </Button>
        </Link>

        <Table columns={columns} dataSource={users} />
      </UserListWrapper>
    </Layout>
  )
}

export default withAuth(UserPage);