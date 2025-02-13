// import React, { useState } from 'react';
// import { Table, Button, Form, InputGroup } from 'react-bootstrap';
// import { FaSearch } from 'react-icons/fa';

// const BookingsTable = ({ bookings, onViewDetails, onUpdateStatus }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredBookings = bookings.filter(booking =>
//     booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     booking.city.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case 'pending': return 'bg-warning';
//       case 'confirmed': return 'bg-info';
//       case 'completed': return 'bg-success';
//       case 'cancelled': return 'bg-danger';
//       default: return 'bg-secondary';
//     }
//   };

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

//       <div className="table-responsive">
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th className="d-none d-md-table-cell">Email</th>
//               <th>City</th>
//               <th className="d-none d-md-table-cell">Move Date</th>
//               <th>Status</th>
//               <th className="d-none d-md-table-cell">Cost</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredBookings.map((booking) => (
//               <tr key={booking.id}>
//                 <td>{booking.id}</td>
//                 <td>{booking.name}</td>
//                 <td className="d-none d-md-table-cell">{booking.email}</td>
//                 <td>{booking.city}</td>
//                 <td className="d-none d-md-table-cell">
//                   {new Date(booking.move_date).toLocaleDateString()}
//                 </td>
//                 <td>
//                   <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
//                     {booking.status}
//                   </span>
//                 </td>
//                 <td className="d-none d-md-table-cell">
//                   ${booking.cost || '0'}
//                 </td>
//                 <td>
//                   <div className="d-flex gap-2">
//                     <Button
//                       variant="primary"
//                       size="sm"
//                       onClick={() => onViewDetails(booking.id)}
//                     >
//                       View
//                     </Button>
//                     <Button
//                       variant="secondary"
//                       size="sm"
//                       onClick={() => onUpdateStatus(booking)}
//                     >
//                       Update
//                     </Button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default BookingsTable;



import React, { useState } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const BookingsTable = ({ bookings, onViewDetails, onUpdateStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter(booking =>
    booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-warning';
      case 'CONFIRMED': return 'bg-info';
      case 'ASSIGNED': return 'bg-primary';
      case 'COMPLETED': return 'bg-success';
      case 'CANCELLED': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

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

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th className="d-none d-md-table-cell">Email</th>
              <th>City</th>
              <th className="d-none d-md-table-cell">Move Date</th>
              <th>Status</th>
              <th className="d-none d-md-table-cell">Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.name}</td>
                <td className="d-none d-md-table-cell">{booking.email}</td>
                <td>{booking.city}</td>
                <td className="d-none d-md-table-cell">
                  {new Date(booking.moveDate).toLocaleDateString()}
                </td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="d-none d-md-table-cell">
                  Rs.{booking.cost || '0'}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onViewDetails(booking.id)}
                    >
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onUpdateStatus(booking)}
                    >
                      Update
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default BookingsTable;