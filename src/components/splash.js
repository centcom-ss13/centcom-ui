import React from 'react';
import {Button} from "antd";
import {Link} from "react-router-dom";
import LoadingIndicator from "./loadingIndicator";
import { connect } from 'react-redux'
import actions from "../actions/index";
import {Redirect} from "react-router";

const splashStyle = {
  textAlign: 'center',
  paddingTop: '200px',
};

class SplashPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if(this.props.config === undefined) {
      return (<LoadingIndicator center />);
    }
    return (
      <div style={splashStyle}>
        <h1>{this.props.config.splash_title_text}</h1>
        <Redirect to="/panel" />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    config: state.app.config,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashPage);