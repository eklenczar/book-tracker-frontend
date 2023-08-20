import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Home from "./components/Home";
import BookContainer from "./components/BookContainer";
import BookDetails from "./components/BookDetails";
import NewBookForm from "./components/NewBookForm";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { UserContext } from "./components/CurrentUserContext";

function App() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/books")
      .then((r) => r.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  function handleNewBook(newBook) {
    setBooks([...books, newBook]);
  }

  function handleNewUser(newUser) {
    setUsers([...users, newUser]);
  }

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogin(user) {
    setUser(user);
  }

  function handleLogout() {
    setUser(null);
  }

  function afterReviewAdd(review, bookId) {
    const bookIdx = books.findIndex((book) => book.id === bookId)
    const newBook = {...books[bookIdx], reviews:[...books[bookIdx].reviews, review]}
    setBooks([...books.slice(0, bookIdx), newBook, ...books.slice(bookIdx + 1)])
  }

  function afterReviewUpdate(review, bookId) {
    const bookIdx = books.findIndex((book) => book.id === bookId)
    const reviewIdx = books[bookIdx].reviews.findIndex((_review) => _review.id === review.id)
    const newBook = {...books[bookIdx], reviews:[...books[bookIdx].reviews.slice(0, reviewIdx), {...books[bookIdx].reviews[reviewIdx], ...review}, ...books[bookIdx].reviews.slice(reviewIdx + 1)]}
    setBooks([...books.slice(0, bookIdx), newBook, ...books.slice(bookIdx + 1)])
  }

  function afterReviewDelete(review, bookId) {
    const bookIdx = books.findIndex((book) => book.id === bookId)
    setBooks([...books.slice(0, bookIdx), ...books.slice(bookIdx + 1)])
  }

  return (
    <UserContext.Provider value={user}>
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Layout onLogout={handleLogout} />}>
          <Route index element={<Home />} />
          <Route
            path="/books"
            element={<BookContainer books={books} setBooks={setBooks} />}
          />
          <Route
            path="/books/:id"
            element={<BookDetails books={books} loading={loading} afterReviewAdd={afterReviewAdd}/>}
          />
          <Route
            path="/books/new"
            element={<NewBookForm onAddBook={handleNewBook} />}
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<SignUp onAddUser={handleNewUser} />}
          />
        </Route>
      </Routes>
    </div>
    </UserContext.Provider>
  );
}

export default App;
