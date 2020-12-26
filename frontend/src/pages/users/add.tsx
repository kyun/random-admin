import { Button, Input } from 'antd';
import Axios from 'axios';
import withAuth from 'hocs/withAuth';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';


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
  padding: 8px;
`

function UserAddPage() {
  const { access_token } = useSelector(({ user: { access_token } }: any) => ({ access_token }));
  const [id, setId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('');
  
  function handleSubmit(){
    Axios.put(`http://localhost:4000/dev/add`, {
      id, password, role
    }, {
      withCredentials: true,  
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }

    )
  };

  return (
    <Layout>
      <Wrapper>
        <Input value={id} onChange={(e)=>setId(e.target.value)} type="text" />
        <Input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" />
        <Input value={role} onChange={(e)=>setRole(e.target.value)} type="text" />
        <Button onClick={handleSubmit}>Submit</Button>
        
      </Wrapper>
    </Layout>
  )
};

export default withAuth(UserAddPage);