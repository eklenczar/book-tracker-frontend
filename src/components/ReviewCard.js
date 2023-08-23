import React, { useContext, useEffect } from "react";
import "./ReviewCard.css";
import { UserContext } from "./CurrentUserContext";
import { Link } from "react-router-dom";


function ReviewCard({ review }) {
  const user = useContext(UserContext);

  function handleDeleteClick() {
    fetch(`/reviews/${review.id}`, {
      method: "DELETE",
    }).then(() => console.log(review));
  }

  return (
    <div className="review-card">
      <div>
        <h5>{review.title}</h5>
        <p> by {review.user.name}</p>
      </div>
      <div>
        <p>{review.text}</p>
      </div>
      
        <Link to={`/reviews/${review.id}/edit`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDeleteClick}>Delete</button>

      
    </div>
  );
}

export default ReviewCard;
