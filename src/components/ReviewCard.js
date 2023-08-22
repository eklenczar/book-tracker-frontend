import React, { useContext, useEffect } from "react";
import "./ReviewCard.css";
import { UserContext } from "./CurrentUserContext";
import EditReviewModal from "./EditReviewModal";
import Button from "react-bootstrap/Button";
import { ButtonGroup } from "react-bootstrap";

function ReviewCard({ review }) {
  const user = useContext(UserContext);

  function handleDeleteClick() {
    fetch(`/reviews/${review.id}`, {
      method: "DELETE",
    }).then(() => console.log(review));
  }

  function handleEditReview(updatedReview) {}

  useEffect(() => {
    console.log(user?.id);
  }, [user?.id]);

  return (
    <div className="review-card">
      <div>
        <h5>{review.title}</h5>
        <p> by {review.user.name}</p>
      </div>
      <div>
        <p>{review.text}</p>
      </div>
      <ButtonGroup>
        <EditReviewModal review={review} onUpdateReview={handleEditReview} />
        <Button onClick={handleDeleteClick}>Delete</Button>
      </ButtonGroup>
    </div>
  );
}

export default ReviewCard;
