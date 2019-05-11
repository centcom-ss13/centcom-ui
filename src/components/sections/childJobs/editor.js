import React from 'react';
import {Transfer} from "antd";
import {connect} from "react-redux";
import actions from "../../../actions/index";

class ChildJobsEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      chosenKeys: [],
    };
  }

  componentDidMount() {
    const chosenKeys = this.props.parentJob.childJobIds;
    this.setState({
      chosenKeys,
      availableKeys: this.getAvailableKeys(chosenKeys),
    });
  }

  onChange(availableKeys) {
    const chosenKeys = this.getChosenKeysFromAvailableKeys(availableKeys);
    this.setState({
      chosenKeys: chosenKeys,
      availableKeys: availableKeys,
    });
    this.props.setInputHandler('childJobIds', chosenKeys);
  }

  handleSelectChange(sourceKeys, targetKeys) {
    this.setState({
      selectedKeys: [
        ...sourceKeys,
        ...targetKeys,
      ],
    });
  }

  getAvailableKeys(chosenKeys = this.state.chosenKeys) {
    return this.props.jobs
    .filter(({ aggregate }) => !aggregate)
    .filter(({ id }) => id !== this.props.parentJob.id)
    .map(({ id }) => id)
    .filter((id) => !chosenKeys.includes(id));
  }

  getChosenKeysFromAvailableKeys(availableKeys) {
    return this.props.jobs
    .filter(({ aggregate }) => !aggregate)
    .filter(({ id }) => id !== this.props.parentJob.id)
    .map(({ id }) => id)
    .filter((id) => !availableKeys.includes(id));
  }

  isLoading() {
    return this.props.jobs === undefined || this.props.loadingJobs;
  }

  render() {
    const allJobs = this.props.jobs
    .filter(({ aggregate }) => !aggregate)
    .filter(({ id }) => id !== this.props.parentJob.id)
    .map((job) => ({ ...job, key: job.id }));

    return (
      <div className="childJobsEditorContainer">
        <Transfer
          dataSource={allJobs}
          key="childJobs"
          titles={['Child Jobs', 'Available']}
          targetKeys={this.state.availableKeys}
          selectedKeys={this.state.selectedKeys}
          onChange={this.onChange.bind(this)}
          onSelectChange={this.handleSelectChange.bind(this)}
          render={item => item.title}
          disabled={this.isLoading()}
          loading={this.isLoading()}
          listStyle={{
            width: 400,
            height: 270,
          }}
          operations={['Remove Child Job', 'Add Child Job']}
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
    jobs: state.app.jobs,
    loadingJobs: state.app.loading.jobs,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChildJobsEditor);