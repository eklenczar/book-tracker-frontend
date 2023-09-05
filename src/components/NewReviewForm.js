import React, { useContext, useState } from "react";
import "./NewReviewForm.css";
import { UserContext } from "./CurrentUserContext";

function NewReviewForm({ book_id, onReviewAdd }) {
  const [errors, setErrors] = useState([]);
  const user = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleReviewTitleChange = (e) => setTitle(e.target.value);
  const handleReviewTextChange = (e) => setText(e.target.value);

  function handleNewReviewSubmit(e) {
    e.preventDefault();
    fetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        text: text,
        book_id: book_id,
        user_id: user?.id,
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((newReview) => onReviewAdd(newReview));
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
        <form className="form">
          <label>Title</label>
          <input
            name="title"
            value={title}
            onChange={handleReviewTitleChange}
          />
          <label>Text</label>
          <input name="text" value={text} onChange={handleReviewTextChange} />
          <br />
          <button onClick={handleNewReviewSubmit}>Submit</button>
        </form>
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

export default NewReviewForm;
