import { useState, useEffect } from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import DashboardLayout from '../../components/common/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [profile, setProfile] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("in user dashboard",localStorage.getItem('token'));
        const response = await axios.get('http://localhost:8080/profile/details', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log("in user dashboard", response.data); 
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <DashboardLayout title="User Dashboard">
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Profile Information</Card.Header>
            <Card.Body>
              {profile && (
                <>
                  <p><strong>Name:</strong> {profile.id}</p>
                  <p><strong>Name:</strong> {profile.name}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Phone:</strong> {profile.phone}</p>
                  <p><strong>Address:</strong> {profile.city}</p>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Header>Recent Bookings</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Date</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">No bookings found</td>
                    </tr>
                  ) : (
                    bookings.map(booking => (
                      <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.date}</td>
                        <td>{booking.from}</td>
                        <td>{booking.to}</td>
                        <td>{booking.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}

export default UserDashboard;