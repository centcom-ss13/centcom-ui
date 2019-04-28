import React from 'react';
import {Menu, List} from "antd";
import {connect} from 'react-redux'
import actions from '../../actions/index';
import EditableList from '../modules/editableList';
import {sortAlphabeticalByKey} from "../../utils/sorters";
import LoadingIndicator from "../modules/loadingIndicator";
import ChildJobsEditor from '../sections/childJobs/editor';

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

  renderDisplayChildJobs(object) {
    if(this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    if(!object.aggregate) {
      return null;
    }

    const jobItems = this.props.jobs
    .filter(({ id }) => object.childJobIds.includes(id));

    return (
      <List
        header={<div>Child Jobs:</div>}
        key="childJobs"
        bordered
        dataSource={jobItems}
        className="childJobsContentContainer"
        locale={{	emptyText: 'No Child Jobs' }}
        renderItem={({ id, title }) => (<List.Item key={id} value={id}>{title}</List.Item>)}
      />
    );
  }

  renderEditChildJobs(input, setInputHandler) {
    if(this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    if(!input.aggregate) {
      return null;
    }

    return (<ChildJobsEditor parentJob={input} setInputHandler={setInputHandler} />);
  }

  getFields() {
    return {
      childJobIds: {
        renderEdit: this.renderEditChildJobs.bind(this),
        renderDisplay: this.renderDisplayChildJobs.bind(this),
      }
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