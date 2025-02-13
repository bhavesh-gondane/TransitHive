import { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.post('http://localhost:3000/api/auth/forgot-password', { email });

      await axios.post('http://localhost:8080/api/otp/generate/forgototp', { email });

      setMessage('Password reset instructions have been sent to your email.');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process request');
      setMessage('');
    }
  };

  return (
    <div>
    <Navbar hideLinks={true} />
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px', position:'relative', bottom:'55px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Forgot Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="w-100" type="submit">Reset Password</Button>
          </Form>
          <div className="text-center mt-3">
            <Link to="/login/user">Back to Login</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
}

export default ForgotPassword;