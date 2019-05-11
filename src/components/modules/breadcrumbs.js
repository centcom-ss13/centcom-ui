import React from "react";
import {Link, withRouter} from "react-router-dom";
import {Breadcrumb} from "antd";
import {connect} from "react-redux";
import actions from "../../actions/index";

const breadcrumbStyle = {
  paddingBottom: '20px',
};

const NO_BREADCRUMB_URLS = [
  '/panel',
];

class BreadcrumbWrapper extends React.Component {

  getBreadcrumbNameMap() {
    let breadcrumbNameMap = {
      '/panel': 'Home',
      '/panel/admin': 'Admin',
      '/panel/admin/book': 'Book Editor',
      '/panel/admin/permissions': 'Permissions Manager',
      '/panel/admin/users': 'User Manager',
      '/panel/book': 'Book Viewer',
      '/panel/admin/groups': 'Group Manager',
      '/panel/admin/bans': 'Ban Manager',
      '/panel/bans': 'Ban Viewer',
      '/panel/admin/jobs': 'Job Editor',
      '/panel/admin/donationLevels': 'Donation Tier Editor',
      '/panel/admin/auditLogs': 'Audit Logs',
      '/panel/donate': 'Donate',
    };

    if(this.props.communityConfig && this.props.communityConfig.community_name) {
      breadcrumbNameMap = {
        ...breadcrumbNameMap,
        '/panel': `${this.props.communityConfig.community_name} Home`,
      };
    }

    return breadcrumbNameMap;
  }

  render() {
    const { location } = this.props;

    if(NO_BREADCRUMB_URLS.includes(location.pathname)) {
      return this.props.children;
    }

    const pathSnippets = location.pathname.split('/').filter(i => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const breadcrumbName = this.getBreadcrumbNameMap()[url];

      if(!breadcrumbName) {
        return null;
      }

      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {breadcrumbName}
          </Link>
        </Breadcrumb.Item>
      );
    });
    return (
      <React.Fragment>
        <div style={breadcrumbStyle}>
          <Breadcrumb>
            {breadcrumbItems}
          </Breadcrumb>
        </div>
        {this.props.children}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    servers: state.app.servers,
  }
};

const mapDispatchToProps = { ...actions };

class BreadcrumbWrappedComponent extends React.Component {
  render() {
    const BreadcrumbWrapperWithRouter = withRouter(connect(
      mapStateToProps,
      mapDispatchToProps,
    )(BreadcrumbWrapper));
    return (
      <BreadcrumbWrapperWithRouter {...this.props}>
        {this.props.children}
      </BreadcrumbWrapperWithRouter>
    );
  }
}

function wrapWithBreadcrumbs(Component) {
  return () => (
    <BreadcrumbWrappedComponent>
      <Component />
    </BreadcrumbWrappedComponent>
  )
}

export { wrapWithBreadcrumbs };