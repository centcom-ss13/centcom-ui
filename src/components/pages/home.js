import React from 'react';
import {Row} from "antd";
import ServerDetails from "../modules/widgets/serverDetails";
import Statistics from "../modules/widgets/statistics";
import AboutUs from "../modules/widgets/aboutUs";
import Intro from "../modules/widgets/intro";

const containerStyle = {
  minWidth: '300px',
};

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div style={containerStyle}>
        <Row gutter={20} type="flex" justify="space-between">
          <Intro/>
          <AboutUs/>
          <ServerDetails/>
          <Statistics/>
        </Row>
      </div>
    )
  }
}