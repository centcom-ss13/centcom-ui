import React from 'react';
import { message, Modal } from "antd";
import actions from "../../../actions/index";
import { connect } from "react-redux";
import LoadingIndicator from "../../modules/loadingIndicator";
import DB from '../../../brokers/serverBroker';
import RegisterForm from './registerForm';

const db = new DB();

class RegisterModal extends React.Component {
  state = {};

  async handleSubmit() {
    const {
      username,
      email,
      password,
    } = this.state;

    try {
      this.setState({ loading: true });
      await db.register(username, email, password);

      this.props.closeHandler();

      this.props.fetch('currentUser');
    } catch (e) {
      message.error(e.message);
    }

    this.setState({ loading: false });
  }

  onChange(changedFields) {
    const fields = Object.entries(changedFields)
    .map(([key, { value }]) => ({ [key]: value }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {});

    this.setState(fields);
  }

  render() {
    return (
      <Modal
        title="User Registration"
        visible={this.props.visible}
        footer={null}
        destroyOnClose={true}
        bodyStyle={{ height: 280 }}
        width={300}
        onCancel={this.props.closeHandler}
      >
        {this.state.loading ? (<LoadingIndicator center />) : (
          <RegisterForm
            onChange={this.onChange.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
          />
        )}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.app.currentUser,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterModal);