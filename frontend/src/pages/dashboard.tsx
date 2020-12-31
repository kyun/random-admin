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
      <LoginHistoryWrapper>
        <Title>Login History</Title>
        <HistoryItem>
          <TagWrapper><Tag color="#87d068">Login</Tag></TagWrapper>
          <div>
            <Nickname>User123123</Nickname>
            <IpAddress>49.171.227.158</IpAddress>
          </div>

          <Date>2020.12.10 01:19:12</Date>
        </HistoryItem>
        <HistoryItem>
        <TagWrapper><Tag color="#bebebe">Logout</Tag></TagWrapper>
          <div>
            <Nickname>User123123</Nickname>
            <IpAddress>49.171.227.158</IpAddress>
          </div>
          <Date>2020.12.10 01:19:12</Date>
        </HistoryItem>
      </LoginHistoryWrapper>
      <TimelineWrapper>
        <Title>Your Timeline</Title>
        <Timeline>
          {/* <Divider>
            <span style={{color: '#999', fontSize: '12px', fontWeight: 'normal'}}>Today</span>
          </Divider> */}
          <Timeline.Item color="red">
            <TimelineText>
              권한 없음
              <Date>01:19:19</Date>
            </TimelineText>
          </Timeline.Item>
          <Timeline.Item color="red">
            <TimelineText>
              기록을 삭제하려고 시도함.
              <Date>01:19:19</Date>
            </TimelineText>
          </Timeline.Item>
          <Timeline.Item color="red">
            <TimelineText>
              사용자 삭제
              <Date>01:19:14</Date>
            </TimelineText>
          </Timeline.Item>
          <Timeline.Item color="green">
            <TimelineText>
              #124
              사용자 추가
              <Date>01:19:13</Date>
            </TimelineText>
          </Timeline.Item>
          <Timeline.Item>
            <TimelineText>
              #123
              로그인 (49.171.227.158)
              <Date>01:19:12</Date>
            </TimelineText>
          </Timeline.Item>
          <Divider>
            <span style={{color: '#999', fontSize: '12px', fontWeight: 'normal'}}>Yesterday</span>
          </Divider>
          <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
          <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
          <Divider>
            <span style={{color: '#999', fontSize: '12px', fontWeight: 'normal'}}>2020.12.07</span>
          </Divider>
        </Timeline>
      </TimelineWrapper>
      <TimelineWrapper >
        <Link to="/banner">Banner</Link>
      </TimelineWrapper>
    </Layout>
  );
}

export default withAuth(DashboardPage);
