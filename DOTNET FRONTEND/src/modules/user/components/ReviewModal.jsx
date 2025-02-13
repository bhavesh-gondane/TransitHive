import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext'; // Ensure this path is correct

function ReviewModal({ show, handleClose, booking }) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const { user } = useAuth(); // Get the current user

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReview = {
        BookingId: booking.id,
        UserId: user.id,
        VendorId: booking.vendorId,
        Rating: rating,
        Comment: comment,
        ReviewDate: new Date().toISOString()
      };
      
      console.log('Submitting review:', newReview); // Log the review data

      const response = await axios.post('http://localhost:5205/api/review', newReview, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      console.log('Review submitted successfully:', response.data); // Log the response

      setRating('');
      setComment('');
      handleClose();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Submit Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleReviewSubmit}>
          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              required
            />
          </Form.Group>
          <Form.Group controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Review
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReviewModal;