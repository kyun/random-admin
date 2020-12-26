import DefaultLayout from 'pages/Layout';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const withAuth = (Component: any) => ({ ...props}) => {
  const { isLogin } = useSelector(({ 
    auth: { access_token, asyncState } 
  }: any) => ({ isLogin: access_token && asyncState === 'FULFILLED' }));
  if(!isLogin){
    return <Redirect to="/login" />
  }  
  return (
    <DefaultLayout>
      <Component {...props} />
    </DefaultLayout>
  )
}
export default withAuth;