import React from 'react';
import {Col, Card, Tabs, Icon, Spin} from "antd";
import Info from "./serverStats/info";
import LastRound from "./serverStats/lastRound";
import Health from "./serverStats/health";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import actions from "../../actions/index";

const panelCardStyle = {
  backgroundColor: 'transparent',
  padding: '10px',
  margin: '10px',
};

class ServerDetails extends React.Component {
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
          <Card title="Server Stats" style={panelCardStyle}>
            <Tabs
              type="card"
              className="server-stats-menu"
            >
              <Info tab={<span><Icon type="info-circle" />Info</span>} key="info" />
              <LastRound
                tab={<span><Icon type="arrow-left" />Last Round</span>}
                key="lastRound"
              />
              <Health
                tab={<span><Icon type="medicine-box" />Health</span>}
                key="health"
              />
            </Tabs>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServerDetails));