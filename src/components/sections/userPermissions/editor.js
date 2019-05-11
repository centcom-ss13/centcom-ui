import React from 'react';
import {Transfer} from "antd";
import {connect} from "react-redux";
import actions from "../../../actions/index";

class UserPermissionsEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      chosenKeys: [],
    };
  }

  componentDidMount() {
    const chosenKeys = this.props.user.permissions;
    this.setState({
      chosenKeys,
      availableKeys: this.getAvailableKeys(chosenKeys),
    });
  }

  onChange(availableKeys) {
    const chosenKeys = this.getChosenKeysFromAvailableKeys(availableKeys);
    this.setState({
      chosenKeys,
      availableKeys,
    });
    this.props.setInputHandler('permissions', chosenKeys);
  }

  handleSelectChange(sourceKeys, targetKeys) {
    console.log(sourceKeys, targetKeys);
    this.setState({
      selectedKeys: [
        ...sourceKeys,
        ...targetKeys,
      ],
    });
  }

  getAvailableKeys(chosenKeys = this.state.chosenKeys) {
    return Object.values(this.props.permissions)
    .map(({ name }) => name)
    .filter((name) => !this.props.user.permissions.includes(name));
  }

  getChosenKeysFromAvailableKeys(availableKeys) {
    return Object.values(this.props.permissions)
    .map(({ name }) => name)
    .filter((name) => !availableKeys.includes(name));
  }

  isLoading() {
    return this.props.permissions === undefined || this.props.loadingPermissions || this.props.user === undefined;
  }

  render() {
    const allPermissions = Object.values(this.props.permissions)
    .map((permission) => ({ ...permission, key: permission.name }));

    return (
      <div className="userPermissionsEditorContainer">
        <Transfer
          dataSource={allPermissions}
          key="userPermissions"
          titles={['User Permissions', 'Available']}
          targetKeys={this.state.availableKeys}
          selectedKeys={this.state.selectedKeys}
          onChange={this.onChange.bind(this)}
          onSelectChange={this.handleSelectChange.bind(this)}
          render={item => item.description}
          disabled={this.isLoading()}
          loading={this.isLoading()}
          locale={{
            notFoundContent: 'none',
            searchPlaceholder: 'Search...',
            itemUnit: '',
            itemsUnit: '',
          }}
          operations={['Remove Permission', 'Add Permission']}
          listStyle={{
            width: 400,
            height: 270,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.app.users,
    loadingUsers: state.app.loading.users,
    permissions: state.app.permissions,
    loadingPermissions: state.app.loading.permissions,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPermissionsEditor);