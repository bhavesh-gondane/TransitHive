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
      case 'PENDING': return 'bg-warning';
      case 'CONFIRMED': return 'bg-info';
      case 'ASSIGNED': return 'bg-primary';
      case 'COMPLETED': return 'bg-success';
      case 'CANCELLED': return 'bg-danger';
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

          <div className="col-md-6">
            <Card>
              <Card.Body>
                <h6 className="card-title">Location Details</h6>
                <dl className="row-mb-0">
                  <dt className="col-sm-6">Pickup</dt>
                  <dd className="col-sm-10">{booking.pickupLocation}</dd>
                  <dt className="col-sm-6">Drop</dt>
                  <dd className="col-sm-10">{booking.dropLocation}</dd>
                </dl>
              </Card.Body>
            </Card>
          </div>

          {/* <div className="col-md-6">
            <Card>
              <Card.Body>
                <h6 className="card-title">Vendor Details</h6>
                <dl className="row-mb-0">
                  <dt className="col-sm-12">Vendor Company name</dt>
                  {booking.vendor && booking.vendor.companyName && (
                    <dd className="col-sm-10">{booking.vendor.companyName}</dd>
                  )} 
                  {booking.vendor===null && booking.vendor.companyName===null && (
                    <dd className="col-sm-10">{"Not Assigned Yet"}</dd>
                  )}                 
                  <dt className="col-sm-12">Vendor Contact Number</dt>
                  {booking.vendor && booking.vendor.companyName && (
                    <dd className="col-sm-10">{booking.vendor.phone}</dd>
                  )} 
                  {booking.vendor===null && booking.vendor.phone===null && (
                    <dd className="col-sm-10">{"Not Assigned Yet"}</dd>
                  )} 
                </dl>
              </Card.Body>
            </Card>
          </div> */}

          <div className="col-md-6">
            <Card>
              <Card.Body>
                <h6 className="card-title">Vendor Details</h6>
                <dl className="row-mb-0">
                  <dt className="col-sm-12">Vendor Company name</dt>
                  {booking.vendor && booking.vendor.companyName ? (
                    <dd className="col-sm-10">{booking.vendor.companyName}</dd>
                  ) : (
                    <dd className="col-sm-10">{"Not Assigned Yet"}</dd>
                  )}
                  <dt className="col-sm-12">Vendor Contact Number</dt>
                  {booking.vendor && booking.vendor.phone ? (
                    <dd className="col-sm-10">{booking.vendor.phone}</dd>
                  ) : (
                    <dd className="col-sm-10">{"Not Assigned Yet"}</dd>
                  )}
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

