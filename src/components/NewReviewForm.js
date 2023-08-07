import React, { useState } from 'react'

function NewReviewForm() {
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")

  const handleReviewTitleChange = (e) => setTitle(e.target.value)
  const handleReviewTextChange = (e) => setText(e.target.value)

  // function handleNewReviewSubmit(e) {
  //   e.preventDefault()
  //   fetch("http://localhost:3000/books", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       title: title,
        
  //     }),
  //   })
  //     .then(r => r.json())
  //     .then(() => ())
  // }


  return (
    <div>
      <form>
        <label>Title</label>
        <br />
        <input name="title" value={title} onChange={handleReviewTitleChange}/>
        <br />
        <label>Text</label>
        <br />
        <input name="text" value={text} onChange={handleReviewTextChange} />
      </form>
    </div>
  )
}

export default NewReviewForm