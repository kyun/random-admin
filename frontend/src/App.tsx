import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';

import DynamicRoutes from 'DynamicRoutes';
import Axios from 'axios';

const { Header, Sider } = Layout;

function Home() {
  return (
    <main>
      <h1>Home</h1>
    </main>
  );
}
function setAxiosDefault() {
  Axios.defaults.baseURL = `http:localhost:4000/dev`;
  Axios.defaults.withCredentials = true;

}
function App() {  
  React.useEffect(()=>{
    setAxiosDefault();
  },[]);
  return (
    <div>
      <DynamicRoutes />
    </div>
    // <BrowserRouter>
    //   <Switch>
    //     <Route path="/" exact component={()=>(<Redirect to="/login" />)} />
    //     <PrivateRoute path="/d" render={({ match: { url }}: any) => (
    //       <DefaultLayout>
    //         <Route path={`${url}/`} exact component={DashboardPage} />
    //         <Route path={`${url}/mypage`} exact component={MyPage} />

    //         <Route path={`${url}/a`} exact component={UserPage} />
    //         <Route path={`${url}/b`} exact component={()=><h1>b</h1>} />
    //         <Route path={`${url}/user`} exact component={UserPage} />
    //         <Route path={`${url}/user/add`} exact component={UserAddPage} />

    //       </DefaultLayout>
    //     )}/>
    //     <Route path="/login" exact component={LoginPage} />

    //   </Switch>
    // </BrowserRouter>
  );
}

function PrivateRoute({ component: Component, render, ...rest}: any) {
  const { isLogin } = useSelector(({ 
    auth: { access_token, asyncState } 
  }: any) => ({ isLogin: access_token && asyncState === 'FULFILLED' }));
  if(!isLogin){
    return <Redirect to="/login" />
  }
  return <Route {...rest} render={render} />
}

// function PrivateRoute({ component: Component, ...rest }: any) {
//   const { isLogin } = useSelector(({ user: { isLogin } }: any) => ({ isLogin }));
//   console.log(rest);
//   return <Route {...rest} render={props => (isLogin ? <Component {...props} /> : <Redirect to="/login" />)} />;
// }

export default App;
