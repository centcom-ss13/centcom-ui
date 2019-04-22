import React from 'react';
import {Redirect, withRouter} from "react-router";
import {Link} from "react-router-dom";

require('../styles/main.scss');

const errorTitleStyle = {
  fontSize: '40px',
};
const errorLinkStyle = {
  fontSize: '28px',
  color: '#3a9ccc',
  ':hover': {
    color: '#0c61cc',
  }
};

export default withRouter(class ErrorPage404 extends React.Component {
  render() {
    if(this.props.location.pathname !== '/404') {
      return (<Redirect push to="/404" />);
    }
    return (
      <div className="errorPage">
        <div className="errorTitle">
        404 Not Found
        </div>
        <div>
          <Link to={'/'}><span className="errorLink">Return To Safety!</span></Link>
        </div>
      </div>
    );
  }
});