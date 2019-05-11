import React from 'react';
import { Menu, List, Button } from "antd";
import {connect} from 'react-redux'
import actions from '../../actions/index';
import EditableList from '../modules/editableList';
import { sortAlphabeticalByKey, sortBinaryByKey } from "../../utils/sorters";
import LoadingIndicator from "../modules/loadingIndicator";
import ChildJobsEditor from '../sections/childJobs/editor';
import { Link } from "react-router-dom";
const guid = require('uuid/v4');

class JobsEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.menuItemRefs = {};

    props.fetch('jobs');
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
    .sort(sortBinaryByKey('antag'))
    .sort(sortBinaryByKey('aggregate'))
    .map(job => {
      if(!this.menuItemRefs[job.id]) {
        this.menuItemRefs[job.id] = React.createRef();
      }

      let backgroundColor;
      if(job.aggregate && !job.antag) {
        backgroundColor = '#88F3';
      }
      if(!job.aggregate && !job.antag) {
        backgroundColor = '#8882';
      }
      if(job.aggregate && job.antag) {
        backgroundColor = '#F8F3';
      }
      if(!job.aggregate && job.antag) {
        backgroundColor = '#F883';
      }

      return (
        <Menu.Item
          key={job.id}
          ref={this.menuItemRefs[job.id]}
          style={{
            backgroundColor,
          }}
        >
          {job.title}
        </Menu.Item>
      );
    });
  }

  selectJob(id) {
    this.setState({
      forceSelectedKey: id,
      forceSelectedKeyGuid: guid(),
    });
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
        renderItem={({ id, title }) => (
          <List.Item key={id} value={id} className="childJobLinkContainer">
            <a
              onClick={() => this.selectJob(id)}
              style={{ padding: '10px auto' }}
              className="childClassButton"
            >
              {title}
            </a>
          </List.Item>
          )}
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

  scrollToMenuItem(menuRef, menuItemId) {
    const menuItemRef = this.menuItemRefs[menuItemId];
    if (menuItemRef && menuItemRef.current && menuItemRef.current.scrollIntoView) {
      console.log(menuItemRef.current);
      menuItemRef.current.scrollIntoView();
      // menuRef.current.scrollTo(menuItemRef.current.scrollTop);
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
          forceSelectedKeyGuid={this.state.forceSelectedKeyGuid}
          forceSelectedKey={this.state.forceSelectedKey}
          scrollToMenuItem={this.scrollToMenuItem.bind(this)}
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