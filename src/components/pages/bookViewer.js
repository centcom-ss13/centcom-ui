import React from 'react';
import BookList from "./bookList";

export default class BookViewer extends React.Component {
  render() {
    return (
      <BookList displayOnly />
    );
  }
}
