import React from 'react'
import ReviewCard from './ReviewCard'


function ReviewContainer( {selectedBook, user_id} ) {

  // function handleReviewDelete(deletedReview) {

  // }
  
  return (
    <>
    {selectedBook.reviews.length === 0 && <span>No reviews found.</span>}
    {selectedBook.reviews.map((review) => <ReviewCard id={review.id} review={review} user_id={user_id} book_id={selectedBook.id} />)}
    </>
  )
}

export default ReviewContainer