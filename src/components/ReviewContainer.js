import React from 'react'
import ReviewCard from './ReviewCard'


function ReviewContainer( {selectedBook} ) {

  
  return (
    <>
    {selectedBook.reviews.length === 0 && <span>No reviews found.</span>}
    {selectedBook.reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
    </>
  )
}

export default ReviewContainer