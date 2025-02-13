import { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';






const stripePromise = loadStripe('pk_test_51Qc3iRCFmfeXybFhPvF5auRpgq5rMTB677cnI4jtTiq5Emh1Gvl4Te2IKBTHJq83XnipqEFj4Qou08XhpmmYTcMf00Yv1ERaqf');

function VendorProfile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [wallet, setWallet] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    fetchProfile();
  
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8080/profile/details', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setWallet(response.data.amount);
      setProfile(response.data);
      setEditedProfile(response.data);
    } catch (error) {
      setError('Failed to fetch profile data');
      console.error('Error fetching profile:', error);
    }
  };

  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:8080/profile/update', editedProfile, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProfile(editedProfile);
      setIsEditing(false);
      setSuccess('Profile updated successfully');
    } catch (error) {
      setError('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value
    });
  };

  const handleAddAmount = async () => {
    try {
      const response = await axios.post('http://localhost:8080/checkout/vendor/create-checkout-session', {
        amount,
        vendorId: user.id,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
  
      if (response.data.sessionId) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
      } else {
        console.error("Session ID is not available in the response");
      }
    } catch (error) {
      setError('Failed to create checkout session');
      console.error('Error creating Stripe checkout session:', error);
    }
  };

  const handleWithdrawAmount = async () => {
    try {
      await axios.post('http://localhost:8080/wallet/withdraw', { amount: 100 }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchWallet();
      setSuccess('Amount withdrawn from wallet successfully');
    } catch (error) {
      setError('Failed to withdraw amount from wallet');
      console.error('Error withdrawing amount from wallet:', error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-4">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Wallet</Card.Title>
          <p>Amount: RS.{wallet}</p>
          <div className="d-flex gap-2">
            <Button variant="success" onClick={() => setShowModal(true)}>
              Add Amount
            </Button>
            <Button variant="danger" onClick={handleWithdrawAmount}>
              Withdraw Amount
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Company Information</Card.Title>
          <Row className="mt-4">
            <Col md={6}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyName"
                    value={isEditing ? editedProfile.companyName : profile.companyName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={profile.email}
                    disabled
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={isEditing ? editedProfile.phone : profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Form>
            </Col>

            <Col md={6}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>GSTIN</Form.Label>
                  <Form.Control
                    type="text"
                    value={profile.gstin}
                    disabled
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={isEditing ? editedProfile.city : profile.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>

          <div className="mt-4">
            {!isEditing ? (
              <Button variant="primary" onClick={handleEdit}>
                Edit Profile
              </Button>
            ) : (
              <div className="d-flex gap-2">
                <Button variant="success" onClick={handleSave}>
                  Save Changes
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { handleAddAmount(); setShowModal(false); }}>
            Pay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VendorProfile;
