import React from 'react';
import {Layout, Menu, Icon, Spin} from 'antd';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import actions from "../../actions/index";

const {
  Sider,
} = Layout;

const SubMenu = Menu.SubMenu;

const style = {
  color: '#EEE',
  overflowY: 'auto',
};

class PageSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      selectedKeys: [this.props.location.pathname],
    };
  }

  onCollapse(collapsed) {
    this.setState({ collapsed });
  };

  componentDidUpdate(prevProps) {
    if(this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ selectedKeys: [this.props.location.pathname] });
    }
  }

  isLoading() {
    return this.props.communityConfig === undefined || this.props.loadingCurrentUser;
  }

  getAdminSubmenu() {
    if(!this.props.currentUser) {
      return null;
    }

    return (
      <SubMenu
        key="admin_menu"
        title={<span><Icon type="pie-chart" /><span>Admin</span></span>}
      >
        <Menu.Item key={`/panel/admin`}>
          <Link to={`/panel/admin`}>
            <Icon type="dashboard" />
            <span>Dashboard</span>
          </Link>
        </Menu.Item>
        <Menu.Item key={`/panel/admin/donationLevels`}>
          <Link to={`/panel/admin/donationLevels`}>
            <Icon type="heart" />
            <span>Donation Tier Editor</span>
          </Link>
        </Menu.Item>
        <Menu.Item key={`/panel/admin/book`}>
          <Link to={`/panel/admin/book`}>
            <Icon type="book" />
            <span>Book Editor</span>
          </Link>
        </Menu.Item>
        <Menu.Item key={`/panel/admin/bans`}>
          <Link to={`/panel/admin/bans`}>
            <Icon type="heat-map" />
            <span>Ban Manager</span>
          </Link>
        </Menu.Item>
        <Menu.Item key={`/panel/admin/jobs`}>
          <Link to={`/panel/admin/jobs`}>
            <Icon type="tags" />
            <span>Job Editor</span>
          </Link>
        </Menu.Item>
        <Menu.Item key={`/panel/admin/groups`}>
          <Link to={`/panel/admin/groups`}>
            <Icon type="usergroup-add" />
            <span>User Groups</span>
          </Link>
        </Menu.Item>
        <Menu.Item key={`/panel/admin/users`}>
          <Link to={`/panel/admin/users`}>
            <Icon type="user" />
            <span>User Manager</span>
          </Link>
        </Menu.Item>
        <Menu.Item key={`/panel/admin/auditLogs`}>
          <Link to={`/panel/admin/auditLogs`}>
            <span>Audit Logs</span>
          </Link>
        </Menu.Item>
      </SubMenu>
    );
  }

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse.bind(this)}
        style={style}
        width={250}
      >
        <div className="logo" />
        <Spin spinning={this.isLoading()} wrapperClassName="sidebar-loading-container">
          <Menu theme="dark" selectedKeys={this.state.selectedKeys} mode="inline">
            {this.props.communityConfig && this.props.communityConfig.community_name && <Menu.Item key={`/panel`}>
              <Link to={`/panel`}>
                <Icon type="home" />
                <span>{this.props.communityConfig.community_name} Home</span>
              </Link>
            </Menu.Item>}
            {/*{this.props.community.serverLink && <Menu.Item key="joinserver">*/}
              {/*<a href={this.props.community.serverLink}>*/}
                {/*<Icon type="play-circle" />*/}
                {/*<span>Join Server!</span>*/}
              {/*</a>*/}
            {/*</Menu.Item>}*/}
            <Menu.Item key={`/panel/donate`}>
              <Link to={`/panel/donate`}>
                <Icon type="heart" />
                <span>Donate</span>
              </Link>
            </Menu.Item>
            {this.props.communityConfig && this.props.communityConfig.github_url && <Menu.Item key="github">
              <a href={this.props.communityConfig.github_url}>
                <Icon type="github" />
                <span>Github</span>
              </a>
            </Menu.Item>}
            {this.props.communityConfig && this.props.communityConfig.forums_url && <Menu.Item key="forums">
              <a href={this.props.communityConfig.forums_url}>
                <Icon type="layout" />
                <span>Forums</span>
              </a>
            </Menu.Item>}
            {this.props.communityConfig && this.props.communityConfig.wiki_url && <Menu.Item key="wiki">
              <a href={this.props.communityConfig.wiki_url}>
                <Icon type="read" />
                <span>Wiki</span>
              </a>
            </Menu.Item>}
            <Menu.Item key={`/panel/book`}>
              <Link to={`/panel/book`}>
                <Icon type="book" />
                <span>Book Viewer</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={`/panel/bans`}>
              <Link to={`/panel/bans`}>
                <Icon type="heat-map" />
                <span>Ban Viewer</span>
              </Link>
            </Menu.Item>
            {this.getAdminSubmenu()}
          </Menu>
        </Spin>
      </Sider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    communityConfig: state.app.communityConfig,
    currentUser: state.app.currentUser,
    loadingCurrentUser: state.app.loading.currentUser,
  }
};

const mapDispatchToProps = { ...actions };

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageSidebar));