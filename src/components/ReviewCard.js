import React, { useContext, useState } from "react";
import "./ReviewCard.css";
import { UserContext } from "./CurrentUserContext";
import { Link } from "react-router-dom";

function ReviewCard({ review, onReviewDelete }) {
  const user = useContext(UserContext);
  const [errors, setErrors] = useState([])

  function handleDeleteClick() {
    fetch(`/reviews/${review.id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        response.json().then((deletedReview) => onReviewDelete(deletedReview));
      } else {
        response.json().then((errorData) => setErrors(errorData.errors));
      }
    });
  }

  return (
    <>
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

export default ReviewCard;
