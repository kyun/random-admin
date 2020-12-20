import React from 'react';
import styled from 'styled-components';
import { Table, Tag, Breadcrumb,Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: any) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: any) => (
      <>
        {tags.map((tag: any) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: any, record: any) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
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
  const { access_token } = useSelector(({ user: { access_token } }: any) => ({ access_token }));
  React.useEffect(()=>{
    const res = Axios.get(`http://localhost:4000/dev/users?page=1`, {
      withCredentials: true,  
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    console.log(res);
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

        <Table columns={columns} dataSource={data} />
      </UserListWrapper>
    </Layout>
  )
}

export default UserPage;