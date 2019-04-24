import React from 'react';
import {Layout} from 'antd';
import PageSidebar from "../layout/sidebar";
import PageContent from "../layout/content";
import PageFooter from "../layout/footer";
import PageHeader from "../layout/header";
import {withRouter} from "react-router";

export default withRouter(class Panel extends React.Component {
  render() {
    return (
      <Layout>
        <PageHeader/>
        <Layout>
          <PageSidebar/>
          <Layout>
            <PageContent />
            <PageFooter/>
          </Layout>
        </Layout>
      </Layout>
    );
  }
});