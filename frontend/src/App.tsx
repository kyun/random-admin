import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import MainPage from 'pages/main';

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
        <PrivateRoute path="/" exact component={MainPage} />
        <Route path="/login" exact>
          <LoginPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

function PrivateRoute({ component: Component, ...rest }: any) {
  const { isLogin } = useSelector(({ user: { isLogin } }: any) => ({ isLogin }));

  return <Route {...rest} render={props => (isLogin ? <Component {...props} /> : <Redirect to="/login" />)} />;
}

export default App;
