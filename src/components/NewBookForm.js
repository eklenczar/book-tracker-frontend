import React, { useState } from "react";
import "./NewBookForm.css";

function NewBookForm({ onAddBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const handleTitle = (e) => setTitle(e.target.value);
  const handleAuthor = (e) => setAuthor(e.target.value);
  const handleGenre = (e) => setGenre(e.target.value);
  const handleImage = (e) => setImage(e.target.value);
  const handleDesc = (e) => setDescription(e.target.value);

  function handleNewBookSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        author: author,
        genre: genre,
        image: image,
        description: description,
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((newBook) => onAddBook(newBook));
      } else {
        response.json().then((errorData) => setErrors(errorData.errors));
      }
    });
  }

  return (
    <>
      <div className="new-book-container">
        <div className="new-book-center">
          <form>
            <label>Title</label>
            <br />
            <input name="title" value={title} onChange={handleTitle} />
            <br />
            <label>Author</label>
            <br />
            <input name="author" value={author} onChange={handleAuthor} />
            <br />
            <label>Genre</label>
            <br />
            <input name="genre" value={genre} onChange={handleGenre} />
            <br />
            <label>Image</label>
            <br />
            <input name="image" value={image} onChange={handleImage} />
            <br />
            <label>Description</label>
            <br />
            <input
              name="description"
              value={description}
              onChange={handleDesc}
            />
            <br />
            <br />
            <div className="new-book-submit-button">
              <button onClick={handleNewBookSubmit}>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div>
        {errors.length > 0 && (
          <ul style={{ color: "red" }}>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default NewBookForm;
