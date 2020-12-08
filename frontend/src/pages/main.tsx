import React from 'react';
import './pages.scss';
import { EnvironmentOutlined } from '@ant-design/icons';
function MainPage() {
  const [isOpen, setToggle] = React.useState(false);
  return (
    <div className="Page">
      <nav className={(isOpen && '--wide') || ''}>
        {' '}
        <button onClick={() => setToggle(prev => !prev)}>toggle</button>
        <div style={{ fontSize: '24px', color: '#ff00f0' }}>
          <EnvironmentOutlined />
        </div>
      </nav>
      <div className="content">
        <header>123</header>
        <main>321</main>
      </div>
    </div>
  );
}

export default MainPage;
