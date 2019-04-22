import React from 'react';
import {Button, Col, Card, Row, Divider, Spin} from "antd";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import actions from "../../actions/index";

const panelCardStyle = {
  backgroundColor: 'transparent',
  padding: '10px',
  margin: '10px',
};

class Intro extends React.Component {
  getDefaultWidgetColProps() {
    return {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 24,
      xxl: 24,
      style: {
        marginTop: '10px',
      },
    };
  }

  getIntroColProps() {
    return {
      xs: 24,
      sm: 21,
      md: 18,
      lg: 15,
      xl: 13,
      xxl: 10,
    };
  }

  getContent() {
    if (this.props.servers === undefined || this.props.config === undefined) {
      return (
        <Spin><div className="panelIntro"></div></Spin>
      );
    }

    const mainServer = this.props.servers.find(server => server.name === 'Main');

    return (
      <div className="panelIntro">
        <h1 style={{ fontSize: '35px' }}>{this.props.config.panel_home_intro_text}</h1>
        <a href={`byond://${mainServer.url}:${mainServer.port}`}>
          <Button type="primary" style={{ margin: '10px' }}>Join Server!</Button>
        </a>
      </div>
    );
  }

  render() {
    return (
      <Col className="gutter-row" {...this.getDefaultWidgetColProps()}>
        <Row type="flex" justify="center" style={{ textAlign: 'center' }}>
          <Col className="gutter-row" {...this.getIntroColProps()}>
            {this.getContent()}
          </Col>
        </Row>
        <Divider/>
      </Col>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    config: state.app.config,
    servers: state.app.servers,
  }
};

const mapDispatchToProps = { ...actions };

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Intro));