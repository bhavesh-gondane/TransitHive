import { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

function VendorRegister() {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gstin: '',
    companyOwnerName: '',
    ownerAadharNumber: '',
    panNumber: '',
    city: '',
    amount: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState(''); // New state for registration message
  const navigate = useNavigate();

  // const validateField = (name, value) => {
  //   switch (name) {
  //     case 'companyName':
  //       return !value ? 'Company name is required' : '';

  //     case 'email':
  //       return !value ? 'Email is required' :
  //         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ?
  //           'Invalid email format' : '';

  //     case 'password':
  //       return !value ? 'Password is required' :
  //         value.length < 6 ? 'Password must be at least 6 characters long' : '';
          
  //     case 'confirmPassword':
  //       return value !== formData.password ? 'Passwords do not match' : '';

  //     case 'phone':
  //       return !value ? 'Phone number is required' :
  //         !/^[0-9]{10}$/.test(value) ? 'Phone number must be 10 digits' : '';

  //     case 'gstin':
  //       return !value ? 'GSTIN is required' :
  //         !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(value) ?
  //           'Invalid GSTIN format' : '';

  //     case 'companyOwnerName':
  //       return !value ? 'Company owner name is required' : '';

  //     case 'ownerAadharNumber':
  //       return !value ? 'Owner Aadhar number is required' :
  //         !/^[0-9]{12}$/.test(value) ? 'Aadhar number must be 12 digits' : '';

  //     case 'panNumber':
  //       return !value ? 'PAN number is required' :
  //         !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value) ? 'Invalid PAN number format' : '';

  //     case 'city':
  //       return !value ? 'City is required' : '';

  //     case 'amount':
  //       return value && !/^[0-9]+$/.test(value) ? 'Amount must be numeric' : '';

  //     default:
  //       return '';
  //   }
  // };

  const validateField = (name, value) => {
    switch (name) {
      case 'companyName':
        return !value ? 'Company name is required' : 
        !/^[A-Za-z ]+$/.test(value) ? 'Company Name Must Not Contain Number' : '';

        
      
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
               !/^[6789][0-9]{9}$/.test(value) ? 'Phone number must be 10 digits and start with 6,7,8,9' : '';
      
      case 'gstin':
        return !value ? 'GSTIN is required' :
               !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(value) ?
               'Invalid GSTIN format' : '';
      
      case 'companyOwnerName':
        return !value ? 'Company owner name is required' : 
        !/^[A-Za-z ]+$/.test(value) ? 'Company Owner Name Must Not Contain Number' : '';
      
      case 'ownerAadharNumber':
        return !value ? 'Owner Aadhar number is required' :
               !/^(?!0{12})(?!1{12})\d{12}$/.test(value) ? 'Aadhar number must be 12 digits' : '';
      
      case 'panNumber':
        return !value ? 'PAN number is required' :
               !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value) ? 'Invalid PAN number format' : '';
      
      case 'city':
        return !value ? 'City is required' : 
        !/^[A-Za-z ]+$/.test(value) ? 'City Must Not Contain Number' : '';
      
      // case 'amount':
      //   return value && !/^[0-9]+$/.test(value) ? 'Amount must be numeric' : '';
      
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setApiError('');

  //   if (!validateForm()) {
  //     return;
  //   }

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
      console.log("res : ");
      const response = await axios.post('http://localhost:8080/auth/signup/vendor', formData);
      if (response.data ==="Email is already taken!"){
        setApiError(response.data);
        return;}
      setRegistrationMessage(response.data); // Set the success message from the backend
      
      

      setFormData({
        companyName: '',
        email: '',
        password: '',
        phone: '',
        gstin: '',
        companyOwnerName: '',
        ownerAadharNumber: '',
        panNumber: '',
        city: '',
        amount: ''
      }); // Clear the form


      navigate('/login/user', {
        state: { message: 'Registration successful! You Can Now Login' }
      });
    } catch (err) {
      setApiError(
        err.response?.data?.error ||
        'Registration failed. Please check your information and try again.'
      );
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
            <h2 className="text-center mb-4">Vendor Registration</h2>
            {apiError && <Alert variant="danger">{apiError}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  isInvalid={!!errors.companyName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.companyName}
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
                <Form.Label>GSTIN</Form.Label>
                <Form.Control
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  isInvalid={!!errors.gstin}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.gstin}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Owner Name</Form.Label>
                <Form.Control
                  name="companyOwnerName"
                  value={formData.companyOwnerName}
                  onChange={handleChange}
                  isInvalid={!!errors.companyOwnerName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.companyOwnerName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Aadhar Number</Form.Label>
                <Form.Control
                  name="ownerAadharNumber"
                  value={formData.ownerAadharNumber}
                  onChange={handleChange}
                  isInvalid={!!errors.ownerAadharNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ownerAadharNumber}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>PAN Number</Form.Label>
                <Form.Control
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  isInvalid={!!errors.panNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.panNumber}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>

              {/* <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  isInvalid={!!errors.amount}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.amount}
                </Form.Control.Feedback>
              </Form.Group> */}

              <Button
                className="w-100"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <Link to="/login/vendor">Already have an account? Login</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default VendorRegister;
