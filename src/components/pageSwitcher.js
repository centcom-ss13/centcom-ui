import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Home from './pages/home';
import Admin from './pages/admin';
import { wrapWithBreadcrumbs } from "../utils/breadcrumbs";
import ErrorPage404 from "../error/ErrorPage404";
import BookEditor from "./pages/bookEditor";
import BookViewer from "./pages/bookViewer";
import PermissionsEditor from "./pages/permissionsEditor";
import GroupsEditor from "./pages/groupsEditor";
import UserEditor from "./pages/userEditor";

class PageSwitcher extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={`/panel/admin/book`} component={wrapWithBreadcrumbs(BookEditor)}/>
          <Route path={`/panel/book`} component={wrapWithBreadcrumbs(BookViewer)}/>
          <Route path={`/panel/admin/permissions`} component={wrapWithBreadcrumbs(PermissionsEditor)}/>
          <Route path={`/panel/admin/users`} component={wrapWithBreadcrumbs(UserEditor)}/>
          <Route path={`/panel/admin/groups`} component={wrapWithBreadcrumbs(GroupsEditor)}/>
          <Route path={`/panel/admin`} component={wrapWithBreadcrumbs(Admin)}/>
          <Route path={`/panel`} component={wrapWithBreadcrumbs(Home)}/>
          <Route component={ErrorPage404}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(PageSwitcher);