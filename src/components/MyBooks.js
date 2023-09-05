import React from "react";

function MyBooks({ user }) {
  console.log(user);

  const renderUserBooks = user.books.map((book) => <li key={book.id} >{book.title}</li>);

  return (
    <div>
      <h2>My Books</h2>
      <ul>{renderUserBooks}</ul>
    </div>
  );
}

export default MyBooks;
