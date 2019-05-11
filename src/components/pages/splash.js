import React from 'react';
import LoadingIndicator from "../modules/loadingIndicator";
import { connect } from 'react-redux'
import actions from "../../actions/index";
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
    if(this.props.communityConfig === undefined) {
      return (<LoadingIndicator center />);
    }
    return (
      <div style={splashStyle}>
        <h1>{this.props.communityConfig.splash_title_text}</h1>
        <Redirect to="/panel" />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    communityConfig: state.app.communityConfig,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashPage);