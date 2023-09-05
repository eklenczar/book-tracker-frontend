import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./EditReviewForm.css";

function EditReviewForm({ onUpdateReview, reviews }) {
  const { id } = useParams();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTextChange = (e) => setText(e.target.value);

  const selectedReview = reviews.find((review) => review.id === parseInt(id));
  console.log(selectedReview);

  const [title, setTitle] = useState(selectedReview.title);
  const [text, setText] = useState(selectedReview.text);
  const [errors, setErrors] = useState([]);

  function handleEditClick(e) {
    e.preventDefault();
    fetch(`/reviews/${selectedReview.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        text: text,
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((updatedReview) => onUpdateReview(updatedReview));
        setTitle("")
        setText("")
      } else {
        response.json().then((errorData) => setErrors(errorData.errors));
      }
    });
  }

  return (
    <>
      <div className="container">
        <div className="center">
          <form>
            <label>Title</label>
            <br />
            <input onChange={handleTitleChange} value={title} />
            <br />
            <label>Text</label>
            <br />
            <input onChange={handleTextChange} value={text} />
            <br />
            <br />
            <div className="edit-review-button">
              <button onClick={handleEditClick}>Submit</button>
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

export default EditReviewForm;
