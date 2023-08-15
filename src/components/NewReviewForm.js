import React, { useState } from "react";
import "./NewReviewForm.css";

function NewReviewForm({ book_id, user_id }) {
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
        user_id: user_id,
      }),
    })
      .then((r) => r.json())
      .then((data) => console.log(data));
  }

  return (
    <div className="container">
      <form className="form">
        <label>Title</label>

        <input name="title" value={title} onChange={handleReviewTitleChange} />

        <label>Text</label>

        <input name="text" value={text} onChange={handleReviewTextChange} />
        <br />
        <button onClick={handleNewReviewSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default NewReviewForm;
