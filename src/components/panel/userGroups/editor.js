import React from 'react';
import {Transfer} from "antd";
import {connect} from "react-redux";
import actions from "../../../actions";

class UserGroupsEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      chosenKeys: [],
    };
  }

  componentDidMount() {
    const chosenKeys = this.props.userGroups
    .filter(({ user_id }) => this.props.user_id === user_id)
    .map(({ group_id }) => group_id);
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
    this.props.setInputHandler('groups', chosenKeys);
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
    return this.props.groups
    .map(({ id }) => id)
    .filter((id) => !chosenKeys.includes(id));
  }

  getChosenKeysFromAvailableKeys(availableKeys) {
    return this.props.groups
    .map(({ id }) => id)
    .filter((id) => !availableKeys.includes(id));
  }

  isLoading() {
    return this.props.groups === undefined || this.props.loadingGroups || this.props.userGroups === undefined || this.props.loadingUserGroups || this.props.user_id === undefined;
  }

  render() {
    const allGroups = this.props.groups
    .map((group) => ({ ...group, key: group.id }));

    return (
      <div className="userGroupsEditorContainer">
        <Transfer
          dataSource={allGroups}
          key="userGroups"
          titles={['User Groups', 'Available']}
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
    userGroups: state.app.userGroups,
    loadingUserGroups: state.app.loading.userGroups,
    groups: state.app.groups,
    loadingGroups: state.app.loading.groups,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserGroupsEditor);