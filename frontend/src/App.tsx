import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login';
import { Layout } from 'antd';

const { Header, Sider } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact component={(<h1>Main</h1>)} />
        <Route path="/login" exact>
          <LoginPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

function PrivateRoute({ component: Component, ...rest }: any) {
  return (
    <Route {...rest} render={ props => (
      false ? <Component {...props} /> : <Redirect to="/login" />
    )} />
  );
};

export default App;
