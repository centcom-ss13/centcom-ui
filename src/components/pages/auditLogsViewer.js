import React from 'react';
import { Menu } from "antd";
import {connect} from 'react-redux'
import actions from '../../actions/index';
import EditableList from '../modules/editableList';
import { sortAlphabeticalByKey } from "../../utils/sorters";

class AuditLogsEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.menuItemRefs = {};

    props.fetch('auditLogs');
  }

  getObjects() {
    return this.props.auditLogs;
  }

  getObject(id) {
    return this.props.auditLogs.find(auditLog => auditLog.id === id);
  }

  isLoading() {
    return this.props.auditLogs === undefined ||
      this.props.loadingAuditLogs;
  }

  refresh() {
    this.props.fetch('auditLogs');
  }

  getMenuItems(auditLogs) {
    return auditLogs
    .sort(sortAlphabeticalByKey('timestamp'))
    .map(auditLog => {
      return (
        <Menu.Item
          key={auditLog.id}
        >
          {auditLog.user_name} - {auditLog.action}
        </Menu.Item>
      );
    });
  }

  getFields() {
    return {
    }
  }

  render() {
    return (
      <React.Fragment>
        <EditableList
          defKey="auditLogs"
          isLoading={this.isLoading.bind(this)}
          getObjects={this.getObjects.bind(this)}
          getMenuItems={this.getMenuItems.bind(this)}
          refresh={this.refresh.bind(this)}
          renderHeaderButtons={() => (null)}
          getFields={this.getFields.bind(this)}
          displayOnly
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auditLogs: state.app.auditLogs,
    loadingAuditLogs: state.app.loading.auditLogs,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuditLogsEditor);