import { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup, Badge, Tabs, Tab, Modal } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';

// import { useState, useEffect } from 'react';
// import { Table, Button, Form, InputGroup, Badge, Tabs, Tab, Modal } from 'react-bootstrap';
// import { FaSearch } from 'react-icons/fa';
// import { useAuth } from '../../../context/AuthContext';
// import axios from 'axios';

// function MyBookings({ onViewDetails, onUpdateStatus }) {
//   const [bookings, setBookings] = useState([]);
//   const [profileVendor, setProfile] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [key, setKey] = useState('assigned');
//   const [showOtpModal, setShowOtpModal] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [otpError, setOtpError] = useState('');
//   const [selectedBookingId, setSelectedBookingId] = useState(null);
//   const [isVerifying, setIsVerifying] = useState(false);

//   useEffect(() => {
//     const storedProfile = localStorage.getItem('vendorData');
//     if (storedProfile) {
//       setProfile(JSON.parse(storedProfile));
//     }
//   }, []);

//   useEffect(() => {
//     fetchMyBookings();
//   }, []);

//   const { user } = useAuth();

//   const fetchMyBookings = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5205/api/Booking/vendor/${user.id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       setBookings(response.data);
//     } catch (error) {
//       console.error('Error fetching vendor bookings:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCompleteBooking = async (bookingId) => {
//     try {
//       setSelectedBookingId(bookingId);
//       const response = await axios.post(`http://localhost:5205/api/Otp/generate/${bookingId}`);
//       console.log('OTP response:', response.data);
//       if (response.data=="success") {
//         setShowOtpModal(true);
//         setOtpError('');
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       setOtpError('Failed to send OTP. Please try again.');
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (!otp || otp.length !== 6) {
//       setOtpError('Please enter a valid 6-digit OTP');
//       return;
//     }

//     setIsVerifying(true);
//     try {
//       const response = await axios.post(`http://localhost:5205/api/Otp/verify/${selectedBookingId}`, {
//         code: otp
//       });
//       console.log('Verify OTP response:', response.data);
//       if (response.data=="success") {
//         await onUpdateStatus(selectedBookingId);
//         setShowOtpModal(false);
//         setOtp('');
//         fetchMyBookings(); // Refresh bookings list
//       } else {
//         setOtpError('Invalid OTP. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       setOtpError('Failed to verify OTP. Please try again.');
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   const getStatusBadge = (status) => {
//     const variants = {
//       ASSIGNED: 'info',
//       COMPLETED: 'success',
//       CANCELLED: 'danger',
//     };
//     return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
//   };

//   const filteredBookings = bookings.filter(
//     (booking) =>
//       booking.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.dropLocation.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const bookingsByStatus = (status) => {
//     return filteredBookings.filter((booking) => booking.status === status);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div className="mb-4">
//         <InputGroup>
//           <Form.Control
//             placeholder="Search bookings..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <InputGroup.Text>
//             <FaSearch />
//           </InputGroup.Text>
//         </InputGroup>
//       </div>

//       <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
//         <Tab eventKey="assigned" title="Assigned">
//           <BookingTable
//             bookings={bookingsByStatus('ASSIGNED')}
//             onViewDetails={onViewDetails}
//             onCompleteBooking={handleCompleteBooking}
//             getStatusBadge={getStatusBadge}
//           />
//         </Tab>
//         <Tab eventKey="completed" title="Completed">
//           <BookingTable
//             bookings={bookingsByStatus('COMPLETED')}
//             onViewDetails={onViewDetails}
//             onCompleteBooking={handleCompleteBooking}
//             getStatusBadge={getStatusBadge}
//           />
//         </Tab>
//         <Tab eventKey="cancelled" title="Cancelled">
//           <BookingTable
//             bookings={bookingsByStatus('CANCELLED')}
//             onViewDetails={onViewDetails}
//             onCompleteBooking={handleCompleteBooking}
//             getStatusBadge={getStatusBadge}
//           />
//         </Tab>
//       </Tabs>

//       {/* OTP Verification Modal */}
//       <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Verify Completion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Please enter the OTP sent to the customer's registered mobile number.</p>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Enter OTP</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter 6-digit OTP"
//                 value={otp}
//                 onChange={(e) => {
//                   const value = e.target.value.replace(/[^0-9]/g, '');
//                   if (value.length <= 6) setOtp(value);
//                 }}
//                 maxLength={6}
//                 isInvalid={!!otpError}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {otpError}
//               </Form.Control.Feedback>
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Choose Payment Method</Form.Label>
//               <Form.Control as="select">
//                 <option value="CASH">CASH</option>
//                 <option value="CARD">CARD</option>
//               </Form.Control>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
//             Cancel
//           </Button>
//           <Button 
//             variant="primary" 
//             onClick={handleVerifyOtp}
//             disabled={isVerifying || otp.length !== 6}
//           >
//             {isVerifying ? 'Verifying...' : 'Verify & Complete'}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// function BookingTable({ bookings, onViewDetails, onCompleteBooking, getStatusBadge }) {
//   return (
//     <Table striped bordered hover responsive>
//       <thead>
//         <tr>
//           <th>Booking ID</th>
//           <th>Pickup Address</th>
//           <th>Delivery Address</th>
//           <th>Date</th>
//           <th>Status</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {bookings.length === 0 ? (
//           <tr>
//             <td colSpan="6" className="text-center">No bookings found</td>
//           </tr>
//         ) : (
//           bookings.map((booking) => (
//             <tr key={booking.id}>
//               <td>{booking.id}</td>
//               <td>{booking.pickupLocation}</td>
//               <td>{booking.dropLocation}</td>
//               <td>{new Date(booking.moveDate).toLocaleDateString()}</td>
//               <td>{getStatusBadge(booking.status)}</td>
//               <td>
//                 <div className="d-flex gap-2">
//                   <Button variant="info" size="sm" onClick={() => onViewDetails(booking)}>
//                     View
//                   </Button>
//                   {booking.status === 'ASSIGNED' && (
//                     <Button 
//                       variant="success" 
//                       size="sm" 
//                       onClick={() => onCompleteBooking(booking.id)}
//                     >
//                       Mark as Complete
//                     </Button>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </Table>
//   );
// }

// export default MyBookings;




function MyBookings({ onViewDetails, onUpdateStatus }) {
  const [bookings, setBookings] = useState([]);
  const [profileVendor, setProfile] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState('assigned');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('CASH');

  useEffect(() => {
    const storedProfile = localStorage.getItem('vendorData');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const { user } = useAuth();

  const fetchMyBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/bookings/vendor/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching vendor bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteBooking = async (bookingId) => {
    try {
      setSelectedBookingId(bookingId);
      const response = await axios.post(`http://localhost:8080/api/otp/generate/${bookingId}`);
      console.log('OTP response:', response.data);
      if (response.data === "success") {
        setShowOtpModal(true);
        setOtpError('');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setOtpError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    try {
      const response = await axios.post(`http://localhost:8080/api/otp/verify/${selectedBookingId}`, {
        code: otp,
        paymentMethod: paymentMethod
      });
      console.log('Verify OTP response hgf:', response.data);
      if (response.data === "success") {
        await onUpdateStatus(selectedBookingId);
        setShowOtpModal(false);
        setOtp('');
        fetchMyBookings(); // Refresh bookings list
      } else {
        setOtpError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('Failed to verify OTP. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      ASSIGNED: 'info',
      COMPLETED: 'success',
      CANCELLED: 'danger',
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.dropLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bookingsByStatus = (status) => {
    return filteredBookings.filter((booking) => booking.status === status);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <InputGroup>
          <Form.Control
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
        </InputGroup>
      </div>

      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="assigned" title="Assigned">
          <BookingTable
            bookings={bookingsByStatus('ASSIGNED')}
            onViewDetails={onViewDetails}
            onCompleteBooking={handleCompleteBooking}
            getStatusBadge={getStatusBadge}
          />
        </Tab>
        <Tab eventKey="completed" title="Completed">
          <BookingTable
            bookings={bookingsByStatus('COMPLETED')}
            onViewDetails={onViewDetails}
            onCompleteBooking={handleCompleteBooking}
            getStatusBadge={getStatusBadge}
          />
        </Tab>
        <Tab eventKey="cancelled" title="Cancelled">
          <BookingTable
            bookings={bookingsByStatus('CANCELLED')}
            onViewDetails={onViewDetails}
            onCompleteBooking={handleCompleteBooking}
            getStatusBadge={getStatusBadge}
          />
        </Tab>
      </Tabs>

      {/* OTP Verification Modal */}
      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Verify Completion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please enter the OTP sent to the customer's registered mobile number.</p>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  if (value.length <= 6) setOtp(value);
                }}
                maxLength={6}
                isInvalid={!!otpError}
              />
              <Form.Control.Feedback type="invalid">
                {otpError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Choose Payment Method</Form.Label>
              <Form.Control as="select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="CASH">CASH</option>
                <option value="CARD">CARD</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleVerifyOtp}
            disabled={isVerifying || otp.length !== 6}
          >
            {isVerifying ? 'Verifying...' : 'Verify & Complete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function BookingTable({ bookings, onViewDetails, onCompleteBooking, getStatusBadge }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Booking ID</th>
          <th>Pickup Address</th>
          <th>Delivery Address</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center">No bookings found</td>
          </tr>
        ) : (
          bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.pickupLocation}</td>
              <td>{booking.dropLocation}</td>
              <td>{new Date(booking.moveDate).toLocaleDateString()}</td>
              <td>{getStatusBadge(booking.status)}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button variant="info" size="sm" onClick={() => onViewDetails(booking)}>
                    View
                  </Button>
                  {booking.status === 'ASSIGNED' && (
                    <Button 
                      variant="success" 
                      size="sm" 
                      onClick={() => onCompleteBooking(booking.id)}
                    >
                      Mark as Complete
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}

export default MyBookings;