
import React, { useEffect } from 'react';
import { Modal, Card, Badge, Table } from 'react-bootstrap';

const BookingDetailsModal = ({ booking, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning';
      case 'confirmed': return 'bg-info';
      case 'assigned': return 'bg-primary';
      case 'completed': return 'bg-success';
      case 'cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Booking Details #{booking.id}
          <Badge className={`ms-2 ${getStatusBadgeClass(booking.status)}`}>
            {booking.status}
          </Badge>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Card>
              <Card.Body>
                <h6 className="card-title">Customer Information</h6>
                <dl className="row mb-0">
                  <dt className="col-sm-4">Name</dt>
                  <dd className="col-sm-8">{booking.name}</dd>
                  <dt className="col-sm-4">Email</dt>
                  <dd className="col-sm-8">{booking.email}</dd>
                  <dt className="col-sm-4">Mobile</dt>
                  <dd className="col-sm-8">{booking.mobile}</dd>
                  <dt className="col-sm-4">City</dt>
                  <dd className="col-sm-8">{booking.city}</dd>
                </dl>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-6">
            <Card>
              <Card.Body>
                <h6 className="card-title">Moving Details</h6>
                <dl className="row mb-0">
                  <dt className="col-sm-4">Move Date</dt>
                  <dd className="col-sm-8">
                    {new Date(booking.moveDate).toLocaleDateString()}
                  </dd>
                  <dt className="col-sm-4">Cost</dt>
                  <dd className="col-sm-8">Rs.{booking.cost || 'Not set'}</dd>
                  <dt className="col-sm-4">Package Type</dt>
                  <dd className="col-sm-8">{booking.packagingType}</dd>
                </dl>
              </Card.Body>
            </Card>
          </div>

          <div className="col-12">
            <Card>
              <Card.Body>
                <h6 className="card-title">Location Details</h6>
                <dl className="row mb-0">
                  <dt className="col-sm-2">Pickup</dt>
                  <dd className="col-sm-10">{booking.pickupLocation}</dd>
                  <dt className="col-sm-2">Drop</dt>
                  <dd className="col-sm-10">{booking.dropLocation}</dd>
                </dl>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-6">
            <Card>
              <Card.Body>
                <h6 className="card-title">Pickup Details</h6>
                <dl className="row mb-0">
                  <dt className="col-sm-6">Lift Available</dt>
                  <dd className="col-sm-6">{booking.pickupLift}</dd>
                  {booking.pickupLift === 'NO' && (
                    <>
                      <dt className="col-sm-6">Floor Number</dt>
                      <dd className="col-sm-6">{booking.pickupFloors}</dd>
                    </>
                  )}
                </dl>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-6">
            <Card>
              <Card.Body>
                <h6 className="card-title">Drop Details</h6>
                <dl className="row mb-0">
                  <dt className="col-sm-6">Lift Available</dt>
                  <dd className="col-sm-6">{booking.dropLift}</dd>
                  {booking.dropLift === 'NO' && (
                    <>
                      <dt className="col-sm-6">Floor Number</dt>
                      <dd className="col-sm-6">{booking.dropFloors}</dd>
                    </>
                  )}
                </dl>
              </Card.Body>
            </Card>
          </div>

          {booking.items && booking.items.length > 0 && (
            <div className="col-12">
              <Card>
                <Card.Body>
                  <h6 className="card-title">Items List</h6>
                  <Table responsive striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {booking.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BookingDetailsModal;




// import React, { useEffect } from 'react';
// import { Modal, Card, Badge, Table } from 'react-bootstrap';

// const BookingDetailsModal = ({ booking, onClose }) => {
//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, []);

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case 'pending': return 'bg-warning';
//       case 'confirmed': return 'bg-info';
//       case 'assigned': return 'bg-primary';
//       case 'completed': return 'bg-success';
//       case 'cancelled': return 'bg-danger';
//       default: return 'bg-secondary';
//     }
//   };

//   return (
//     <Modal show={true} onHide={onClose} size="lg" centered>
//       <Modal.Header closeButton>
//         <Modal.Title>
//           Booking Details #{booking.id}
//           <Badge className={`ms-2 ${getStatusBadgeClass(booking.status)}`}>
//             {booking.status}
//           </Badge>
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div className="row g-4">
//           <div className="col-md-6">
//             <Card>
//               <Card.Body>
//                 <h6 className="card-title">Customer Information</h6>
//                 <dl className="row mb-0">
//                   <dt className="col-sm-4">Name</dt>
//                   <dd className="col-sm-8">{booking.name}</dd>
//                   <dt className="col-sm-4">Email</dt>
//                   <dd className="col-sm-8">{booking.email}</dd>
//                   <dt className="col-sm-4">Mobile</dt>
//                   <dd className="col-sm-8">{booking.mobile}</dd>
//                   <dt className="col-sm-4">City</dt>
//                   <dd className="col-sm-8">{booking.city}</dd>
//                 </dl>
//               </Card.Body>
//             </Card>
//           </div>

//           <div className="col-md-6">
//             <Card>
//               <Card.Body>
//                 <h6 className="card-title">Moving Details</h6>
//                 <dl className="row mb-0">
//                   <dt className="col-sm-4">Move Date</dt>
//                   <dd className="col-sm-8">
//                     {new Date(booking.move_date).toLocaleDateString()}
//                   </dd>
//                   <dt className="col-sm-4">Cost</dt>
//                   <dd className="col-sm-8">${booking.cost || 'Not set'}</dd>
//                   <dt className="col-sm-4">Package Type</dt>
//                   <dd className="col-sm-8">{booking.packaging_type}</dd>
//                 </dl>
//               </Card.Body>
//             </Card>
//           </div>

//           <div className="col-md-6">
//             <Card>
//               <Card.Body>
//                 <h6 className="card-title">Location Details</h6>
//                 <dl className="row mb-0">
//                   <dt className="col-sm-4">Pickup</dt>
//                   <dd className="col-sm-8">{booking.pickup_location}</dd>
//                   <dt className="col-sm-4">Drop</dt>
//                   <dd className="col-sm-8">{booking.drop_location}</dd>
//                 </dl>
//               </Card.Body>
//             </Card>
//           </div>

//           <div className="col-md-6">
//             <Card>
//               <Card.Body>
//                 <h6 className="card-title">Pickup Details</h6>
//                 <dl className="row mb-0">
//                   <dt className="col-sm-6">Lift Available</dt>
//                   <dd className="col-sm-6">{booking.pickup_lift}</dd>
//                   {booking.pickup_lift === 'No' && (
//                     <>
//                       <dt className="col-sm-6">Floor Number</dt>
//                       <dd className="col-sm-6">{booking.pickup_floors}</dd>
//                     </>
//                   )}
//                 </dl>
//               </Card.Body>
//             </Card>
//           </div>

//           <div className="col-md-6">
//             <Card>
//               <Card.Body>
//                 <h6 className="card-title">Drop Details</h6>
//                 <dl className="row mb-0">
//                   <dt className="col-sm-6">Lift Available</dt>
//                   <dd className="col-sm-6">{booking.drop_lift}</dd>
//                   {booking.drop_lift === 'No' && (
//                     <>
//                       <dt className="col-sm-6">Floor Number</dt>
//                       <dd className="col-sm-6">{booking.drop_floors}</dd>
//                     </>
//                   )}
//                 </dl>
//               </Card.Body>
//             </Card>
//           </div>

//           <div className="col-md-6">
//             <Card>
//               <Card.Body>
//                 <dt className="col-sm-4">Vendor ID</dt>
//                 <dd className="col-sm-8">{ null }</dd>
//                 <dt className="col-sm-4">Vendor Name</dt>
//                 <dd className="col-sm-8">{null}</dd>
//                 <dt className="col-sm-4">Vendor Email</dt>
//                 <dd className="col-sm-8">{null}</dd>
//               </Card.Body>
//             </Card>
//           </div>

//           {booking.items && booking.items.length > 0 && (
//             <div className="col-12">
//               <Card>
//                 <Card.Body>
//                   <h6 className="card-title">Items List</h6>
//                   <Table responsive striped bordered hover size="sm">
//                     <thead>
//                       <tr>
//                         <th>Item Name</th>
//                         <th>Quantity</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {booking.items.map((item, index) => (
//                         <tr key={index}>
//                           <td>{item.item_name}</td>
//                           <td>{item.quantity}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </Card.Body>
//               </Card>
//             </div>
//           )}
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default BookingDetailsModal;




// import { Modal, Card,Table, Badge, ListGroup } from 'react-bootstrap';

// function BookingDetailsModal({ booking, onClose }) {
//   const getStatusBadge = (status) => {
//     const variants = {
//       pending: 'warning',
//       assigned: 'info',
//       in_progress: 'primary',
//       completed: 'success',
//       cancelled: 'danger'
//     };
//     return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
//   };

//   return (
//     <Modal show={true} onHide={onClose} size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>
//           Booking Details #{booking.id}
//           {booking.status && (
//             <span className="ms-2">
//               {getStatusBadge(booking.status)}
//             </span>
//           )}
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Card className="mb-3">
//           <Card.Body>
//             <Card.Title>Booking Information</Card.Title>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <strong>Booking Date:</strong>{' '}
//                 {new Date(booking.moveDate).toLocaleDateString()}
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <strong>Preferred Time:</strong> {booking.preferred_time}
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <strong>Goods Type:</strong> {booking.goods_type}
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <strong>Weight:</strong> {booking.weight} kg
//               </ListGroup.Item>
//             </ListGroup>
//           </Card.Body>
//         </Card>
        

//         <Card className="mb-3">
//           <Card.Body>
//             <Card.Title>Location Details</Card.Title>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <strong>Pickup Address:</strong>
//                 <p className="mb-0">{booking.pickup_address}</p>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <strong>Delivery Address:</strong>
//                 <p className="mb-0">{booking.delivery_address}</p>
//               </ListGroup.Item>
//             </ListGroup>
//           </Card.Body>
//         </Card>

//         {booking.special_instructions && (
//           <Card>
//             <Card.Body>
//               <Card.Title>Special Instructions</Card.Title>
//               <p className="mb-0">{booking.special_instructions}</p>
//             </Card.Body>
//           </Card>
//         )}
//       </Modal.Body>
//     </Modal>
//   );
//   // return (
//   //   <Modal show={true} onHide={onClose} size="lg" centered>
//   //     <Modal.Header closeButton>
//   //       <Modal.Title>
//   //         Booking Details #{booking.id}
//   //         <Badge className={`ms-2 ${getStatusBadgeClass(booking.status)}`}>
//   //           {booking.status}
//   //         </Badge>
//   //       </Modal.Title>
//   //     </Modal.Header>
//   //     <Modal.Body>
//   //       <div className="row g-4">
//   //         <div className="col-md-6">
//   //           <Card>
//   //             <Card.Body>
//   //               <h6 className="card-title">Customer Information</h6>
//   //               <dl className="row mb-0">
//   //                 <dt className="col-sm-4">Name</dt>
//   //                 <dd className="col-sm-8">{booking.name}</dd>
//   //                 <dt className="col-sm-4">Email</dt>
//   //                 <dd className="col-sm-8">{booking.email}</dd>
//   //                 <dt className="col-sm-4">Mobile</dt>
//   //                 <dd className="col-sm-8">{booking.mobile}</dd>
//   //                 <dt className="col-sm-4">City</dt>
//   //                 <dd className="col-sm-8">{booking.city}</dd>
//   //               </dl>
//   //             </Card.Body>
//   //           </Card>
//   //         </div>

//   //         <div className="col-md-6">
//   //           <Card>
//   //             <Card.Body>
//   //               <h6 className="card-title">Moving Details</h6>
//   //               <dl className="row mb-0">
//   //                 <dt className="col-sm-4">Move Date</dt>
//   //                 <dd className="col-sm-8">
//   //                   {new Date(booking.move_date).toLocaleDateString()}
//   //                 </dd>
//   //                 <dt className="col-sm-4">Cost</dt>
//   //                 <dd className="col-sm-8">${booking.cost || 'Not set'}</dd>
//   //                 <dt className="col-sm-4">Package Type</dt>
//   //                 <dd className="col-sm-8">{booking.packaging_type}</dd>
//   //               </dl>
//   //             </Card.Body>
//   //           </Card>
//   //         </div>

//   //         <div className="col-12">
//   //           <Card>
//   //             <Card.Body>
//   //               <h6 className="card-title">Location Details</h6>
//   //               <dl className="row mb-0">
//   //                 <dt className="col-sm-2">Pickup</dt>
//   //                 <dd className="col-sm-10">{booking.pickup_location}</dd>
//   //                 <dt className="col-sm-2">Drop</dt>
//   //                 <dd className="col-sm-10">{booking.drop_location}</dd>
//   //               </dl>
//   //             </Card.Body>
//   //           </Card>
//   //         </div>

//   //         <div className="col-md-6">
//   //           <Card>
//   //             <Card.Body>
//   //               <h6 className="card-title">Pickup Details</h6>
//   //               <dl className="row mb-0">
//   //                 <dt className="col-sm-6">Lift Available</dt>
//   //                 <dd className="col-sm-6">{booking.pickup_lift}</dd>
//   //                 {booking.pickup_lift === 'No' && (
//   //                   <>
//   //                     <dt className="col-sm-6">Floor Number</dt>
//   //                     <dd className="col-sm-6">{booking.pickup_floors}</dd>
//   //                   </>
//   //                 )}
//   //               </dl>
//   //             </Card.Body>
//   //           </Card>
//   //         </div>

//   //         <div className="col-md-6">
//   //           <Card>
//   //             <Card.Body>
//   //               <h6 className="card-title">Drop Details</h6>
//   //               <dl className="row mb-0">
//   //                 <dt className="col-sm-6">Lift Available</dt>
//   //                 <dd className="col-sm-6">{booking.drop_lift}</dd>
//   //                 {booking.drop_lift === 'No' && (
//   //                   <>
//   //                     <dt className="col-sm-6">Floor Number</dt>
//   //                     <dd className="col-sm-6">{booking.drop_floors}</dd>
//   //                   </>
//   //                 )}
//   //               </dl>
//   //             </Card.Body>
//   //           </Card>
//   //         </div>

//   //         {booking.items && booking.items.length > 0 && (
//   //           <div className="col-12">
//   //             <Card>
//   //               <Card.Body>
//   //                 <h6 className="card-title">Items List</h6>
//   //                 <Table responsive striped bordered hover size="sm">
//   //                   <thead>
//   //                     <tr>
//   //                       <th>Item Name</th>
//   //                       <th>Quantity</th>
//   //                     </tr>
//   //                   </thead>
//   //                   <tbody>
//   //                     {booking.items.map((item, index) => (
//   //                       <tr key={index}>
//   //                         <td>{item.item_name}</td>
//   //                         <td>{item.quantity}</td>
//   //                       </tr>
//   //                     ))}
//   //                   </tbody>
//   //                 </Table>
//   //               </Card.Body>
//   //             </Card>
//   //           </div>
//   //         )}
//   //       </div>
//   //     </Modal.Body>
//   //   </Modal>
//   // );
// }

// export default BookingDetailsModal;



