// import { useState, useEffect } from 'react';
// import { Table, Button, Form, InputGroup, Badge, Modal } from 'react-bootstrap';
// import { FaSearch, FaPlus, FaEdit } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../context/AuthContext';
// // import { Modal } from 'react-bootstrap';
// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';
// import ReviewModal from './ReviewModal';

// const stripePromise = loadStripe('pk_test_51Qc3iRCFmfeXybFhPvF5auRpgq5rMTB677cnI4jtTiq5Emh1Gvl4Te2IKBTHJq83XnipqEFj4Qou08XhpmmYTcMf00Yv1ERaqf');

// function MyBookings({ onViewDetails, onUpdateStatus,onMakePayment }) {
//   const [bookings, setBookings] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [showModal, setShowModal] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showReviewModal, setShowReviewModal] = useState(false);

//   useEffect(() => {
//     fetchMyBookings();
//   }, []);

//   const fetchMyBookings = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5205/api/Booking/user/${user.id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       console.log("response of my bookings in user paneel",response.data);
//       setBookings(response.data);
//     } catch (error) {
//       console.error('Error fetching user bookings:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNewBooking = () => {
//     navigate('/booking', { state: { mode: 'new' } });
//   };

//   const handleEditBooking = (booking) => {
//     navigate('/booking', { 
//       state: { 
//         mode: 'edit',
//         bookingData: booking
//       }
//     });
//   };


//   const handleMakePayment = (booking) => {
//     console.log('Selected Booking:', booking);
//     setSelectedBooking(booking);
//     setShowModal(true);
//   };



//   const handlePay = async (booking) => {
//     console.log("Booking object:", booking); // Check the booking data
//     if (!booking.id) {
//         console.error("Booking ID is missing");
//         return; // Don't proceed if booking ID is missing
//     }
//     setSelectedBooking(booking);
//     try {
//       const response = await axios.post('http://localhost:5205/api/Checkout/create-checkout-session', {
//         id: booking.id,
//         userId: booking.userId,
//         cost: booking.cost,
        
//         // items: booking.bookingItems, // Include items if necessary
//         // companyName: booking.companyName,
//       });
  
//       // Log the response to check if sessionId is available
//       console.log("Response from backend: ", response.data);
  
//       if (response.data.sessionId) {
//         const stripe = await stripePromise;
//         await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
//       } else {
//         console.error("Session ID is not available in the response");
//       }
//     } catch (error) {
//       console.error('Error creating Stripe checkout session:', error);
//     }
//   };


//   const handleReviewStatus = (booking) => {
//     setSelectedBooking(booking);
//     setShowReviewModal(true);
//   };


//   const getStatusBadge = (status) => {
//     const variants = {
//       PENDING: 'warning',
//       CONFIRMED: 'info',
//       ASSIGNED: 'primary',
//       COMPLETED: 'success',
//       CANCELLED: 'danger'
//     };
//     return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
//   };

//   const filteredBookings = bookings.filter(booking =>
//     booking.pickupLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     booking.dropLocation?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <Button 
//           variant="primary" 
//           size="lg" 
//           onClick={handleNewBooking}
//           className="d-flex align-items-center gap-2"
//         >
//           <FaPlus /> New Booking
//         </Button>
//         <div className="w-50">
//           <InputGroup>
//             <Form.Control
//               placeholder="Search bookings..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <InputGroup.Text>
//               <FaSearch />
//             </InputGroup.Text>
//           </InputGroup>
//         </div>
//       </div>

//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>Booking ID</th>
//             <th>Pickup Address</th>
//             <th>Delivery Address</th>
//             <th>Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredBookings.length === 0 ? (
//             <tr>
//               <td colSpan="6" className="text-center">No bookings found</td>
//             </tr>
//           ) : (
//             filteredBookings.map((booking) => (
//               <tr key={booking.id}>
//                 <td>{booking.id}</td>
//                 <td>{booking.pickupLocation}</td>
//                 <td>{booking.dropLocation}</td>
//                 <td>{new Date(booking.moveDate).toLocaleDateString()}</td>
//                 <td>{getStatusBadge(booking.status)}</td>
//                 <td>
//                   <div className="d-flex gap-2">
//                     <Button
//                       variant="info"
//                       size="sm"
//                       onClick={() => onViewDetails(booking)}
//                     >
//                       View
//                     </Button>
//                     {booking.status === 'PENDING' && (
//                       <Button
//                         variant="primary"
//                         size="sm"
//                         onClick={() => handleEditBooking(booking)}
//                       >
//                         <FaEdit /> Edit
//                       </Button>
//                     )}
//                     {booking.status !== 'COMPLETED' && booking.status !== 'CANCELLED' && (
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => {
//                           if (window.confirm('Do you really want to cancel the booking?')) {
//                             onUpdateStatus(booking.id);
//                           }
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                     )}

//                     {booking.status === 'COMPLETED' && booking.isPaid==false && booking.paymentMethod==='CARD' &&(
//                       <Button
//                         variant="primary"
//                         size="sm"
//                         onClick={() => handleMakePayment(booking)}
//                       >
//                         Make Payment
//                       </Button>
//                     )}
//                   {booking.status === 'COMPLETED' && booking.isReviewed==false &&(
//                       <Button
//                         variant="primary"
//                         size="sm"
//                         onClick={() => handleReviewStatus(booking)}
//                       >
//                         Review
//                       </Button>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>



//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//   <Modal.Header closeButton>
//     <Modal.Title>Payment Details</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     {selectedBooking ? (
//       <div>
//         <p><strong>Booking ID:</strong> {selectedBooking.id}</p>
//         <p><strong>User ID:</strong> {user.id}</p>
//         <p><strong>Vendor:</strong> {selectedBooking.vendorName || 'N/A'}</p>
//         <p><strong>Cost:</strong> Rs.{selectedBooking.cost}</p>
//       </div>
//     ) : (
//       <p>Loading payment details...</p>
//     )}
//   </Modal.Body>
//   <Modal.Footer>
//       <Button
//         variant="primary"
//         onClick={() => {
//           handlePay(selectedBooking);
//         }}
//       >
//         Click here to Pay
//       </Button>
//     <Button variant="secondary" onClick={() => setShowModal(false)}>
//       Close
//     </Button>
//   </Modal.Footer>
// </Modal>


// {selectedBooking && (
//         <ReviewModal
//           show={showReviewModal}
//           handleClose={() => setShowReviewModal(false)}
//           booking={selectedBooking}
//         />
//       )}


//     </div>
//   );
// }

// export default MyBookings;



import { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup, Badge, Modal } from 'react-bootstrap';
import { FaSearch, FaPlus, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
// import { Modal } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import ReviewModal from './ReviewModal';

const stripePromise = loadStripe('pk_test_51Qc3iRCFmfeXybFhPvF5auRpgq5rMTB677cnI4jtTiq5Emh1Gvl4Te2IKBTHJq83XnipqEFj4Qou08XhpmmYTcMf00Yv1ERaqf');

function MyBookings({ onViewDetails, onUpdateStatus,onMakePayment }) {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/bookings/user/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log("response of my bookings in user paneel",response.data);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewBooking = () => {
    navigate('/booking', { state: { mode: 'new' } });
  };

  const handleEditBooking = (booking) => {
    navigate('/booking', { 
      state: { 
        mode: 'edit',
        bookingData: booking
      }
    });
  };


  const handleMakePayment = (booking) => {
    console.log('Selected Booking:', booking);
    setSelectedBooking(booking);
    setShowModal(true);
  };



  const handlePay = async (booking) => {
    console.log("Booking object:", booking); // Check the booking data
    if (!booking.id) {
        console.error("Booking ID is missing");
        return; // Don't proceed if booking ID is missing
    }
    setSelectedBooking(booking);
    console.log("Booking object:", booking); // Check the booking data
    try {
      const response = await axios.post('http://localhost:8080/checkout/create-checkout-session', {
        bookingId: booking.id,
        userId: booking.userId,
        vendorId: booking.vendor.id,
        cost: booking.cost,
        
        // items: booking.bookingItems, // Include items if necessary
        // companyName: booking.companyName,
      });
  
      // Log the response to check if sessionId is available
      console.log("Response from backend: ", response.data);
  
      if (response.data.sessionId) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
      } else {
        console.error("Session ID is not available in the response");
      }
    } catch (error) {
      console.error('Error creating Stripe checkout session:', error);
    }
  };


  const handleReviewStatus = (booking) => {
    setSelectedBooking(booking);
    setShowReviewModal(true);
  };


  const getStatusBadge = (status) => {
    const variants = {
      PENDING: 'warning',
      CONFIRMED: 'info',
      ASSIGNED: 'primary',
      COMPLETED: 'success',
      CANCELLED: 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const filteredBookings = bookings.filter(booking =>
    booking.pickupLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.dropLocation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button 
          variant="primary" 
          size="lg" 
          onClick={handleNewBooking}
          className="d-flex align-items-center gap-2"
        >
          <FaPlus /> New Booking
        </Button>
        <div className="w-50">
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
      </div>

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
          {filteredBookings.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No bookings found</td>
            </tr>
          ) : (
            filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.pickupLocation}</td>
                <td>{booking.dropLocation}</td>
                <td>{new Date(booking.moveDate).toLocaleDateString()}</td>
                <td>{getStatusBadge(booking.status)}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => onViewDetails(booking)}
                    >
                      View
                    </Button>
                    {booking.status === 'PENDING' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEditBooking(booking)}
                      >
                        <FaEdit /> Edit
                      </Button>
                    )}
                    {booking.status !== 'COMPLETED' && booking.status !== 'CANCELLED' && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          if (window.confirm('Do you really want to cancel the booking?')) {
                            onUpdateStatus(booking.id);
                          }
                        }}
                      >
                        Cancel
                      </Button>
                    )}

                    {booking.status === 'COMPLETED' && booking.isPaid==false && booking.paymentMethod==='CARD' &&(
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleMakePayment(booking)}
                      >
                        Make Payment
                      </Button>
                    )}
                  {booking.status === 'COMPLETED' && booking.isReviewed==false &&(
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleReviewStatus(booking)}
                      >
                        Review
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>



      <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Payment Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedBooking ? (
      <div>
        <p><strong>Booking ID:</strong> {selectedBooking.id}</p>
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Vendor:</strong> {selectedBooking.vendor.id || 'N/A'}</p>
        <p><strong>Cost:</strong> Rs.{selectedBooking.cost}</p>
      </div>
    ) : (
      <p>Loading payment details...</p>
    )}
  </Modal.Body>
  <Modal.Footer>
      <Button
        variant="primary"
        onClick={() => {
          handlePay(selectedBooking);
        }}
      >
        Click here to Pay
      </Button>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>


{selectedBooking && (
        <ReviewModal
          show={showReviewModal}
          handleClose={() => setShowReviewModal(false)}
          booking={selectedBooking}
        />
      )}


    </div>
  );
}

export default MyBookings;







