import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Home from "./components/Home";
import BookContainer from "./components/BookContainer";
import BookDetails from "./components/BookDetails";
import NewBookForm from "./components/NewBookForm";


function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch("/books")
      .then((r) => r.json())
      .then((data) => {setBooks(data); setLoading(false)});
  }, []);

  function handleNewBook(newBook) {
    setBooks([...books, newBook])
  }

  // console.log(books)
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/books" element={<BookContainer books={books} setBooks={setBooks} />} />
          <Route path="/books/:id" element={<BookDetails books={books} loading={loading}/>} />
          <Route path="/books/new" element={<NewBookForm onAddBook={handleNewBook} />} />
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
