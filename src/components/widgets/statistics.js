import React from 'react';
import {Row, Col, Card, Icon, Statistic, Spin, Skeleton} from "antd";
import {connect} from "react-redux";
import actions from "../../actions/index";

const panelCardStyle = {
  backgroundColor: 'transparent',
  padding: '10px',
  margin: '10px',
};

class Statistics extends React.Component {
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

  getContent() {
    if(this.props.servers === undefined) {
      return (<Skeleton active />);
    }

    return (
      <React.Fragment>
        <Row gutter={20} type="flex" justify="space-between">
          <Col span={10}>
            <Statistic prefix={<Icon type="team" />} title="Players" value={1337} />
          </Col>
          <Col span={10}>
            <Statistic prefix={<Icon type="rocket" />} title="Peak Players" value={9001} />
          </Col>
          <Col span={10}>
            <Statistic prefix={<Icon type="eye" />} title="Admins Online" value={3} />
          </Col>
          <Col span={10}>
            <Statistic prefix={<Icon type="solution" />} title="Forum Posts" value={93782} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Col className="gutter-row" {...this.getDefaultWidgetColProps()}>
        <Spin spinning={this.props.servers === undefined}>
          <Card title="Statistics" style={panelCardStyle}>
            {this.getContent()}
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
)(Statistics);