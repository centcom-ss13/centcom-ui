import React from 'react';
import { Menu } from "antd";
import {connect} from 'react-redux'
import actions from '../../actions/index';
import EditableList from '../modules/editableList';
import { sortNumericallyByKey } from "../../utils/sorters";

class DonationLevelEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    props.fetch('donationLevels');
  }

  getObjects() {
    return this.props.donationLevels;
  }

  getObject(id) {
    return this.props.donationLevels.find(donationLevel => donationLevel.id === id);
  }

  isLoading() {
    return this.props.donationLevels === undefined ||
      this.props.loadingDonationLevels;
  }

  refresh() {
    this.props.fetch('donationLevels');
  }

  getMenuItems(donationLevels) {
    return donationLevels
    .sort(sortNumericallyByKey('cost'))
    .map(donationLevel => (
        <Menu.Item
          key={donationLevel.id}
        >
          {donationLevel.name}
        </Menu.Item>
    ));
  }

  getFields() {
    return {
    }
  }

  render() {
    return (
      <React.Fragment>
        <EditableList
          defKey="donationLevels"
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
    donationLevels: state.app.donationLevels,
    loadingDonationLevels: state.app.loading.donationLevels,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DonationLevelEditor);