import React from 'react';
import {Icon, Statistic, Tabs, Row, Col, Skeleton} from "antd";
import {connect} from "react-redux";
import actions from "../../../actions/index";

class Health extends React.Component {
  getHealthStatistic(value) {
    let icon;

    if(value === 'Online') {
      icon = (<Icon type="check-circle" theme="twoTone" twoToneColor="#22EE22" />);
    } else if(value === 'Offline') {
      icon = (<Icon type="exclamation-circle" theme="twoTone" twoToneColor="#EE2222" />);
    } else if(value === 'Unknown') {
      icon = (<Icon type="question-circle" theme="twoTone" twoToneColor="#CCCC55" />);
    } else {
      icon = (<Icon type="stop" theme="twoTone" twoToneColor="#EE2222" />);
    }

    return (
      <span>{icon} {value}</span>
    );
  }

  getContent() {
    if(this.props.config === undefined) {
      return (<Skeleton active />);
    }

    return (
      <React.Fragment>
        <Row gutter={20} type="flex" justify="space-between">
          <Col span={10}>
            <Statistic title="SS13 Server" value={"Online"} formatter={this.getHealthStatistic} />
          </Col>
          <Col span={10}>
            <Statistic title="CentCom Server" value={"Unknown"} formatter={this.getHealthStatistic} />
          </Col>
          <Col span={10}>
            <Statistic title="Server Reporter" value={"Offline"} formatter={this.getHealthStatistic} />
          </Col>
          <Col span={10}>
            <Statistic title="Database" value={"Error"} formatter={this.getHealthStatistic} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Tabs.TabPane
        {...this.props}
        className="server-stats-menu-item"
      >
        {this.getContent()}
      </Tabs.TabPane>
    );
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
)(Health);