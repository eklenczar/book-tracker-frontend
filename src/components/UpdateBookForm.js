import React, { useState } from "react";
import "./UpdateBookForm.css";

function UpdateBookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const handleTitleUpdate = (e) => setTitle(e.target.value);
  const handleAuthorUpdate = (e) => setAuthor(e.target.value);
  const handleGenreUpdate = (e) => setGenre(e.target.value);
  const handleImageUpdate = (e) => setImage(e.target.value);
  const handleDescUpdate = (e) => setDescription(e.target.value);

  function handleUpdateBookSubmit(e) {
    e.preventDefault();
    fetch(`/books/${book.id}`, {
      method: "PATCH",
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
        response.json().then((updatedBook) => onUpdate(updatedBook));
      } else {
        response.json().then((errorData) => setErrors(errorData.errors));
      }
    });
  }

  return (
    <div className="container">
      <div className="center">
        <form className="form">
          <label>Title</label>
          <br />
          <input name="title" value={title} onChange={handleTitleUpdate} />
          <br />
          <label>Author</label>
          <br />
          <input name="author" value={author} onChange={handleAuthorUpdate} />
          <br />
          <label>Genre</label>
          <br />
          <input name="genre" value={genre} onChange={handleGenreUpdate} />
          <br />
          <label>Image</label>
          <br />
          <input name="image" value={image} onChange={handleImageUpdate} />
          <br />
          <label>Description</label>
          <br />
          <input
            name="description"
            value={description}
            onChange={handleDescUpdate}
          />
          <br />
          <button onClick={handleUpdateBookSubmit}>Submit</button>
        </form>
      </div>
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

export default UpdateBookForm;
