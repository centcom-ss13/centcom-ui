import React from 'react';
import {Row} from "antd";
import ServerDetails from "../widgets/serverDetails";
import Statistics from "../widgets/statistics";
import AboutUs from "../widgets/aboutUs";
import Intro from "../widgets/intro";
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