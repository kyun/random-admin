import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';

const Layout = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border: 2px solid #f0f0f0;
  width: 480px;
  height: 100%;
`
function MyPage() {
  return (
    <Layout>
      <Wrapper>
        <div>
          <Avatar size={128} icon={<UserOutlined />} />
        </div>
        <div>
          <Input placeholder="UserName" />
          <Input placeholder="Password" />
          <Input placeholder="Password confirm" />

        </div>

      </Wrapper>
    </Layout>
  )
}

export default MyPage;