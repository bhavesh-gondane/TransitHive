import { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

function UserRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState(''); // New state for registration message
  const navigate = useNavigate();

  // const validateField = (name, value) => {
  //   switch (name) {
  //     case 'name':
  //       return !value.trim() ? 'Name is required' : 
  //              value.length < 2 ? 'Name must be at least 2 characters long' : '';
      
  //     case 'email':
  //       return !value ? 'Email is required' : 
  //              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? 
  //              'Invalid email format' : '';
      
  //     case 'password':
  //       return !value ? 'Password is required' : 
  //              value.length < 6 ? 'Password must be at least 6 characters long' : 
  //              !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value) ? 
  //              'Password must contain at least one uppercase letter, one lowercase letter, and one number' : '';
      
  //     case 'phone':
  //       return !value ? 'Phone number is required' :
  //              !/^[0-9]{10}$/.test(value) ? 'Phone number must be 10 digits' : '';
      
  //     case 'city':
  //       return !value.trim() ? 'City is required' : '';

  //     default:
  //       return '';
  //   }
  // };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return !value.trim() ? 'Name is required' : 
               value.length < 2 ? 'Name must be at least 2 characters long' : 
               !/^[A-Za-z ]+$/.test(value) ? 'Only text is accepted' : '';
      
      case 'email':
        return !value ? 'Email is required' : 
               !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? 
               'Invalid email format' : '';
      
      case 'password':
        return !value ? 'Password is required' : 
           value.length < 6 ? 'Password must be at least 6 characters long' : 
           !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value) ? 
           'Password must contain at least one uppercase letter, one lowercase letter, and one number' : '';

      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : '';
      
      case 'phone':
        return !value ? 'Phone number is required' :
                value.length !== 10 ? 'Phone number must be 10 digits' :
                !/^[6789][0-9]{9}$/.test(value) ? 'Invalid phone number' : '';
      
      case 'city':
        return !value.trim() ? 'City is required' : 
        !/^[A-Za-z ]+$/.test(value) ? 'Only text is accepted' : '';
      
      default:
        return '';
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field on change
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setRegistrationMessage(''); // Clear any previous messages
    
    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/auth/signup/user', formData);
      console.log("inuser register",response.data);
      if (response.data ==="Email is already taken!"){
        setApiError(response.data);
        return;}
      setRegistrationMessage(response.data); // Set the success message from the backend
      setFormData({ name: '', email: '', password: '', phone: '', city: '' }); // Clear the form
      navigate('/login/user',{
        state: { message: 'Registration successful! You can Now Login' }
      });
      
    } catch (err) {
      if (err.response && err.response.data) {
        setApiError(err.response.data.message || 'Registration failed. Please check your information and try again.');
      } else {
        setApiError('Registration failed. Please check your information and try again.');
      }
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <div>
      <Navbar hideLinks={true} />
      <Container className="py-5">
        <Card style={{ maxWidth: '600px' }} className="mx-auto">
          <Card.Body>
            <h2 className="text-center mb-4">User Registration</h2>
            {apiError && <Alert variant="danger">{apiError}</Alert>}
            {registrationMessage && <Alert variant="info">{registrationMessage}</Alert>} {/* Display success message */}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>

              <Button 
                className="w-100 mt-3" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <Link to="/login/user">Already have an account? Login</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default UserRegister;















