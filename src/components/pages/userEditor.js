import React from 'react';
import {Menu, List} from "antd";
import {connect} from 'react-redux'
import actions from '../../actions/index';
import EditableList from '../modules/editableList';
import {sortAlphabeticalByKey} from "../../utils/sorters";
import LoadingIndicator from "../modules/loadingIndicator";
import UserPermissionsEditor from '../sections/userPermissions/editor';
import UserGroupsEditor from '../sections/userGroups/editor';
import { unique, flatMap } from '../../utils/arrayUtils';

class UsersEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    props.fetch('users');
    props.fetch('permissions');
    props.fetch('groups');
  }

  getObjects() {
    return this.props.users;
  }

  isLoading() {
    return this.props.users === undefined ||
      this.props.loadingUsers ||
      this.props.permissions === undefined ||
      this.props.loadingPermissions ||
      this.props.groups === undefined ||
      this.props.loadingGroups === undefined;
  }

  refresh() {
    this.props.fetch('users');
    this.props.fetch('permissions');
    this.props.fetch('groups');
  }

  getMenuItems(users) {
    return users
    .sort(sortAlphabeticalByKey('username'))
    .map(user => (<Menu.Item key={user.id}>{user.username}</Menu.Item>));
  }

  renderEditPermissions(input, setInputHandler) {
    if(this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    return (<UserPermissionsEditor user={input} setInputHandler={setInputHandler} />);
  }

  renderEditGroups(input, setInputHandler) {
    if(this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    return (<UserGroupsEditor user={input} setInputHandler={setInputHandler} />);
  }

  renderDisplayPermissions(object) {
    if(this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    const userPermissionItems = Object.values(this.props.permissions)
    .filter(({ name }) => object.permissions.includes(name));

    return (
      <List
        header={<div>Granted Permissions:</div>}
        key="userPermissions"
        bordered
        dataSource={userPermissionItems}
        className="userPermissionsContentContainer"
        locale={{	emptyText: 'No Permissions' }}
        renderItem={({ name, description }) => (<List.Item key={name} value={name}>{name} - {description}</List.Item>)}
      />
    );
  }

  renderDisplayGroups(object) {
    if(this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    const userGroupItems = this.props.groups
    .filter(({ id }) => object.groups.includes(id));

    return (
      <List
        header={<div>Groups:</div>}
        key="userGroups"
        bordered
        dataSource={userGroupItems}
        className="userGroupsContentContainer"
        locale={{	emptyText: 'No Groups' }}
        renderItem={({ id, name }) => (<List.Item key={id} value={id}>{name}</List.Item>)}
      />
    );
  }

  renderCombinedPermissions(object) {
    if(this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    const userPermissionItems = Object.values(this.props.permissions)
    .filter(({ name }) => object.permissions.includes(name));

    const userGroupItems = this.props.groups
    .filter(({ id }) => object.groups.includes(id));

    const userGroupPermissionNames = unique(flatMap(this.props.groups
    .filter(({ id }) => object.groups.includes(id))
    .map(({ permissions }) => permissions)));

    const userGroupPermissions = Object.values(this.props.permissions)
    .filter(({ name }) => userGroupPermissionNames.includes(name));

    const combinedPermissionItems = unique(flatMap([
      userGroupPermissions,
      userPermissionItems,
    ]));

    return (
      <List
        header={<div>Combined Permissions:</div>}
        key="userCombinedPermissions"
        bordered
        dataSource={combinedPermissionItems}
        className="userCombinedPermissionsContentContainer"
        locale={{	emptyText: 'No Permissions' }}
        renderItem={({ name, description }) => (<List.Item key={name} value={name}>{name} - {description}</List.Item>)}
      />
    );
  }

  getFields() {
    return {
      combinedPermissions: {
        renderEdit: this.renderCombinedPermissions.bind(this),
        renderDisplay: this.renderCombinedPermissions.bind(this),
      },
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