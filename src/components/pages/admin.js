import React from 'react';

import {Row} from "antd";
import ServerDetails from "../modules/widgets/serverDetails";
import Servers from "../modules/widgets/servers";
import Statistics from "../modules/widgets/statistics";

const containerStyle = {
  minWidth: '300px',
};

export default class Admin extends React.Component {

  state = {
    current: 'info',
  };

  getDefaultWidgetColProps() {
    return {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 12,
      xl: 12,
      xxl: 8,
    };
  }

  render() {

    return (
      <div style={containerStyle}>
        <Row gutter={20} type="flex" justify="space-between">
          <Servers/>
          <ServerDetails/>
          <Statistics/>
        </Row>
      </div>
    )
  }
}