import React from 'react';
import {Menu} from "antd";
import {connect} from 'react-redux'
import actions from '../../actions/index';
import EditableList from '../modules/editableList';
import {sortAlphabeticalByKey} from "../../utils/sorters";

class BanList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    props.fetch('bans');
  }

  getObjects() {
    return this.props.bans;
  }

  getObject(id) {
    return this.props.bans.find(ban => ban.id === id);
  }

  handleCategoryChange(e, setInputHandler) {
    if (e === 'none') {
      setInputHandler('category_id', null);
    } else {
      setInputHandler('category_id', e);
    }
  }

  isLoading() {
    return this.props.loadingBans || this.props.bans === undefined;
  }

  refresh() {
    this.props.fetch('bans');
  }

  getMenuItems(bans) {
    return bans
    .sort(sortAlphabeticalByKey('byond_key'))
    .map(ban => (<Menu.Item key={ban.id}>{ban.byond_key}</Menu.Item>));
  }

  getFields() {
    return {
    };
  }

  render() {
    return (
      <React.Fragment>
        <EditableList
          defKey="bans"
          isLoading={this.isLoading.bind(this)}
          getObjects={this.getObjects.bind(this)}
          getMenuItems={this.getMenuItems.bind(this)}
          refresh={this.refresh.bind(this)}
          renderHeaderButtons={() => (null)}
          getFields={this.getFields.bind(this)}
          displayOnly={this.props.displayOnly}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bans: state.app.bans,
    loadingBans: state.app.loading.bans,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BanList);