import { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginVendor } from '../../utils/api';
import axios from 'axios';
import Navbar from '../../components/Navbar';

function VendorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

  //   try {
  //     const response = await axios.post('http://localhost:5205/api/Auth/login', {
  //       email,
  //       password
  //     });
  //     console.log("in vendor login response", response);
  //     login(response.data);
  //     navigate('/dashboard/vendor');
  //   } catch (err) {
  //     console.error('Login error:', err);
  //     setError(err.response?.data?.error || 'Failed to login. Please check your credentials.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };






  try {
    const response = await axios.post('http://localhost:5205/api/Auth/login', {
      email,
      password
    });
    console.log("in vendor login response", response);
    login(response.data);
    navigate('/dashboard/vendor');
  } catch (err) {
    if (err.response && err.response.data) {
      console.log(err.response.data.message); // Log the error message to the console
      setError(err.response.data.message ||  "Email not verified! Please check your email to verify your account." );
    } else {
      setError('Failed to login');
    }
  }
};

  return (
    <div>
      <Navbar hideLinks={true}/>
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card style={{ width: '400px', position:'relative', bottom:'55px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Vendor Login</h2>
          {location.state?.message && (
            <Alert variant="success" onClose={() => navigate(location.pathname, { replace: true, state: {} })} dismissible>
              {location.state.message}
            </Alert>
          )}
          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
            </Form.Group>
            {/* <Button
              className="w-100"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button> */}
            <Button className="w-100" type="submit">Login</Button>
          </Form>
          <div className="text-center mt-3">
            <Link to="/register/vendor">Register as Vendor</Link>
            <br />
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
}

export default VendorLogin;