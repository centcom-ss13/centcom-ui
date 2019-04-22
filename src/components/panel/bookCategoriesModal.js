import React from 'react';
import {Layout, Modal, Menu, Button, Popconfirm, Input, Affix, Icon} from "antd";
import actions from "../../actions/index";
import {connect} from "react-redux";
import LoadingIndicator from "../loadingIndicator";
import DB from '../../brokers/serverBroker';
import {message} from "antd/lib/index";
import {sortAlphabeticalByKey} from "../../utils/sorters";

const db = new DB();

const { Sider, Content } = Layout;

class BookCategoriesModal extends React.Component {
  contentContainer = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      bookCategories: props.bookCategories,
    };
  }

  async handleSave() {
    this.setState({ loading: true });
    const updateBookCategories = this.state.bookCategories.filter(category =>
      this.props.bookCategories.map(dbCategory => dbCategory.id).includes(category.id));
    const newBookCategories = this.state.bookCategories.filter(category =>
      this.props.bookCategories === undefined.map(dbCategory => dbCategory.id).includes(category.id));

    const updatePromise = Promise.all(updateBookCategories.map(((obj) => db.update.call(db, 'bookCategories', obj))));
    const createPromise = Promise.all(newBookCategories.map(((obj) => db.create.call(db, 'bookCategories', obj))));

    const updateResults = await updatePromise;
    const createResults = await createPromise;
    this.props.fetch('bookCategories');
    this.setState({ loading: false });

    this.props.closeHandler();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.bookCategories !== this.props.bookCategories) {
      this.setState({ bookCategories: this.props.bookCategories });
    }

    if(prevProps.visible !== this.props.visible) { //becoming visible or hiding
      if(this.props.visible) {
        this.props.fetch('bookCategories');
      }
      this.setState({
        selectedKey: undefined,
      })
    }
  }

  handleMenuSelect(item) {
    const id = parseInt(item.key);
    const category = this.state.bookCategories.find(category => category.id === id);

    this.setState({ selectedKey: id, inputName: category.name });
  }

  isLoading() {
    return !this.state.bookCategories || this.props.loadingBookCategories || this.props.bookCategories === undefined || this.state.loading;
  }

  getMenuItems() {
    if (this.isLoading()) {
      return (null);
    }

    return this.state.bookCategories
      .sort(sortAlphabeticalByKey('name'))
      .map(bookCategory => (
        <Menu.Item key={bookCategory.id}>{bookCategory.name}</Menu.Item>));
  }

  getCurrentBookCategory() {
    return this.state.bookCategories.find(bookCategory => bookCategory.id === this.state.selectedKey);
  }

  displayCategory() {
    return (
      <React.Fragment>
        <div className="section"><span className="bold">Name: </span><Input className="inputField"
                                                                            value={this.getCurrentBookCategory().name}
                                                                            onChange={this.changeName.bind(this)}/>
        </div>
      </React.Fragment>
    );
  }

  changeName(e) {
    const selectedCategory = this.getCurrentBookCategory();
    const otherCategories = this.state.bookCategories.filter(category => category.id !== selectedCategory.id);

    this.setState({
      bookCategories: [
        {
          ...selectedCategory,
          name: e.target.value,
        },
        ...otherCategories,
      ],
    })
  }

  startDelete() {

  }

  cancelDelete() {

  }

  async delete() {
    this.setState({ loading: true });

    try {
      const response = await db.delete('bookCategories', this.state.selectedKey);

      await this.props.fetch('bookCategories');

      this.setState({ loading: false, selectedKey: undefined });
    } catch (e) {
      message.error('Error deleting category.');
      this.setState({ loading: false });
    }
  }

  refresh() {
    this.props.fetch('bookCategories');
  }

  getHighestCategoryId() {
    return this.state.bookCategories.reduce((acc, cur) => ((!acc || cur.id > acc) ? cur.id : acc), 0);
  }

  startCreate() {
    const id = this.getHighestCategoryId() + 1;
    this.setState({
      bookCategories: [
        ...this.state.bookCategories,
        {
          id: id,
          name: '',
          color: '',
        },
      ],
      selectedKey: id,
    });
  }

  getContent() {
    if (this.isLoading()) {
      return (<LoadingIndicator center/>);
    }

    return (
      <div className="bookCategoriesContentContainer" ref={this.contentContainer}>
        {(!this.state.selectedKey || !this.getCurrentBookCategory()) ?
          (<div>Select a category from the side menu.</div>) :
          this.displayCategory()}
        <div className="buttonContainer">
          {!this.state.creating && this.state.selectedKey &&
          (<React.Fragment>
            <Popconfirm title="Are you sure delete this category?" onConfirm={this.delete.bind(this)}
                        onCancel={this.cancelDelete.bind(this)} okText="Delete" cancelText="Cancel">
              <Button className="button" type="danger" onClick={this.startDelete.bind(this)}>Delete</Button>
            </Popconfirm>
          </React.Fragment>)}
        </div>
      </div>
    );
  }

  render() {
    return (
      <Modal
        title="Book Categories"
        visible={this.props.visible}
        confirmLoading={this.isLoading()}
        onOk={this.handleSave.bind(this)}
        onCancel={this.props.closeHandler}
        okText="Save"
        destroyOnClose={true}
        bodyStyle={{ maxHeight: 600 }}
      >
        <Layout style={{ background: '#fff', height: '100%', width: '100%', }} className="bookCategoriesMenuContainer">
          <Sider width={200} style={{ background: '#fff' }}>
            <div className="createBookCategoriesButtonContainer" style={{ height: '42px' }}>
              <Button key="create" type="primary" className="createBookCategoryButton button"
                      onClick={this.startCreate.bind(this)}>Create</Button>
              <Button key="refresh" className="refreshButton button" onClick={this.refresh.bind(this)}><Icon type="redo"/></Button>
            </div>
            <Menu
              mode="inline"
              onSelect={this.handleMenuSelect.bind(this)}
              selectedKeys={this.state.selectedKey ? [`${this.state.selectedKey}`] : []}
              style={{ maxHeight: 400, overflowY: 'auto', overflowX: 'hidden', }}
            >
              {this.getMenuItems()}
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {this.getContent()}
          </Content>
        </Layout>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookCategories: state.app.bookCategories,
    loadingBookCategories: state.app.loading.bookCategories,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookCategoriesModal);