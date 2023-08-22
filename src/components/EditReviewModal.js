import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function EditReviewModal({ review, onUpdateReview }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState([])
  const [show, setShow] = useState(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTextChange = (e) => setText(e.target.value);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleEditClick(e) {
    e.preventDefault();
    fetch(`/reviews/${review.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        text: text,
      }),
    })
    .then((response) => {
        if (response.ok) {
          response.json().then((updatedReview) => onUpdateReview(updatedReview));
        } else {
          response.json().then((errorData) => setErrors(errorData.errors));
        }
      });
  }

  return (
    <>
      <Button onClick={handleShow}>Edit</Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="title"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                value={text}
                onChange={handleTextChange}
                placeholder="text"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditClick}>
            Save Changes
          </Button>
          
        </Modal.Footer>
      </Modal>
      
    </>
  );
}

export default EditReviewModal;
