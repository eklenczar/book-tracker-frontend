import React from "react";
import { Link } from "react-router-dom";
import "./BookCard.css";

function BookCard({ book, onBookDelete }) {
  
  function handleDeleteClick() {
  
    fetch(`/books/${book.id}`, {
      method: "DELETE",
    })
      
      .then(() => onBookDelete(book));
  }

  return (
    <div className="book-card">
      <Link to={`/books/${book.id}`}>
        <img style={{ width: 425, height: 500 }} src={book.image} alt="Cover" />
      </Link>
      <h5 className="book-title">{book.title}</h5>
      <p className="book-author">{book.author}</p>
      <p className="book-genre">{book.genre}</p>
      <div>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
}

export default BookCard;
