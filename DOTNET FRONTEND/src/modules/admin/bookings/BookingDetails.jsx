// import React from 'react';
// import { Card, ListGroup, Button, Badge } from 'react-bootstrap';
// import { toast } from 'react-toastify';

// const BookingDetails = ({ booking }) => {
//   const handleUpdateStatus = (newStatus) => {
//     // Implement status update API call
//     toast.success(`Booking status updated to ${newStatus}`);
//   };

//   const getStatusBadge = (status) => {
//     const variants = {
//       Pending: 'warning',
//       Confirmed: 'info',
      
//       Completed: 'success',
//       Canceled: 'danger'
//     };
//     return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
//   };

//   return (
//     <div>
//       <Card className="mb-4">
//         <Card.Body>
//           <Card.Title>Booking Information</Card.Title>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <strong>Booking ID:</strong> {booking.booking_id}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Status:</strong> {getStatusBadge(booking.status)}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Customer:</strong> {booking.user.name}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Vendor:</strong> {booking.vendor.company_name}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Service Type:</strong> {booking.service_type}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleString()}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>City:</strong> {booking.city}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Distance:</strong> {booking.distance_km} km
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Cost:</strong> ₹{booking.cost.toFixed(2)}
//             </ListGroup.Item>
//           </ListGroup>
//         </Card.Body>
//       </Card>

//       <Card className="mb-4">
//         <Card.Body>
//           <Card.Title>Location Details</Card.Title>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <strong>Pickup Location:</strong> {booking.pickup_location}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Drop Location:</strong> {booking.drop_location}
//             </ListGroup.Item>
//           </ListGroup>
//         </Card.Body>
//       </Card>

//       <Card className="mb-4">
//         <Card.Body>
//           <Card.Title>Items Information</Card.Title>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               {booking.items}
//             </ListGroup.Item>
//           </ListGroup>
//         </Card.Body>
//       </Card>

//       <div className="d-flex gap-2 justify-content-end">
//         {booking.status === 'Pending' && (
//           <>
//             <Button variant="success" onClick={() => handleUpdateStatus('Confirmed')}>
//               Confirm Booking
//             </Button>
//             <Button variant="danger" onClick={() => handleUpdateStatus('Canceled')}>
//               Cancel Booking
//             </Button>
//           </>
//         )}
//         {booking.status === 'Confirmed' && (
//           <Button variant="success" onClick={() => handleUpdateStatus('Completed')}>
//             Mark as Completed
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingDetails;



import React from 'react';
import { Card, ListGroup, Button, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';

const BookingDetails = ({ booking }) => {
  const handleUpdateStatus = (newStatus) => {
    // Implement status update API call
    toast.success(`Booking status updated to ${newStatus}`);
  };

  const getStatusBadge = (status) => {
    const variants = {
      Pending: 'warning',
      Confirmed: 'info',
      Assigned: 'primary',
      Completed: 'success',
      Canceled: 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <div>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Booking Information</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Booking ID:</strong> {booking.booking_id}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Status:</strong> {getStatusBadge(booking.status)}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Customer:</strong> {booking.user.name}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Vendor:</strong> {booking.vendor.company_name}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Service Type:</strong> {booking.service_type}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>City:</strong> {booking.city}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Distance:</strong> {booking.distance_km} km
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Cost:</strong> ₹{booking.cost.toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Location Details</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Pickup Location:</strong> {booking.pickup_location}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Drop Location:</strong> {booking.drop_location}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Items Information</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {booking.items}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <div className="d-flex gap-2 justify-content-end">
        {booking.status === 'Pending' && (
          <>
            <Button variant="success" onClick={() => handleUpdateStatus('Confirmed')}>
              Confirm Booking
            </Button>
            <Button variant="danger" onClick={() => handleUpdateStatus('Canceled')}>
              Cancel Booking
            </Button>
          </>
        )}
        {booking.status === 'Confirmed' && (
          <Button variant="primary" onClick={() => handleUpdateStatus('Assigned')}>
            Assign Booking
          </Button>
        )}
        {booking.status === 'Assigned' && (
          <Button variant="success" onClick={() => handleUpdateStatus('Completed')}>
            Mark as Completed
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;