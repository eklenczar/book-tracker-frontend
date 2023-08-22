import React from "react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import "./BookContainer.css";

function BookContainer({ books, setBooks }) {
  function handleDeleteBook(deletedBook) {
    const updatedBook = books.filter((book) => book.id !== deletedBook.id);
    setBooks(updatedBook);
  }

  function bookRenderer(book) {
    return (
      <BookCard key={book.id} book={book} onBookDelete={handleDeleteBook} />
    );
  }
  const renderBooks = books.map(bookRenderer);

  return (
    <div>
      <div className="new-book-button">
        <Link to={"/books/new"}>
          <button>Add New Book</button>
        </Link>
      </div>
      <div>{renderBooks}</div>
    </div>
  );
}

export default BookContainer;
