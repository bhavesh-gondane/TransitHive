// // import React from 'react';
// //import { Form, Button, Card } from 'react-bootstrap';

// // const VendorReviewForm = ({ vendor }) => {
// //   const handleApprove = () => {
// //     // Implement approve logic
// //   };

// //   const handleReject = () => {
// //     // Implement reject logic
// //   };

// //   return (
// //     <div>
// //       <Card className="mb-4">
// //         <Card.Body>
// //           <Card.Title>Company Information</Card.Title>
// //           <Form>
// //             <Form.Group className="mb-3">
// //               <Form.Label>Company Name</Form.Label>
// //               <Form.Control type="text" value={vendor.companyName} readOnly />
// //             </Form.Group>
// //             <Form.Group className="mb-3">
// //               <Form.Label>Company Owner Name</Form.Label>
// //               <Form.Control type="text" value={vendor.companyOwnerName} readOnly />
// //             </Form.Group>
// //             <Form.Group className="mb-3">
// //               <Form.Label>Email</Form.Label>
// //               <Form.Control type="email" value={vendor.email} readOnly />
// //             </Form.Group>
// //             <Form.Group className="mb-3">
// //               <Form.Label>Phone</Form.Label>
// //               <Form.Control type="text" value={vendor.phone} readOnly />
// //             </Form.Group>
// //             <Form.Group className="mb-3">
// //               <Form.Label>GSTIN</Form.Label>
// //               <Form.Control type="text" value={vendor.gstin} readOnly />
// //             </Form.Group>
// //             <Form.Group className="mb-3">
// //               <Form.Label>PAN Number</Form.Label>
// //               <Form.Control type="text" value={vendor.panNumber} readOnly />
// //             </Form.Group>
// //             <Form.Group className="mb-3">
// //               <Form.Label>Aadhar Number</Form.Label>
// //               <Form.Control type="text" value={vendor.ownerAadharNumber} readOnly />
// //             </Form.Group>
// //             <Form.Group className="mb-3">
// //               <Form.Label>City</Form.Label>
// //               <Form.Control type="text" value={vendor.city} readOnly />
// //             </Form.Group>
// //             <Form.Group className="mb-3">
// //               <Form.Label>Registration Date</Form.Label>
// //               <Form.Control 
// //                 type="text" 
// //                 value={new Date(vendor.createdOn).toLocaleDateString()} 
// //                 readOnly 
// //               />
// //             </Form.Group>
// //           </Form>
// //         </Card.Body>
// //       </Card>

// //       <div className="d-flex gap-2 justify-content-end">
// //         <Button variant="success" onClick={handleApprove}>
// //           Approve
// //         </Button>
// //         <Button variant="danger" onClick={handleReject}>
// //           Reject
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default VendorReviewForm;


// // import axios from 'axios';
// // import { Form, Button, Card } from 'react-bootstrap';

// // const VendorReviewForm = ({ vendor }) => {
// //   const handleApprove = async () => {
// //     try {
// //       const response = await axios.put(`http://localhost:8080/vendors/${vendor.id}/status?status=APPROVED`);
// //       console.log('Vendor approved:', response.data);
// //     } catch (error) {
// //       console.error('Error approving vendor:', error);
// //     }
// //   };

// //   const handleReject = async () => {
// //     try {
// //       const response = await axios.post('/api/vendors/reject', { vendorId: vendor.id });
// //       console.log('Vendor rejected:', response.data);
// //     } catch (error) {
// //       console.error('Error rejecting vendor:', error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <Card className="mb-4">
// //         <Card.Body>
// //           <Card.Title>Company Information</Card.Title>
// //           <Form>
// //             <Form.Group className="mb-3">
// //               <Form.Label>Company Name</Form.Label>
// //               <Form.Control type="text" value={vendor.companyName} readOnly />
// //             </Form.Group>
// //             <Form.Group className="mb-3">
// //               <Form.Label>Company Owner Name</Form.Label>
// //               <Form.Control type="text" value={vendor.companyOwnerName} readOnly />
// //             </Form.Group>
// //             <Form.Group className="mb-3">
// //               <Form.Label>Email</Form.Label>
// //               <Form.Control type="email" value={vendor.email} readOnly />
// //             </Form.Group>
// //             <Form.Group className="mb-3">
// //               <Form.Label>Phone</Form.Label>
// //               <Form.Control type="text" value={vendor.phone} readOnly />
// //             </Form.Group>
// //             <Form.Group className="mb-3">
// //               <Form.Label>GSTIN</Form.Label>
// //               <Form.Control type="text" value={vendor.gstin} readOnly />
// //             </Form.Group>
// //             <Form.Group className="mb-3">
// //               <Form.Label>PAN Number</Form.Label>
// //               <Form.Control type="text" value={vendor.panNumber} readOnly />
// //             </Form.Group>
// //             <Form.Group className="mb-3">
// //               <Form.Label>Aadhar Number</Form.Label>
// //               <Form.Control type="text" value={vendor.ownerAadharNumber} readOnly />
// //             </Form.Group>
// //             <Form.Group className="mb-3">
// //               <Form.Label>City</Form.Label>
// //               <Form.Control type="text" value={vendor.city} readOnly />
// //             </Form.Group>
// //             <Form.Group className="mb-3">
// //               <Form.Label>Registration Date</Form.Label>
// //               <Form.Control 
// //                 type="text" 
// //                 value={new Date(vendor.createdOn).toLocaleDateString()} 
// //                 readOnly 
// //               />
// //             </Form.Group>
// //           </Form>
// //         </Card.Body>
// //       </Card>

// //       <div className="d-flex gap-2 justify-content-end">
// //         <Button variant="success" onClick={handleApprove}>
// //           Approve
// //         </Button>
// //         <Button variant="danger" onClick={handleReject}>
// //           Reject
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default VendorReviewForm;

// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Form, Button, Card } from 'react-bootstrap';
// import { useEffect } from 'react';
// import axios from 'axios';

// //toast.configure();

// // useEffect(() => {
// //   toast.configure();
// // }, []);



// const VendorReviewForm = ({ vendor, onClose }) => {
//   console.log('Vendor:', vendor);
//   const handleApprove = async () => {
//     try {
//       const response = await axios.patch(`http://localhost:5205/api/Vendor/${vendor.id}/status?status=APPROVED`);
//       console.log('Vendor approved:', response.data);
//       toast.success('Vendor approved successfully');
//       //onClose();
//       window.location.reload();
//     } catch (error) {
//       console.error('Error approving vendor:', error);
//       toast.error('Error approving vendor');
//     }
//   };

//   // const handleApprove = async () => {
//   //   try {
//   //     const response = await axios.patch(`http://localhost:5205/api/Vendor/${vendor.id}/status?status=APPROVED`);
//   //     console.log('Vendor approved:', response.data);
//   //     toast.success('Vendor approved successfully');
//   //     window.location.reload();
//   //   } catch (error) {
//   //     console.error('Error approving vendor:', error);
//   //     toast.error('Error approving vendor');
//   //   }
//   // };

//   const handleReject = async () => {
//     try {
//       const response = await axios.patch(`http://localhost:5205/api/Vendor/${vendor.id}/status?status=APPROVED`);
//       console.log('Vendor rejected:', response.data);
//       toast.success('Vendor rejected successfully');
//       onClose();
//     } catch (error) {
//       console.error('Error rejecting vendor:', error);
//       toast.error('Error rejecting vendor');
//     }
//   };

//   return (
//     <div>
//       <Card className="mb-4">
//         <Card.Body>
//           <Card.Title>Company Information</Card.Title>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Company Name</Form.Label>
//               <Form.Control type="text" value={vendor.companyName} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Company Owner Name</Form.Label>
//               <Form.Control type="text" value={vendor.companyOwnerName} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" value={vendor.email} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Phone</Form.Label>
//               <Form.Control type="text" value={vendor.phone} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>GSTIN</Form.Label>
//               <Form.Control type="text" value={vendor.gstin} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>PAN Number</Form.Label>
//               <Form.Control type="text" value={vendor.panNumber} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Aadhar Number</Form.Label>
//               <Form.Control type="text" value={vendor.ownerAadharNumber} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>City</Form.Label>
//               <Form.Control type="text" value={vendor.city} readOnly />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Registration Date</Form.Label>
//               <Form.Control 
//                 type="text" 
//                 value={new Date(vendor.createdAt).toLocaleDateString()} 
//                 readOnly 
//               />
//             </Form.Group>
//           </Form>
//         </Card.Body>
//       </Card>

//       <div className="d-flex gap-2 justify-content-end">
//         <Button variant="success" onClick={handleApprove}>
//           Approve
//         </Button>
//         <Button variant="danger" onClick={handleReject}>
//           Reject
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default VendorReviewForm;




import React, { useState } from 'react';
import { Modal, Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const VendorReviewForm = ({ vendor, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState('');
  const [action, setAction] = useState('');

  const handleShowModal = (actionType) => {
    setAction(actionType);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setComment('');
  };

  const handleSubmit = async () => {
    try {

     // console.log('in admin module approve reject Venodr',action, comment, vendor.id);
      const url = `http://localhost:8080/vendors/${vendor.id}/status?status=${action}&comment=${comment}`;
      const response = await axios.patch(url);
      console.log(`Vendor ${action.toLowerCase()}:`, response.data);
      toast.success(`Vendor ${action.toLowerCase()} successfully`);
      window.location.reload();
    } catch (error) {
      console.error(`Error ${action.toLowerCase()} vendor:`, error);
      toast.error(`Error ${action.toLowerCase()} vendor`);
    }
    handleCloseModal();
  };

  return (
    <div>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Company Information</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" value={vendor.companyName} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company Owner Name</Form.Label>
              <Form.Control type="text" value={vendor.companyOwnerName} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={vendor.email} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" value={vendor.phone} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>GSTIN</Form.Label>
              <Form.Control type="text" value={vendor.gstin} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>PAN Number</Form.Label>
              <Form.Control type="text" value={vendor.panNumber} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Aadhar Number</Form.Label>
              <Form.Control type="text" value={vendor.ownerAadharNumber} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" value={vendor.city} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Registration Date</Form.Label>
              <Form.Control 
                type="text" 
                value={new Date(vendor.createdAt).toLocaleDateString()} 
                readOnly 
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      <div className="d-flex gap-2 justify-content-end">
        <Button variant="success" onClick={() => handleShowModal('APPROVED')}>
          Approve
        </Button>
        <Button variant="danger" onClick={() => handleShowModal('REJECTED')}>
          Reject
        </Button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{action === 'APPROVED' ? 'APPROVED' : 'REJECTED'} Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VendorReviewForm;