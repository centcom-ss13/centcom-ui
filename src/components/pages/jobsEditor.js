import React from 'react';
import {Menu} from "antd";
import {connect} from 'react-redux'
import actions from '../../actions/index';
import EditableList from '../modules/editableList';
import {sortAlphabeticalByKey} from "../../utils/sorters";

class JobsEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getObjects() {
    return this.props.jobs;
  }

  getObject(id) {
    return this.props.jobs.find(job => job.id === id);
  }

  isLoading() {
    return this.props.jobs === undefined ||
      this.props.loadingJobs;
  }

  refresh() {
    this.props.fetch('jobs');
  }

  getMenuItems(jobs) {
    return jobs
    .sort(sortAlphabeticalByKey('title'))
    .map(job => (<Menu.Item key={job.id}>{job.title}</Menu.Item>));
  }

  getFields() {
    return {
    }
  }

  render() {
    return (
      <React.Fragment>
        <EditableList
          defKey="jobs"
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
    jobs: state.app.jobs,
    loadingJobs: state.app.loading.jobs,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobsEditor);