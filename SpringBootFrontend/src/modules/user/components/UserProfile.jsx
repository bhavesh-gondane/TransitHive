import { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchProfile();
    
  }, []);

  console.log("user edited profile",editedProfile);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8080/profile/details', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProfile(response.data);
      setEditedProfile(response.data);
    } catch (error) {
      setError('Failed to fetch profile data');
      console.error('Error fetching profile:', error);
    }
  };


  useEffect(() => {
    if (profile) {
      console.log("in profile",profile);
      //localStorage.setItem('userData', JSON.stringify(profile));
    }
  }, [profile]);


  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };
  console.log("user profile system",user.id);
  const handleSave = async () => {
    try {
      await axios.patch(`http://localhost:5205/api/User/${user.id}`, editedProfile, {
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

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-4">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card>
        <Card.Body>
          <Card.Title>Customer Information</Card.Title>
          <Row className="mt-4">
            <Col md={6}>
              <Form>
              {/* <Form.Group className="mb-3">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="id"
                    value={isEditing ? editedProfile.id: profile.id}
                    onChange={handleChange}
                    disabled
                  />
                </Form.Group> */}
                <Form.Group className="mb-3">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={isEditing ? editedProfile.name: profile.name}
                    onChange={handleChange}
                    
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

                
              </Form>
            </Col>

            <Col md={6}>
              <Form>

              <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={isEditing ? editedProfile.phone : profile.phone}
                    onChange={handleChange}
                    
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3">
                  <Form.Label>GSTIN</Form.Label>
                  <Form.Control
                    type="text"
                    value={profile.gstin}
                    disabled
                  />
                </Form.Group> */}

                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={isEditing ? editedProfile.city : profile.city}
                    onChange={handleChange}
                    
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
    </div>
  );
}

export default UserProfile;


