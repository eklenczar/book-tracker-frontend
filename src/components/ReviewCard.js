import React from "react";
import "./ReviewCard.css";

function ReviewCard({ title, text, username }) {
  // console.log(title);
  return (
    <div className="review-card">
        
      <div>
        <h5>{title} by {username}</h5>
      </div>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
