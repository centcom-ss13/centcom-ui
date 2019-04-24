import React from 'react';
import {Layout} from 'antd';
import PageSwitcher from "../routes/pageSwitcher";

const {
  Content,
} = Layout;

const style = {
  color: '#333',
  padding: '14px',
  minHeight: 'unset',
  display: 'flex',
  flexDirection: 'column',
};

export default class PageContent extends React.Component {
  render() {
    return (
      <Content style={style}>
        <PageSwitcher/>
      </Content>
    );
  }
}