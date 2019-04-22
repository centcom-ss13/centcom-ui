import React from 'react';
import {Layout, Spin} from 'antd';
import {connect} from "react-redux";
import actions from "../../actions/index";

const {
  Footer,
} = Layout;

const style = {
  color: '#333',
};

class PageFooter extends React.Component {
  render() {
    if(this.props.config === undefined) {
      return (<Footer style={style}><Spin /></Footer>);
    }

    return (
      <Footer style={style}>{this.props.config.footer_text}</Footer>
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
)(PageFooter);