import React from 'react';
import { Button, Layout, Spin } from 'antd';
import actions from "../../actions/index";
import { connect } from "react-redux";
import LoginModal from '../sections/login/loginModal';
import RegisterModal from '../sections/register/registerModal';
import DB from '../../brokers/serverBroker';
import LoadingIndicator from "../modules/loadingIndicator";

const db = new DB();

const {
  Header,
} = Layout;

const style = {
  color: '#EEE',
};
const titleStyle = {
  color: '#EEE',
  float: 'left',
};

const userSectionStyle = {
  float: 'right',
  height: '100%',
};

class PageHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userSectionLoading: false,
    };
  }

  openLoginModal() {
    this.setState({
      loginVisible: true,
    });
  }

  closeLoginModal() {
    this.setState({
      loginVisible: false,
    });
  }

  openRegisterModal() {
    this.setState({
      registerVisible: true,
    });
  }

  closeRegisterModal() {
    this.setState({
      registerVisible: false,
    });
  }

  async logout() {
    this.setState({ userSectionLoading: true });
    await db.logout();
    await this.props.fetch('currentUser');
    this.setState({ userSectionLoading: false });
  }

  getUserSectionContent() {
    if (this.state.userSectionLoading || this.props.loadingCurrentUser) {
      return (<LoadingIndicator small center />);
    }
    if (this.props.currentUser) {
      return (
        <React.Fragment>
          <Button onClick={this.logout.bind(this)}>Logout</Button>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Button onClick={this.openLoginModal.bind(this)}>Login</Button>
        <Button onClick={this.openRegisterModal.bind(this)}>Register</Button>
      </React.Fragment>
    )
  }

  getUserSection() {

    return (
      <div style={userSectionStyle}>
        {this.getUserSectionContent()}
      </div>
    );
  }

  render() {
    if (this.props.config === undefined) {
      return (<Header style={style}><Spin/></Header>);
    }

    return (
      <Header style={style}>
        <h2 style={titleStyle}>{this.props.config.panel_header_text}</h2>
        {this.getUserSection()}
        <LoginModal
          visible={this.state.loginVisible}
          closeHandler={this.closeLoginModal.bind(this)}
        />
        <RegisterModal
          visible={this.state.registerVisible}
          closeHandler={this.closeRegisterModal.bind(this)}
        />
      </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    config: state.app.config,
    currentUser: state.app.currentUser,
    loadingCurrentUser: state.app.loading.currentUser,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageHeader);