import { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link ,useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import axios from 'axios';
import Navbar from '../../components/Navbar';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
   const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const response = await axios.post('http://localhost:8080/auth/authenticate', {
        email,
        password
      },{
        headers: {
          'Content-Type': 'application/json', 
          'Access-Control-Allow-Origin': '*',
        }
      }
    );      
      console.log("in user login response", response);
      // if(response.data.message==="Email not verified! Please check your email to verify your account"){
      //   setError(response.data.message);
      //   return;
      // }
      // else if(response.data.message==="Invalid email or password"){
      //   setError(response.data.message);
      //   return;
      // }
      if (response.data==="Incorrect email or password") {
        setError(response.data);
        return;
      }
           
      login(response.data);
      navigate('/dashboard/user');
    } catch (err) {
      if (err.response && err.response.data) {
        console.log("login error ",err.response); // Log the error message to the console
        console.log("login error ",err.response.data.error); // Log the error message to the console
        setError(err.response.data.error || "Email not verified! Please check your email to verify your account." );
      } else {
        setError('Failed to login');
      }
    }
  };

  return (
    <div>
      <Navbar hideLinks={true} />
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <Card style={{ width: '400px', position: 'relative', bottom: '55px' }}>
          <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
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
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button className="w-100" type="submit">Login</Button>
            </Form>
            <div className="text-center mt-3">
              {/* <Link to="/register/user">Register as User</Link>
              <br /> */}
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default UserLogin;


