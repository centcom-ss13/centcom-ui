import React from 'react';
import {Route, Switch} from "react-router";
import ErrorPage404 from "./error/ErrorPage404";
import Panel from './components/panel/panel';
import Splash from './components/splash';
import DB from './brokers/serverBroker';
import actions from "./actions/index";
import {connect} from "react-redux";

const db = new DB();

class RootContainer extends React.Component {
  constructor(props) {
    super(props);

    this.props.fetch('servers');
    this.props.fetch('config');
    this.props.fetch('books');
    this.props.fetch('bookCategories');
    this.props.fetch('permissions');
    this.props.fetch('users');
    this.props.fetch('userPermissions');
    this.props.fetch('groups');
    this.props.fetch('userGroups');
  }
  render() {
    return (
      <Switch>
        <Route path="/panel" component={Panel}/>
        <Route exact path="/" component={Splash}/>
        <Route component={ErrorPage404}/>
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    config: state.app.config,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer);