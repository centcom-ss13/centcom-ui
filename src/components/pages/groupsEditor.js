import React from 'react';
import {Menu, List} from "antd";
import {connect} from 'react-redux'
import actions from '../../actions/index';
import EditableList from '../modules/editableList';
import {sortAlphabeticalByKey} from "../../utils/sorters";
import GroupPermissionsEditor from '../sections/groupPermissions/editor';
import LoadingIndicator from "../modules/loadingIndicator";

class GroupsEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    props.fetch('groups');
    props.fetch('permissions');
  }

  getObjects() {
    return this.props.groups;
  }

  getObject(id) {
    return this.props.groups.find(group => group.id === id);
  }

  isLoading() {
    return this.props.groups === undefined ||
      this.props.loadingGroups ||
      this.props.permissions === undefined ||
      this.props.loadingPermissions;
  }

  refresh() {
    this.props.fetch('groups');
    this.props.fetch('permissions');
  }

  getMenuItems(groups) {
    return groups
    .sort(sortAlphabeticalByKey('description'))
    .map(group => (<Menu.Item key={group.id}>{group.name}</Menu.Item>));
  }

  renderEditPermissions(input, setInputHandler) {
    if(this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    return (<GroupPermissionsEditor group={input} setInputHandler={setInputHandler} />);
  }

  renderDisplayPermissions(object) {
    if(this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    const groupPermissionItems = Object.values(this.props.permissions)
    .filter(({ name }) => object.permissions.includes(name));

    return (
      <List
        header={<div>Group Permissions:</div>}
        key="groupPermissions"
        bordered
        dataSource={groupPermissionItems}
        className="groupPermissionsContentContainer"
        locale={{	emptyText: 'No Permissions' }}
        renderItem={({ id, description }) => (<List.Item key={id} value={id}>{description}</List.Item>)}
      />
    );
  }

  getFields() {
    return {
      permissions: {
        renderEdit: this.renderEditPermissions.bind(this),
        renderDisplay: this.renderDisplayPermissions.bind(this),
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <EditableList
          defKey="groups"
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
)(GroupsEditor);