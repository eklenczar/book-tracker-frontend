import React from 'react'
import ReviewCard from './ReviewCard'


function ReviewContainer( {selectedBook, onReviewDelete} ) {

  
  return (
    <>
    {selectedBook.reviews.length === 0 && <span>No reviews found.</span>}
    {selectedBook.reviews.map((review) => <ReviewCard key={review.id} review={review} onReviewDelete={onReviewDelete} />)}
    </>
  )
}

export default ReviewContainer