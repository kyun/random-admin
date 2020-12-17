import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import MainPage from 'pages/main';
import DefaultLayout from 'pages/Layout';
import DashboardPage from 'pages/dashboard';
import UserPage from 'pages/user';
import MyPage from 'pages/mypage';

const { Header, Sider } = Layout;

function Home() {
  return (
    <main>
      <h1>Home</h1>
    </main>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={()=>(<Redirect to="/login" />)} />
        <PrivateRoute path="/d" render={({ match: { url }}: any) => (
          <DefaultLayout>
            <Route path={`${url}/`} exact component={DashboardPage} />
            <Route path={`${url}/mypage`} exact component={MyPage} />

            <Route path={`${url}/a`} exact component={UserPage} />
            <Route path={`${url}/b`} exact component={()=><h1>b</h1>} />
          </DefaultLayout>
        )}/>
        <Route path="/login" exact component={LoginPage} />

      </Switch>
    </BrowserRouter>
  );
}

function PrivateRoute({ component: Component, render, ...rest}: any) {
  const { isLogin } = useSelector(({ user: { isLogin } }: any) => ({ isLogin }));
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
