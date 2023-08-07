import React from 'react'
import ReviewCard from './ReviewCard'


function ReviewContainer( {selectedBook} ) {

  // const renderReviews = ()
  return (
    <>
    {selectedBook.reviews.length === 0 && <span>No reviews found.</span>}
    {selectedBook.reviews.map((review) => <ReviewCard id={review.id} title={review.title} text={review.text}/>)}
    </>
  )
}

export default ReviewContainer