import React from "react";
import {Link, withRouter} from "react-router-dom";
import {Breadcrumb} from "antd";
import {connect} from "react-redux";
import actions from "../actions/index";

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
      '/panel/admin/book': 'Book Manager',
      '/panel/admin/permissions': 'Permissions Manager',
      '/panel/admin/users': 'User Manager',
    };

    if(this.props.config && this.props.config.community_name) {
      breadcrumbNameMap = {
        ...breadcrumbNameMap,
        '/panel': `${this.props.config.community_name} Home`,
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