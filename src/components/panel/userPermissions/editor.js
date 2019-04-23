import React from 'react';
import {Transfer} from "antd";
import {connect} from "react-redux";
import actions from "../../../actions";

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
    console.log('chosenKeys', chosenKeys);
    console.log('availableKeys', availableKeys);
    this.setState({
      chosenKeys: chosenKeys,
      availableKeys: availableKeys,
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
    return this.props.permissions
    .map(({ id }) => id)
    .filter((id) => !chosenKeys.includes(id));
  }

  getChosenKeysFromAvailableKeys(availableKeys) {
    return this.props.permissions
    .map(({ id }) => id)
    .filter((id) => !availableKeys.includes(id));
  }

  isLoading() {
    return this.props.permissions === undefined || this.props.loadingPermissions || this.props.user === undefined;
  }

  render() {
    const allPermissions = this.props.permissions
    .map((permission) => ({ ...permission, key: permission.id }));

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
          listStyle={{ width: '200px' }}
          locale={{
            notFoundContent: 'none',
            searchPlaceholder: 'Search...',
            itemUnit: '',
            itemsUnit: '',
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