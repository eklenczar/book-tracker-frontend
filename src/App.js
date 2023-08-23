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
import EditReviewForm from "./components/EditReviewForm";

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

  const reviews = books.map((book) => book.reviews).flat();

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

  function afterReviewAdd(review) {
    const updatedBooks = books.map((book) => {
      if (book.id === review.book_id) {
        // update the book,
        // grab the reviews for the book,
        const updatedReviews = [...book.reviews, review];
        // add the review to those reviews,
        // make a copy of the book object and return updated reviews
        const updatedBook = { ...book, reviews: updatedReviews };
        return updatedBook;
      } else {
        return book;
      }
    });
    setBooks(updatedBooks);
  }

  function afterReviewUpdate(updatedReview) {
    const updatedBooks = books.map((book) => {
      if (book.id === updatedReview.id) {
        const updatedReviews = [...book.reviews, updatedReview];
        const updatedBook = { ...book, reviews: updatedReviews };
        return updatedBook;
      } else {
        return book;
      }
    });
    setBooks(updatedBooks);
  }

  function afterReviewDelete(review, bookId) {
    const bookIdx = books.findIndex((book) => book.id === bookId);
    setBooks([...books.slice(0, bookIdx), ...books.slice(bookIdx + 1)]);
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
              element={
                <BookDetails
                  books={books}
                  loading={loading}
                  afterReviewAdd={afterReviewAdd}
                />
              }
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
          <Route
            path="/reviews/:id/edit"
            element={
              <EditReviewForm
                onUpdateReview={afterReviewUpdate}
                reviews={reviews}
              />
            }
          />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
