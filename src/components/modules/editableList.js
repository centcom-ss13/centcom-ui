import React from 'react';
import {Button, Layout, Menu, Affix, Popconfirm, message, Icon, Input, Checkbox} from "antd";
import {textSearch} from '../../utils/fuzzyMatcher';
import LoadingIndicator from "../modules/loadingIndicator";
import DB from '../../brokers/serverBroker';

import endpointDefinitions from '../../defs/endpoints';
import {sortNumericallyByKey} from '../../utils/sorters';
import { connect } from "react-redux";
import actions from "../../actions";

const db = new DB();

const { TextArea } = Input;
const { Sider, Content } = Layout;

class EditableList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: {},
    };
    this.sideMenuRef = React.createRef();
  }

  getEndpointDef() {
    return endpointDefinitions[this.props.defKey];
  }

  contentContainer = React.createRef();

  getObject(id) {
    return this.props.getObjects().find(user => user.id === id);
  }

  handleMenuSelect({ key }) {
    this.setState({ selectedKey: parseInt(key), editing: false, deleting: false, creating: false, });
  }

  getContent() {
    if (this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    if (!this.state.creating && (!this.state.selectedKey || !this.getObject(this.state.selectedKey))) {
      return (
        <div>Select an item from the side menu.</div>
      );
    }

    if (this.props.displayOnly) {
      return (<div className="editableListContentContainer" ref={this.contentContainer}>
        {this.displayContent()}
      </div>);
    }

    return (
      <div className="editableListContentContainer" ref={this.contentContainer}>
        <Affix
          className="buttonContainer"
          target={() => this.contentContainer && this.contentContainer.current}
          offsetTop={-30}
        >
          {this.state.editing && <Button className="button" type="primary" onClick={this.edit.bind(this)}>Save</Button>}
          {this.state.creating &&
          <Button className="button" type="primary" onClick={this.create.bind(this)}>Create</Button>}
          {(this.state.editing || this.state.creating) &&
          <Button className="button" onClick={this.cancel.bind(this)}>Cancel</Button>}
          {!this.state.editing && !this.state.creating &&
          <Button className="button" type="primary" onClick={this.startEdit.bind(this)}>Edit</Button>}
          {!this.state.creating && this.state.selectedKey &&
          <Popconfirm title={`Are you sure delete this ${this.getEndpointDef().singularDisplayName}?`}
                      onConfirm={this.delete.bind(this)}
                      onCancel={this.cancelDelete.bind(this)} okText="Delete" cancelText="Cancel">
            <Button className="button" type="danger" onClick={this.startDelete.bind(this)}>Delete</Button>
          </Popconfirm>}
        </Affix>
        {(this.state.editing || this.state.creating) && this.displayEditScreen()}
        {!this.state.editing && !this.state.creating && this.displayContent()}
      </div>
    );
  }

  setInput(key, value) {
    this.setState({
                    input: {
                      ...this.state.input,
                      [key]: value,
                    }
                  });
  }

  setInputs(input) {
    this.setState({ input });
  }

  displayEditScreen() {
    if (this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    const fields = this.getFields();

    const displayFields = Object.entries(fields)
    .map(([key, value]) => ({ ...value, key }))
    .sort(sortNumericallyByKey('displayOrder', 9999))
    .map(({ key, type, custom, name, prefix, renderEdit }) => {
      if (custom && renderEdit) {
        return renderEdit(this.state.input, this.setInput.bind(this));
      }

      if (type === 'STRING') {
        const value = this.state.input[key];
        return (
          <div key={key} className="section">
            <span className="bold">
              {name}:
            </span>
            <Input
              placeholder={'none'}
              style={{ fontStyle: value ? 'normal' : 'italic' }}
              className="inputField"
              value={this.state.input[key]}
              onChange={(e) => this.setInput(key, e.target.value)}
              addonBefore={prefix}
            />
          </div>
        );
      }

      if (type === 'LONG_STRING') {
        return (
          <div key={key} className="content section">
            <span className="bold">
              {name}:
            </span>
            <TextArea
              className="inputField"
              rows={7}
              value={this.state.input[key]}
              onChange={(e) => this.setInput(key, e.target.value)}
            />
          </div>
        );
      }

      if (type === 'TOGGLE') {
        const value = this.state.input[key];
        return (
          <div key={key} className="section">
            <Checkbox onChange={(e) => this.setInput(key, e.target.checked)} defaultChecked={value}>
              <span className="bold">
                {name}
              </span>
            </Checkbox>
          </div>
        );
      }

      if (type === 'NO_DISPLAY') {
        return null;
      }

      return <span key={key}>{`ERROR: Display type not found for key ${key}`}</span>;
    });

    return (
      <React.Fragment>
        {displayFields}
      </React.Fragment>
    );
  }

  getFields() {
    const fields = this.getEndpointDef().fields || {};
    const customFields = this.props.getFields();
    return Object.entries(fields)
    .map(([key, value]) => ({
      [key]: {
        ...value,
        ...(customFields && customFields[key]),
      }
    }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {});
  }

  displayContent() {
    if (this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    const object = this.getObject(this.state.selectedKey);

    const fields = this.getFields();

    const displayFields = Object.entries(fields)
    .map(([key, value]) => ({ ...value, key }))
    .sort(sortNumericallyByKey('displayOrder', 9999))
    .map(({ key, type, custom, name, prefix, renderDisplay, hideDisplay }) => {
      if (custom && renderDisplay) {
        return renderDisplay(object);
      }

      if(hideDisplay) {
        return null;
      }

      if (type === 'STRING' || type === 'LONG_STRING') {
        const value = object[key];
        return (
          <div key={key} className="section" style={{ fontStyle: value ? 'normal' : 'italic' }}>
            <span className="bold">{name}:</span>
            <pre>{value ? `${prefix ? prefix : ''}${value}` : 'none'}</pre>
          </div>
        );
      }

      if (type === 'TOGGLE') {
        const value = object[key];
        return (
          <div key={key} className="section">
            <Checkbox disabled checked={value}>
              <span className="bold">
                {name}
              </span>
            </Checkbox>
          </div>
        );
      }

      if (type === 'NO_DISPLAY') {
        return null;
      }

      return `ERROR: Display type not found for key ${key}`;
    });

    return (
      <React.Fragment>
        {displayFields}
      </React.Fragment>
    );
  }

  isFiltered() {
    return !!this.state.searchText;
  }

  searchInputChangeHandler(e) {
    this.setState({ searchText: e.target.value });
  }

  getMenuItems() {
    if (this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    const stringFieldKeys = Object.entries(this.getFields())
    .filter(([key, field]) => field.type === 'STRING' || field.type === 'LONG_STRING')
    .map(([key]) => key);


    const searchResults = this.isFiltered() ?
      textSearch(stringFieldKeys, this.props.getObjects(), this.state.searchText) :
      this.props.getObjects();

    return this.props.getMenuItems(searchResults, { filtered: this.isFiltered() });

  }

  async performEdit(object) {
    const parsedObject = {
      ...object,
      id: parseInt(object.id, 10),
    };

    return await db.update(this.props.defKey, parsedObject, [this.state.selectedKey]);
  }

  async performCreate(object) {
    return await db.create(this.props.defKey, object, [this.state.selectedKey]);
  }

  async performDelete(id) {
    return await db.delete(this.props.defKey, id);
  }

  componentWillReceiveProps(nextProps) {
    //this is so hacky, but it allows the parent component to set the selected key
    if (nextProps.forceSelectedKeyGuid &&
      nextProps.forceSelectedKeyGuid !== this.props.forceSelectedKeyGuid) {
      this.setState({ selectedKey: nextProps.forceSelectedKey });
      console.log('forcing selected key', nextProps.forceSelectedKey);
      if(this.props.scrollToMenuItem) {
        this.props.scrollToMenuItem(this.sideMenuRef, nextProps.forceSelectedKey);
      }
    }
  }

  startEdit() {
    const object = this.getObject(this.state.selectedKey);

    this.setState({
                    editing: true,
                    input: {
                      ...object,
                    },
                  });
  }

  async edit() {
    this.setState({ loading: true });
    const newObject = {
      ...this.state.input,
      id: this.state.selectedKey,
    };

    try {
      const response = await this.performEdit(newObject);

      await this.props.refresh();

      this.setState({ loading: false, editing: false, deleting: false });
    } catch (e) {
      console.log(e);
      message.error(`Error editing ${this.getEndpointDef().singularDisplayName}`);
      this.setState({ loading: false });
    }
  }

  isLoading() {
    return this.props.isLoading() || this.state.loading;
  }

  async create() {
    this.setState({ loading: true });
    const newObject = {
      input: this.state.input,
      sender_id: this.props.currentUser && this.props.currentUser.id,
    };

    try {
      const response = await this.performCreate(newObject);

      await this.props.refresh();

      this.setState({ loading: false, creating: false });
    } catch (e) {
      console.log(e);
      message.error(`Error creating ${this.getEndpointDef().singularDisplayName}`);
      this.setState({ loading: false });
    }
  }

  startDelete() {
    this.setState({ deleting: true });
  }

  cancelDelete() {
    this.setState({ deleting: false });
  }

  startCreate() {
    this.setState({
                    creating: true,
                    input: {},
                    editing: false,
                    deleting: false,
                    selectedKey: undefined
                  });
  }

  cancel() {
    this.setState({ deleting: false, editing: false, creating: false, });
  }

  async delete() {
    this.setState({ loading: true });

    try {
      const response = await this.performDelete(this.state.selectedKey);

      await this.props.refresh();

      this.setState({ loading: false, deleting: false, editing: false, selectedKey: undefined });
    } catch (e) {
      console.log(e);
      message.error(`Error deleting ${this.getEndpointDef().singularDisplayName}.`);
      this.setState({ loading: false, deleting: false, error: true });
    }
  }

  render() {
    return (
      <Layout style={{ padding: '24px 0 0 0', background: '#fff' }} className="editableListMenuContainer">
        <Sider width={250} style={{ background: '#fff', overflowY: 'auto', }}>
          <div className="editableListCreateButtonContainer">
            {!this.props.displayOnly && <Button key="create" type="primary" className="editableListCreateButton"
                                                onClick={this.startCreate.bind(this)}>Create</Button>}
            {!this.props.displayOnly && this.props.renderHeaderButtons()}
            <Button key="refresh" className="refreshButton" onClick={this.props.refresh.bind(this)}><Icon type="redo"/></Button>
          </div>
          <div className="searchBarContainer">
            <Input
              key="searchBar"
              value={this.state.searchText}
              onChange={this.searchInputChangeHandler.bind(this)}
              placeholder="Search..."
              className="searchBar"
            />
          </div>
          <Menu
            mode="inline"
            onSelect={this.handleMenuSelect.bind(this)}
            selectedKeys={this.state.selectedKey ? [`${this.state.selectedKey}`] : []}
            ref={this.sideMenuRef}
          >
            {this.getMenuItems()}
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          {this.getContent()}
        </Content>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.app.currentUser,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableList);