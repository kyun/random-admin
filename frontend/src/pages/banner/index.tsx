import React from 'react';
import styled from 'styled-components';
import { Table, Tag, Breadcrumb, Space, Button, message } from 'antd';
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
  padding: 8px;
  width: 100%;
  max-width: 1440px;
`;
const Title = styled.h3`
  font-size: 20px;
  font-weight: regular;
  color: #222;
  padding: 8px 16px;
`;
const Toolbar = styled.div`
  border: 1px solid #f0f0f0;
  height: 80px;
  width: 100%;
  margin-bottom: 16px;
`;

interface Props {
  [key: string]: any;
}
function BannerPage(props: Props) {
  const dispatch = useDispatch();
  const { users, error } = useSelector(({ userlist: { users, error } }: any) => ({ users, error }));
  React.useEffect(() => {
    Axios.get(`/banners`).then((res: any)=>{
      console.log(res);
      console.log(res.data.rows?.[0]?.created_at.toLocaleString())
    })
    // message.success('Eneter this room');
  }, []);

  React.useEffect(() => {
    if (error.message !== '') {
      message.error(error.message);
    }
  }, [error]);
  return (
    <Layout>
      <Title>User List</Title>
      <UserListWrapper>
        <Toolbar></Toolbar>
        <Table rowKey="id" columns={columns} dataSource={users} />
      </UserListWrapper>
    </Layout>
  );
}

export default withAuth(BannerPage);
