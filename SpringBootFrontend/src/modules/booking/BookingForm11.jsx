import { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function BookingForm() {
  const [formData, setFormData] = useState({
    pickup_address: '',
    delivery_address: '',
    booking_date: '',
    preferred_time: '',
    goods_type: '',
    weight: '',
    special_instructions: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/bookings', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSuccess('Booking created successfully!');
      setTimeout(() => {
        navigate('/dashboard/user');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create booking');
    }
  };

  return (
    <Container className="py-5">
      <Card style={{ maxWidth: '800px' }} className="mx-auto">
        <Card.Body>
          <h2 className="text-center mb-4">Book Your Move</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Pickup Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="pickup_address"
                value={formData.pickup_address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="delivery_address"
                value={formData.delivery_address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Moving Date</Form.Label>
              <Form.Control
                type="date"
                name="booking_date"
                value={formData.booking_date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preferred Time</Form.Label>
              <Form.Select
                name="preferred_time"
                value={formData.preferred_time}
                onChange={handleChange}
                required
              >
                <option value="">Select preferred time</option>
                <option value="morning">Morning (8 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                <option value="evening">Evening (4 PM - 8 PM)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type of Goods</Form.Label>
              <Form.Select
                name="goods_type"
                value={formData.goods_type}
                onChange={handleChange}
                required
              >
                <option value="">Select type of goods</option>
                <option value="household">Household Items</option>
                <option value="furniture">Furniture</option>
                <option value="electronics">Electronics</option>
                <option value="vehicles">Vehicles</option>
                <option value="commercial">Commercial Goods</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Approximate Weight (kg)</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Special Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="special_instructions"
                value={formData.special_instructions}
                onChange={handleChange}
                placeholder="Any special handling instructions or additional information"
              />
            </Form.Group>

            <Button className="w-100" type="submit">Submit Booking</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BookingForm;