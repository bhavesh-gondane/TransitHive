import { useState, useEffect } from 'react';
import { Container, Nav, Tab, Row, Col, Button } from 'react-bootstrap';

import { FaSearch, FaPlus, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import MyBookings from './components/MyBookings';
import BookingDetailsModal from './components/BookingDetailsModal';
import DashboardLayout from '../../components/common/DashboardLayout';
import PaymentsList from './components/PaymentsList';
import { useAuth } from '../../context/AuthContext';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import img1 from '../../assets/images/user.jpg';
import img2 from '../../assets/images/premium_photo-1680300960757-376ffe4a18ce.jpeg';


function UserDashboard() {
  const [activeTab, setActiveTab] = useState('welcome'); // Set default tab to "welcome"
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [profileVendor, setProfile] = useState([]);
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    const storedProfile = localStorage.getItem('vendorData');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleNewBooking = () => {
    navigate('/booking', { state: { mode: 'new' } });
  };


  const handleUpdateStatus = async (bookingId) => {
    try {
      const response = await axios.patch(`http://localhost:5205/api/Booking/${bookingId}/status/CANCELLED`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }

        

      });
      window.location.reload();
      console.log('Updating booking status:', bookingId);
    } catch (error) {
      window.location.reload();
      console.error('Error updating booking status:', error);
    }
  };

  return (
    <DashboardLayout title="User Dashboard">
      <Container fluid>
        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          <Row>
            <Col>
              <Nav variant="tabs" className="mb-4">
                <Nav.Item>
                  <Nav.Link eventKey="profile"><strong style={{ fontSize: "25px", textDecoration: "underline" }}>My Profile</strong></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="mybookings"><strong style={{ fontSize: "25px", textDecoration: "underline" }}>My Bookings</strong></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="mypayments"><strong style={{ fontSize: "25px", textDecoration: "underline" }}>Payments</strong></Nav.Link>
                </Nav.Item>
              </Nav>
              

              <Tab.Content>
               
                <Tab.Pane eventKey="welcome">
                  <div className="text-center mt-4">
                    <h2 style={{ fontSize: "34px" }}>Welcome, <span style={{ color: 'orange' }}>{user?.username}</span>, to TransitHive-<em>Seamless Safar & Secure Port!</em></h2>
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleNewBooking}
                        className="d-flex align-items-center gap-2"
                      >
                        <FaPlus /> Book Your Booking
                      </Button>
                      <hr></hr>
                      <hr></hr>
                      <br></br>
                    </div>

                    <Carousel interval={2000} controls indicators>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={img1}
                          alt="Welcome Slide 1"
                        />
                      </Carousel.Item>

                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={img2}
                          alt="Welcome Slide 2"
                        />
                      </Carousel.Item>
                    </Carousel>
                  </div>
                </Tab.Pane>

            
                <Tab.Pane eventKey="profile">
                  <UserProfile />
                </Tab.Pane>

                {/* My Bookings Tab */}
                <Tab.Pane eventKey="mybookings">
                    <MyBookings
                      onViewDetails={handleViewDetails}
                      onUpdateStatus={handleUpdateStatus}
                     // onMakePayment={handleShowPaymentModal}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="mypayments">
                  <PaymentsList />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

        {showDetailsModal && selectedBooking && (
          <BookingDetailsModal
            booking={selectedBooking}
            onClose={() => setShowDetailsModal(false)}
          />
        )}
      </Container>
    </DashboardLayout>
  );
}

export default UserDashboard;