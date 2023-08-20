import React, { useContext, useEffect } from "react";
import "./ReviewCard.css";
import { UserContext } from "./CurrentUserContext";

function ReviewCard({ review, book_id }) {
  const user = useContext(UserContext)
  
  function handleDeleteClick() {
    fetch(`/reviews/${review.id}`, {
      method: "DELETE",
    }).then(() => console.log(review));
  }

  function handleEditClick(e) {
    e.preventDefault();
    fetch(`/reviews/${review.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: review.title,
        text: review.text,
        user_id: user?.id,
        book_id: book_id
      }),
    })
      .then((r) => r.json())
      .then((updatedReview) => console.log(updatedReview));
  }

  useEffect(() => {console.log(user?.id)}, [user?.id])
 
  return (
    <div className="review-card">
        
      <div>
        <h5>{review.title} by {review.user.name}</h5>
      </div>
      <div>
        <p>{review.text}</p>
      </div>
      <button onClick={handleEditClick}>Update</button>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}

export default ReviewCard;
