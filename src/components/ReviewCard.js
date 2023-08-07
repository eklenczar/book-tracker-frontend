import React from "react";
import "./ReviewCard.css";

function ReviewCard({ title, text }) {
  console.log(title);
  return (
    <div className="review-card">
        
      <div>
        <h5>{title}</h5>
      </div>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
