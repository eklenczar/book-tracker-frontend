import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReviewContainer from "./ReviewContainer";
import NewReviewForm from "./NewReviewForm";
import "./BookDetails.css";

function BookDetails({ books, user, loading }) {
  const [showReview, setShowReview] = useState(true);
  const { id } = useParams();
  
  const selectedBook = books.find((book) => book.id === parseInt(id));

  return (
    <>
      {loading && <span>loading books...</span>}
      {!loading && (
        <div>
          <img
            style={{ width: 200, height: 300 }}
            src={selectedBook.image}
            alt="Cover"
          />
          <h1>{selectedBook ? selectedBook.title : "...loading"}</h1>
          <h2>by {selectedBook.author}</h2>
          <h3>genre: {selectedBook.genre}</h3>
          <p>{selectedBook.description}</p>
          <div className="button-container">
            <div className="new-review-button">
              <button onClick={() => setShowReview(!showReview)}>
                {showReview ? "New Review" : "Cancel"}
              </button>
            </div>
          </div>
          {!showReview && <NewReviewForm user_id={user.id} book_id={selectedBook.id}/>}
          {showReview && <ReviewContainer selectedBook={selectedBook} username={user.name} />}
        </div>
      )}
    </>
  );
}

export default BookDetails;
