import React from 'react';
import {Table, Col, Card, Button, Spin} from "antd";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import actions from "../../actions/index";

const panelCardStyle = {
  backgroundColor: 'transparent',
  padding: '10px',
  margin: '10px',
};

const tableStyle = {
  minWidth: '200px',
};

const serverListColumns = [
  {
    title: '',
    key: 'name',
    render: (text, server) => (
      <span>
            <h2 style={{ margin: 'auto' }}>{server.name}</h2>
          </span>
    ),
  },
  {
    title: '',
    key: 'joinserver',
    render: (text, server) => (
      <span>
            <a href={`byond://${server.url}:${server.port}`}><Button type="primary">Join!</Button></a>
          </span>
    ),
  },
];

class Servers extends React.Component {
  getDefaultWidgetColProps() {
    return {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 12,
      xl: 12,
      xxl: 8,
    };
  }

  render() {
    return (
      <Col className="gutter-row" {...this.getDefaultWidgetColProps()}>
        <Spin spinning={this.props.servers === undefined}>
          <Card title="Servers" style={panelCardStyle}>
            <Table
              showHeader={false}
              style={tableStyle}
              dataSource={this.props.servers || []}
              columns={serverListColumns}
              pagination={false}
            />
          </Card>
        </Spin>
      </Col>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    servers: state.app.servers,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Servers);