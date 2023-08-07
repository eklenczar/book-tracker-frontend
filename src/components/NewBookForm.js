import React, { useState } from "react";

function NewBookForm({ onAddBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleAuthorChange = (e) => setAuthor(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);
  const handleDescChange = (e) => setDescription(e.target.value);

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
    })
      // .then(r => r.json())
      // .then((newBook) => onAddBook(newBook))
      .then((response) => {
        if (response.ok) {
          response.json().then((newBook) => onAddBook(newBook));
        } else {
          response.json().then((errorData) => setErrors(errorData.errors));
        }
      });
  }

  return (
    <div>
      <form>
        <label>Title</label>
        <br />
        <input name="title" value={title} onChange={handleTitleChange} />
        <br />
        <label>Author</label>
        <br />
        <input name="author" value={author} onChange={handleAuthorChange} />
        <br />
        <label>Genre</label>
        <br />
        <input name="genre" value={genre} onChange={handleGenreChange} />
        <br />
        <label>Image</label>
        <br />
        <input name="image" value={image} onChange={handleImageChange} />
        <br />
        <label>Description</label>
        <br />
        <input
          name="description"
          value={description}
          onChange={handleDescChange}
        />
        <br />
        <button onClick={handleNewBookSubmit}>Submit</button>
      </form>
      {errors.length > 0 && (
        <ul style={{ color: "red" }}>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NewBookForm;
