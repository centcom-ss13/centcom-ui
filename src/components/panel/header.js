import React from 'react';
import {Layout, DatePicker, Spin} from 'antd';
import actions from "../../actions/index";
import {connect} from "react-redux";

const {
  Header,
} = Layout;

const style = {
  color: '#EEE',
};
const titleStyle = {
  color: '#EEE',
};

class PageHeader extends React.Component {
  render() {
    if(this.props.config === undefined) {
      return (<Header style={style}><Spin /></Header>);
    }

    return (
      <Header style={style}>
        <h2 style={titleStyle}>{this.props.config.panel_header_text}</h2>
      </Header>
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
)(PageHeader);