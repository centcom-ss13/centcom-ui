import React from 'react';
import {Menu, Input, Select, List} from "antd";
import {connect} from 'react-redux'
import actions from '../../actions/index';
import DB from '../../brokers/serverBroker';
import EditableList from './editableList';
import {sortAlphabeticalByKey} from "../../utils/sorters";
import LoadingIndicator from "../loadingIndicator";
import UserPermissionsEditor from './userPermissions/editor';
import UserGroupsEditor from './userGroups/editor';

const db = new DB();

class UsersEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getObjects() {
    return this.props.users;
  }

  isLoading() {
    return this.props.users === undefined ||
      this.props.loadingUsers ||
      this.props.userPermissions === undefined ||
      this.props.loadingUserPermissions ||
      this.props.userGroups === undefined ||
      this.props.loadingUserGroups ||
      this.props.permissions === undefined ||
      this.props.loadingPermissions ||
      this.props.groups === undefined ||
      this.props.loadingGroups === undefined;
  }

  refresh() {
    this.props.fetch('users');
    this.props.fetch('userPermissions');
    this.props.fetch('permissions');
    this.props.fetch('userGroups');
    this.props.fetch('groups');
  }

  getMenuItems(users) {
    return users
    .sort(sortAlphabeticalByKey('nickname'))
    .map(user => (<Menu.Item key={user.id}>{user.nickname}</Menu.Item>));
  }

  renderEditPermissions(input, setInputHandler) {
    if(this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    return (<UserPermissionsEditor user_id={input.id} setInputHandler={setInputHandler} />);
  }

  renderEditGroups(input, setInputHandler) {
    if(this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    return (<UserGroupsEditor user_id={input.id} setInputHandler={setInputHandler} />);
  }

  renderDisplayPermissions(object) {
    if(this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    const userPermissionItems = this.props.userPermissions
    .filter(userPermission => userPermission.user_id === object.id);

    return (
      <List
        header={<div>Permissions:</div>}
        key="userPermissions"
        bordered
        dataSource={userPermissionItems}
        className="userPermissionsContentContainer"
        locale={{	emptyText: 'No Permissions' }}
        renderItem={({ permission_id, description }) => (<List.Item key={permission_id} value={permission_id}>{description}</List.Item>)}
      />
    );
  }

  renderDisplayGroups(object) {
    if(this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    const userPermissionItems = this.props.userGroups
    .filter(userPermission => userPermission.user_id === object.id);

    return (
      <List
        header={<div>Groups:</div>}
        key="userGroups"
        bordered
        dataSource={userPermissionItems}
        className="userGroupsContentContainer"
        locale={{	emptyText: 'No Groups' }}
        renderItem={({ permission_id, description }) => (<List.Item key={permission_id} value={permission_id}>{description}</List.Item>)}
      />
    );
  }

  getFields() {
    return {
      permissions: {
        renderEdit: this.renderEditPermissions.bind(this),
        renderDisplay: this.renderDisplayPermissions.bind(this),
      },
      groups: {
        renderEdit: this.renderEditGroups.bind(this),
        renderDisplay: this.renderDisplayGroups.bind(this),
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <EditableList
          defKey="users"
          isLoading={this.isLoading.bind(this)}
          getObjects={this.getObjects.bind(this)}
          getMenuItems={this.getMenuItems.bind(this)}
          refresh={this.refresh.bind(this)}
          renderHeaderButtons={() => (null)}
          getFields={this.getFields.bind(this)}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.app.users,
    loadingUsers: state.app.loading.users,
    userGroups: state.app.userGroups,
    loadingUserGroups: state.app.loading.userGroups,
    userPermissions: state.app.userPermissions,
    loadingUserPermissions: state.app.loading.userPermissions,
    groups: state.app.groups,
    loadingGroups: state.app.loading.groups,
    permissions: state.app.permissions,
    loadingPermissions: state.app.loading.permissions,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersEditor);