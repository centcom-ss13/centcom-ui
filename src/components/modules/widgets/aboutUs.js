import React from 'react';
import {Button, Row, Col, Card, Divider, Icon, Spin, Skeleton} from "antd";
import TwitterIcon from "../../icons/twitterIcon";
import SteamIcon from "../../icons/steamIcon";
import DiscordIcon from "../../icons/discordIcon";
import {connect} from "react-redux";
import actions from "../../../actions/index";

const panelCardStyle = {
  backgroundColor: 'transparent',
  padding: '10px',
  margin: '10px',
};

const followButtonStyle = {
  width: '90%',
  margin: '0 5%',
  padding: '0 auto',
};

const iconLinkStyle = {
  padding: '0px 10px',
  height: '100%',
};

class AboutUs extends React.Component {
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

  isLoading() {
    return this.props.config === undefined;
  }

  wrapWithLinkIfExists(Component, configKey) {
    if(this.props.config && this.props.config[configKey]) {
     return (<a href={this.props.config[configKey]} style={iconLinkStyle}><Component /></a>)
    }

    return <Component />
  }

  getFollowLinks() {
    return (
      <React.Fragment>
        <Col className="gutter-row" span={8}>{this.wrapWithLinkIfExists(TwitterIcon, 'twitter_url')}</Col>
        <Col className="gutter-row" span={8}>{this.wrapWithLinkIfExists(SteamIcon, 'steam_url')}</Col>
        <Col className="gutter-row" span={8}>{this.wrapWithLinkIfExists(DiscordIcon, 'discord_url')}</Col>
      </React.Fragment>
    );
  }

  getAboutUs() {
    if(this.isLoading()) {
      return <Skeleton active />
    }

    return (
      <React.Fragment>
        Put some stuff here!<br />
        <br />
        Current Council Members:<br />
        Xantam, Colburn3000, BritishGrace, Yogurtshrimp69, OakBoscage<br />
        <br />
        Host: Xantam<br />
        Head Coders: Altoids0, Monster860<br />
      </React.Fragment>
    );
  }

  render() {
    return (
      <Col className="gutter-row" {...this.getDefaultWidgetColProps()}>
        <Spin spinning={this.isLoading()}>
          <Card title="About Us" style={panelCardStyle}>
            {this.getAboutUs()}
            <Divider />
              <Row type="flex" justify="space-between" style={{ textAlign: 'center' }}>
                {this.getFollowLinks()}
              </Row>
          </Card>
        </Spin>
      </Col>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    config: state.app.config,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutUs);