import React from "react";
import { Slider } from 'antd';

require('../../styles/radioSwitches.scss');

const SUFFICIENTLY_LARGE_NUMBER = 1000000000;

const DONATION_TYPE_ONE_TIME = 'DONATION_TYPE_ONE_TIME';
const DONATION_TYPE_MONTHLY = 'DONATION_TYPE_MONTHLY';

class DonationTierViewer extends React.Component {
  state = {
    donationType: DONATION_TYPE_ONE_TIME,
    selectedAmount: 15,
  };
  levels = [
    {
      amount: 5,
      name: 'Backer',
    },
    {
      amount: 10,
      name: 'Patron',
    },
    {
      amount: 15,
      name: 'Supporter',
    },
    {
      amount: 25,
      name: 'Super Supporter',
    },
    {
      amount: 50,
      name: 'Mega Supporter',
    },
    {
      amount: 75,
      name: 'Giga Supporter',
    },
    {
      amount: 100,
      name: 'Ultimate Supporter',
    },
    {
      amount: 125,
      hideAmount: true,
      name: 'And Byond!!!',
      descriptionName: 'Custom Donation',
      style: {
        color: '#02a401',
      },
    },
  ];

  getSliderMarks() {
    return this.levels.map(({ amount, name, style = {}, label, hideAmount }) => {
      return {
        [amount]: {
          style,
          label: (<strong>
            {hideAmount ? name : `$${amount}`}
          </strong>),
        }
      };
    }).reduce((acc, level) => ({
      ...acc,
      ...level,
    }), {});
  }

  getSliderTooltip(amount) {
    const level = this.levels.find(({ amount: levelAmount }) => amount === levelAmount);

    return level.hideAmount ? level.name : `$${level.amount}`;
  }

  getMinimumAmount() {
    return this.levels.reduce((minimumAmount, level) => level.amount < minimumAmount ? level.amount : minimumAmount, SUFFICIENTLY_LARGE_NUMBER)
  }

  getMaximumAmount() {
    return this.levels.reduce((maximumAmount, level) => level.amount > maximumAmount ? level.amount : maximumAmount, 0)
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

  sliderChangeHandler(selectedAmount) {
    this.setState({ selectedAmount });
  }

  renderDonationSlider() {
    return (
      <Slider
        className="donationLevelSlider"
        marks={this.getSliderMarks()}
        step={null}
        defaultValue={this.state.selectedAmount}
        min={this.getMinimumAmount()}
        max={this.getMaximumAmount()}
        tipFormatter={this.getSliderTooltip.bind(this)}
        onChange={this.sliderChangeHandler.bind(this)}
      />
    );
  }

  getSelectedLevel() {
    return this.levels.find(({ amount }) => amount === this.state.selectedAmount);
  }

  renderDonationDescription() {
    const level = this.getSelectedLevel();
    return (
      <div className="donationTierDescriptionContainer">
        <div className="donationTierName">{level.descriptionName || level.name}</div>
        <div className="donationTierAmount">{level.hideAmount ? '' : `$${level.amount}`}</div>
        <div className="donationTierDescription">{level.description}</div>
      </div>
    )
  }

  render() {
    return (<div className="donationTierViewerContainer">
      {this.renderMonthlyOrSingleSwitch()}
      {this.renderDonationSlider()}
      {this.renderDonationDescription()}
    </div>);
  }
}

export default DonationTierViewer;