import React from 'react';
import {Menu, Input} from "antd";
import {connect} from 'react-redux'
import actions from '../../actions/index';
import DB from '../../brokers/serverBroker';
import EditableList from './editableList';
import {sortAlphabeticalByKey} from "../../utils/sorters";

const db = new DB();

class GroupsEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getObjects() {
    return this.props.groups;
  }

  getObject(id) {
    return this.props.groups.find(group => group.id === id);
  }

  isLoading() {
    return this.props.groups === undefined || this.props.loadingGroups;
  }

  refresh() {
    this.props.fetch('groups');
  }

  getMenuItems(groups) {
    return groups
    .sort(sortAlphabeticalByKey('description'))
    .map(group => (<Menu.Item key={group.id}>{group.name}</Menu.Item>));
  }

  getFields() {
    return {
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
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupsEditor);