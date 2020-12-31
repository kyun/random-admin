import React from 'react';
import styled from 'styled-components';
import { Timeline, Tag, Divider } from 'antd';
import withAuth from 'hocs/withAuth';
import { Link } from 'react-router-dom';

const Layout = styled.div`
  display: flex;
  height: 100%;
`;

const TimelineWrapper = styled.div`
  border: 2px solid #f0f0f0;
  background: #fff;
  flex: 0 0 360px;
  padding: 0 8px;
`
const LoginHistoryWrapper = styled.div`
  border: 2px solid #f0f0f0;
  background: #fff;
  flex: 0 0 360px;
  height: 360px;
  margin-right: 16px;
`;
const Title = styled.h3`
  font-size: 20px;
  font-weight: regular;
  color: #222;
  padding: 8px 16px;
`;
const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  padding: 8px;
  &:nth-child(odd){
    background: #fafcfe;
  }
`;

const IpAddress = styled.p`
  font-size: 11px;
  color: #999;
  margin: 0;
`;
const Nickname = styled.p`
  margin: 0;
  font-size: 14px;
  color: #444;
`;
const Date = styled.span`
  font-size: 11px;
  color: #444;
  margin-left: 32px;
`;
const TagWrapper = styled.div`
  width: 66px;
`;
const TimelineText = styled.span`
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  font-size: 12px;
  color: #222;
  margin: 0;
`

function DashboardPage() {
  return (
    <Layout>

      <TimelineWrapper >
        <Link to="/banner">Banner</Link>
        
      </TimelineWrapper>
    </Layout>
  );
}

export default withAuth(DashboardPage);
