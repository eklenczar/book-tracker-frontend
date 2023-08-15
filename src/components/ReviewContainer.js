import React from 'react'
import ReviewCard from './ReviewCard'


function ReviewContainer( {selectedBook, username} ) {

  // const renderReviews = ()
  return (
    <>
    {selectedBook.reviews.length === 0 && <span>No reviews found.</span>}
    {selectedBook.reviews.map((review) => <ReviewCard username={username} id={review.id} title={review.title} text={review.text}/>)}
    </>
  )
}

export default ReviewContainer