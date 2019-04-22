import React from 'react';
import {Button, Menu, Input, Select} from "antd";
import striptags from 'striptags';
import {connect} from 'react-redux'
import actions from '../../actions/index';
import DB from '../../brokers/serverBroker';
import BookCategoriesModal from './bookCategoriesModal';
import EditableList from './editableList';
import {sortAlphabeticalByKey} from "../../utils/sorters";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const db = new DB();
const SubMenu = Menu.SubMenu;

const { TextArea } = Input;

class BookList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getObjects() {
    return this.props.books;
  }

  getObject(id) {
    return this.props.books.find(book => book.id === id);
  }

  handleCategoryChange(e, setInputHandler) {
    if (e === 'none') {
      setInputHandler('category_id', null);
    } else {
      setInputHandler('category_id', e);
    }
  }

  getCategorySelector(inputs, setInputHandler) {
    const Option = Select.Option;

    return (
      <div key="category" className="section">
        <span className="bold">Category:</span>
        <Select className="inputField" defaultValue={inputs.category_id || 'none'}
                onChange={(e) => this.handleCategoryChange(e, setInputHandler)}>
          {this.props.bookCategories.map(category => (
            <Option value={category.id} key={category.id}>{category.name}</Option>))}
          <Option value="none">Unassigned</Option>
        </Select>
      </div>
    );
  }

  isLoading() {
    return this.props.loadingBooks || this.props.loadingBookCategories || this.props.books === undefined || this.props.bookCategories === undefined;
  }

  refresh() {
    this.props.fetch('books');
  }

  showBookCategoriesModal() {
    this.setState({ bookCategoriesModalVisible: true });
  }

  hideBookCategoriesModal() {
    this.setState({ bookCategoriesModalVisible: false });
  }

  getMenuItems(books, { filtered = false } = {}) {
    const categoriesWithBooks = this.props.bookCategories.map(category => ({
      ...category,
      books: books
      .filter(book => book.category_id === category.id)
      .sort(sortAlphabeticalByKey('title')),
    }));

    const filteredCategories = filtered ?
      categoriesWithBooks.filter(category => category.books.length) :
      categoriesWithBooks;

    const leftoverBooks = books.filter(book => filteredCategories.every(category => !category.books.some(testBook => testBook.id === book.id)));

    const categories = [
      ...filteredCategories,
      ...(leftoverBooks.length ? [{
        id: 'Unassigned',
        name: 'Unassigned',
        books: leftoverBooks,
      }] : []),
    ].sort(sortAlphabeticalByKey('name'));

    const displayCategories = categories
    .map(category => (
      <SubMenu key={category.id} title={category.name}>
        {category.books.map(book => (<Menu.Item key={book.id}>{book.title}</Menu.Item>))}
      </SubMenu>
    ));

    return displayCategories;
  }

  getCategoryDisplay(object) {
    return (
      <div key="category" className="section">
        <span className="bold">Category:</span>
        {object.category_name || 'Unassigned'}
      </div>
    );
  }

  getContentDisplay(object) {
    const allowTags = [
      'b',
      'br',
      'hr',
      'i',
      'span',
      'h2',
    ];

    function restrictTags(node) {
      // do not render any <span> tags
      if (node.type == 'tag' && !allowTags.includes(node.name)) {
        return null;
      }
    }

    const rules = [
      {
        find: /\[br\]/gm,
        replace: '<br />'
      },
      {
        find: /\[hr\]/gm,
        replace: '<hr />'
      },
      {
        find: /\[i\]/gm,
        replace: '<i>'
      },
      {
        find: /\[\/i\]/gm,
        replace: '</i>'
      },
      {
        find: /\[b\]/gm,
        replace: '<b>'
      },
      {
        find: /\[\/b\]/gm,
        replace: '</b>'
      },
      {
        find: /\[large\]/gm,
        replace: '<span style="font-size: 30px;">',
      },
      {
        find: /\[\/large\]/gm,
        replace: '</span>',
      },
      {
        find: /\[small\]/gm,
        replace: '<span style="font-size: 14px;">',
      },
      {
        find: /\[\/small\]/gm,
        replace: '</span>',
      },
      {
        find: /\[center\]/gm,
        replace: '<span style="width: 100%; text-align: center;">',
      },
      {
        find: /\[\/center\]/gm,
        replace: '</span>',
      },
      {
        find: /([A-Z]+) INK/gm,
        replace: (match, inkColor) => {
          const colors = {
            STANDARD: '#111',
            INVISIBLE: '#0003',
          };
          return `<\/span><span style="color: ${colors[inkColor] || inkColor}">`;
        }
      },
      {
        find: /\n/g,
        replace: '',
      },
    ];

    const formattedContent = rules.reduce((content, { find, replace }) => content.replace(find, replace), striptags(object.content));

    return (
      <div key={object.id} className="section">
        <span className="bold">Content:</span>
        <pre>{ReactHtmlParser(`<span>${formattedContent}</span>`, { transform: restrictTags })}</pre>
      </div>
    );
  }

  getFields() {
    return {
      category_id: {
        renderEdit: this.getCategorySelector.bind(this),
        renderDisplay: this.getCategoryDisplay.bind(this),
      },
      content: {
        renderDisplay: this.getContentDisplay.bind(this),
      },
    };
  }

  render() {
    return (
      <React.Fragment>
        <BookCategoriesModal
          visible={this.state.bookCategoriesModalVisible}
          closeHandler={this.hideBookCategoriesModal.bind(this)}
        />
        <EditableList
          defKey="books"
          isLoading={this.isLoading.bind(this)}
          getObjects={this.getObjects.bind(this)}
          getMenuItems={this.getMenuItems.bind(this)}
          refresh={this.refresh.bind(this)}
          renderHeaderButtons={() => (
            <Button key="editCategories" className="editCategoriesButton"
                    onClick={this.showBookCategoriesModal.bind(this)}>Categories</Button>
          )}
          getFields={this.getFields.bind(this)}
          displayOnly={this.props.displayOnly}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.app.books,
    loadingBooks: state.app.loading.books,
    bookCategories: state.app.bookCategories,
    loadingBookCategories: state.app.loading.bookCategories,
  }
};

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookList);