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

  // function handleUpdateBook(updatedBook) {

  // }

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

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Layout user={user} onLogout={handleLogout} />}>
          <Route index element={<Home />} />
          <Route
            path="/books"
            element={<BookContainer books={books} setBooks={setBooks} />}
          />
          <Route
            path="/books/:id"
            element={<BookDetails books={books} user={user} loading={loading} />}
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
  );
}

export default App;
