import React from "react";
import { Route, Switch, withRouter } from "react-router";

import Home from '../pages/home';
import Admin from '../pages/admin';
import { wrapWithBreadcrumbs } from "../modules/breadcrumbs";
import ErrorPage404 from "../../error/ErrorPage404";
import BookEditor from "../pages/bookEditor";
import BookViewer from "../pages/bookViewer";
import GroupsEditor from "../pages/groupsEditor";
import UserEditor from "../pages/userEditor";
import BanEditor from "../pages/banEditor";
import BanViewer from "../pages/banViewer";
import JobsEditor from "../pages/jobsEditor";
import DonationTierViewer from "../pages/donationLevelViewer";
import DonationLevelEditor from '../pages/donationLevelEditor';
import AuditLogsViewer from '../pages/auditLogsViewer';
import actions from "../../actions";
import { connect } from "react-redux";
import LoadingIndicator from "../modules/loadingIndicator";
import { Redirect } from "react-router";

const panelRedirect = (props) => (<Redirect to='/panel' />);

class PageSwitcher extends React.Component {
  render() {
    if(this.props.loadingCurrentUser) {
      return (
        <React.Fragment>
          <Switch>
            <Route path={`/panel/admin`} component={(props) => (<LoadingIndicator {...props} center />)} />
            <Route exact path={`/panel/book`} component={wrapWithBreadcrumbs(BookViewer)}/>
            <Route exact path={`/panel/bans`} component={wrapWithBreadcrumbs(BanViewer)}/>
            <Route exact path={`/panel/admin`} component={wrapWithBreadcrumbs(Admin)}/>
            <Route exact path={`/panel/donate`} component={wrapWithBreadcrumbs(DonationTierViewer)}/>
            <Route exact path={`/panel`} component={wrapWithBreadcrumbs(Home)}/>
            <Route path={`/panel`} component={panelRedirect}/>
            <Route component={ErrorPage404}/>
          </Switch>
        </React.Fragment>
      );
    }

    if(!this.props.currentUser) {
      return (
        <React.Fragment>
          <Switch>
            <Route exact path={`/panel/book`} component={wrapWithBreadcrumbs(BookViewer)}/>
            <Route exact path={`/panel/bans`} component={wrapWithBreadcrumbs(BanViewer)}/>
            <Route exact path={`/panel/admin`} component={wrapWithBreadcrumbs(Admin)}/>
            <Route exact path={`/panel/donate`} component={wrapWithBreadcrumbs(DonationTierViewer)}/>
            <Route exact path={`/panel`} component={wrapWithBreadcrumbs(Home)}/>
            <Route path={`/panel`} component={panelRedirect}/>
            <Route component={ErrorPage404}/>
          </Switch>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Switch>
          <Route exact path={`/panel/admin/book`} component={wrapWithBreadcrumbs(BookEditor)}/>
          <Route exact path={`/panel/book`} component={wrapWithBreadcrumbs(BookViewer)}/>
          <Route exact path={`/panel/admin/users`} component={wrapWithBreadcrumbs(UserEditor)}/>
          <Route exact path={`/panel/admin/groups`} component={wrapWithBreadcrumbs(GroupsEditor)}/>
          <Route exact path={`/panel/admin/jobs`} component={wrapWithBreadcrumbs(JobsEditor)}/>
          <Route exact path={`/panel/admin/bans`} component={wrapWithBreadcrumbs(BanEditor)}/>
          <Route exact path={`/panel/admin/donationLevels`} component={wrapWithBreadcrumbs(DonationLevelEditor)}/>
          <Route exact path={`/panel/admin/auditLogs`} component={wrapWithBreadcrumbs(AuditLogsViewer)}/>
          <Route exact path={`/panel/bans`} component={wrapWithBreadcrumbs(BanViewer)}/>
          <Route exact path={`/panel/admin`} component={wrapWithBreadcrumbs(Admin)}/>
          <Route exact path={`/panel/donate`} component={wrapWithBreadcrumbs(DonationTierViewer)}/>
          <Route exact path={`/panel`} component={wrapWithBreadcrumbs(Home)}/>
          <Route push path={`/panel`} component={panelRedirect}/>
          <Route component={ErrorPage404}/>
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.app.currentUser,
    loadingCurrentUser: state.app.loading.currentUser,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(PageSwitcher));