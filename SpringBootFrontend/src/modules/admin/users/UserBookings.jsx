// import React from 'react';
// import { Card, Table, Badge } from 'react-bootstrap';

// const UserBookings = ({ userId }) => {
//   // Mock data - replace with actual API call
//   const bookings = [
//     {
//       booking_id: 1,
//       service_type: 'House Moving',
//       pickup_location: '123 Start St',
//       drop_location: '456 End St',
//       booking_date: '2024-02-15',
//       status: 'Completed',
//       final_cost: 1500
//     },
//     {
//       booking_id: 2,
//       service_type: 'Office Moving',
//       pickup_location: '789 Business Ave',
//       drop_location: '321 Corporate Blvd',
//       booking_date: '2024-02-20',
//       status: 'Pending',
//       estimated_cost: 2000
//     }
//   ];

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
//     <Card className="mt-4">
//       <Card.Body>
//         <Card.Title>Booking History</Card.Title>
//         <div className="table-responsive">
//           <Table striped bordered hover size="sm">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Service Type</th>
//                 <th>Pickup</th>
//                 <th>Drop</th>
//                 <th>Date</th>
//                 <th>Status</th>
//                 <th>Cost</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking) => (
//                 <tr key={booking.booking_id}>
//                   <td>{booking.booking_id}</td>
//                   <td>{booking.service_type}</td>
//                   <td>{booking.pickup_location}</td>
//                   <td>{booking.drop_location}</td>
//                   <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
//                   <td>{getStatusBadge(booking.status)}</td>
//                   <td>
//                     ₹{booking.final_cost || booking.estimated_cost}
//                     {!booking.final_cost && ' (Est.)'}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

// export default UserBookings;


import React, { useEffect, useState } from 'react';
import { Card, Table, Badge } from 'react-bootstrap';
import axios from 'axios';

const UserBookings = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/bookings/user/${userId}`);
        console.log("response user bookings in admin",response.data);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  const getStatusBadge = (status) => {
    const variants = {
      PENDING: 'warning',
      CONFIRMED: 'info',
      ASSIGNED: 'info',
      COMPLETED: 'success',
      CANCELLED: 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>Booking History</Card.Title>
        <div className="table-responsive">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
               
                <th>Pickup</th>
                <th>Drop</th>
                <th>Date</th>
                <th>Status</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.pickupLocation}</td>
                  <td>{booking.dropLocation}</td>
                  <td>{new Date(booking.moveDate).toLocaleDateString()}</td>
                  <td>{getStatusBadge(booking.status)}</td>
                  <td>
                    ₹{booking.cost || booking.cost}
                    {!booking.cost && ' (Est.)'}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserBookings;