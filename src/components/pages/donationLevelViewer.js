import React from "react";
import { Slider } from 'antd';
import { connect } from "react-redux";
import actions from "../../actions";
import LoadingIndicator from "../modules/loadingIndicator";

require('../../styles/radioSwitches.scss');

const SUFFICIENTLY_LARGE_NUMBER = 1000000000;

const DONATION_TYPE_ONE_TIME = 'DONATION_TYPE_ONE_TIME';
const DONATION_TYPE_MONTHLY = 'DONATION_TYPE_MONTHLY';

class DonationLevelViewer extends React.Component {
  state = {
    donationType: DONATION_TYPE_ONE_TIME,
    selectedCost: 15,
  };

  getSliderMarks() {
    return this.props.donationLevels.map(({ cost, name, slider_name, style = {}, label, hide_cost }) => {
      return {
        [cost]: {
          style: style ? JSON.parse(style) : {},
          label: (<strong>
            {hide_cost ? (slider_name || name) : `$${cost}`}
          </strong>),
        }
      };
    }).reduce((acc, level) => ({
      ...acc,
      ...level,
    }), {});
  }

  getSliderTooltip(cost) {
    const level = this.props.donationLevels.find(({ cost: levelCost }) => cost === levelCost);

    return level.hide_cost ? level.name : `$${level.cost}`;
  }

  getMinimumCost() {
    return this.props.donationLevels.reduce((minimumCost, level) => level.cost < minimumCost ? level.cost : minimumCost, SUFFICIENTLY_LARGE_NUMBER)
  }

  getMaximumCost() {
    return this.props.donationLevels.reduce((maximumCost, level) => level.cost > maximumCost ? level.cost : maximumCost, 0)
  }

  setOneTimeDonationType() {
    this.setState({ donationType: DONATION_TYPE_MONTHLY });
  }

  setMonthlyDonationType() {
    this.setState({ donationType: DONATION_TYPE_ONE_TIME });
  }

  renderMonthlyOrSingleSwitch() {
    //From https://codepen.io/nickbottomley/pen/uhfmn
    return (
      <div className="donationTypeRadioSwitchContainer">
        <div className="switch switch--horizontal">
          <input id="radio-a" type="radio" name="first-switch" defaultChecked
                 onChange={this.setMonthlyDonationType.bind(this)}/>
          <label htmlFor="radio-a">One-Time</label>
          <input id="radio-b" type="radio" name="first-switch" onChange={this.setOneTimeDonationType.bind(this)}/>
          <label htmlFor="radio-b">Monthly</label>
          <span className="toggle-outside"
                style={{ background: this.state.donationType === DONATION_TYPE_ONE_TIME ? '#5d94d5' : '#3fc357' }}>
          <span className="toggle-inside"/>
        </span>
        </div>
      </div>
    );
  }

  sliderChangeHandler(selectedCost) {
    this.setState({ selectedCost });
  }

  isLoading() {
    return this.props.donationLevels === undefined || this.props.loadingDonationLevels;
  }

  renderDonationSlider() {
    return (
      <Slider
        className="donationLevelSlider"
        marks={this.getSliderMarks()}
        step={null}
        defaultValue={this.state.selectedCost}
        min={this.getMinimumCost()}
        max={this.getMaximumCost()}
        tipFormatter={this.getSliderTooltip.bind(this)}
        onChange={this.sliderChangeHandler.bind(this)}
      />
    );
  }

  getSelectedLevel() {
    return this.props.donationLevels.find(({ cost }) => cost === this.state.selectedCost);
  }

  renderDonationDescription() {
    const level = this.getSelectedLevel();
    return (
      <div className="donationLevelDescriptionContainer">
        <div className="donationLevelName">{level.description_name || level.name}</div>
        <div className="donationLevelCost">{level.hide_cost ? '' : `$${level.cost}`}</div>
        <div className="donationLevelDescription">{level.description}</div>
      </div>
    )
  }

  getContent() {
    if (this.isLoading()) {
      return (<LoadingIndicator/>);
    }

    return (
      <React.Fragment>
        {this.renderMonthlyOrSingleSwitch()}
        {this.renderDonationSlider()}
        {this.renderDonationDescription()}
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="donationLevelViewerContainer">
        {this.getContent()}
      </div>
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
)(DonationLevelViewer);