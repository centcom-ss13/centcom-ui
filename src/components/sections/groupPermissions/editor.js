import React from 'react';
import {Transfer} from "antd";
import {connect} from "react-redux";
import actions from "../../../actions/index";

class GroupPermissionsEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      chosenKeys: [],
    };
  }

  componentDidMount() {
    const chosenKeys = this.props.group.permissions;
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
    return Object.values(this.props.permissions)
    .map(({ name }) => name)
    .filter((name) => !chosenKeys.includes(name));
  }

  getChosenKeysFromAvailableKeys(availableKeys) {
    return Object.values(this.props.permissions)
    .map(({ name }) => name)
    .filter((name) => !availableKeys.includes(name));
  }

  isLoading() {
    return this.props.permissions === undefined || this.props.loadingPermissions || this.props.group === undefined;
  }

  render() {
    const allPermissions = Object.values(this.props.permissions)
    .map((permission) => ({ ...permission, key: permission.name }));

    return (
      <div className="groupPermissionsEditorContainer">
        <Transfer
          dataSource={allPermissions}
          key="groupPermissions"
          titles={['Group Permissions', 'Available']}
          targetKeys={this.state.availableKeys}
          selectedKeys={this.state.selectedKeys}
          onChange={this.onChange.bind(this)}
          onSelectChange={this.handleSelectChange.bind(this)}
          render={item => item.description}
          disabled={this.isLoading()}
          loading={this.isLoading()}
          listStyle={{
            width: 400,
            height: 270,
          }}
          operations={['Remove Group Permission', 'Add Group Permission']}
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
)(GroupPermissionsEditor);