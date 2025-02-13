// import React, { useState } from 'react';
// import { Table, Button, Modal } from 'react-bootstrap';
// import VendorReviewForm from './VendorReviewForm';

// const PendingVendors = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedVendor, setSelectedVendor] = useState(null);

//   // Mock data - replace with actual API call
//   const pendingVendors = [
//     {
//       vendor_id: 1,
//       company_name: 'Express Movers',
//       email: 'express@example.com',
//       phone: '1234567890',
//       gstin: 'GST123456789',
//       company_owner_name: 'John Doe',
//       owner_aadhar_number: '123456789012',
//       pan_number: 'ABCDE1234F',
//       address: '123 Main St, City, State',
//       created_at: '2024-02-15',
//       approved: false
//     }
//   ];

//   const handleReview = (vendor) => {
//     setSelectedVendor(vendor);
//     setShowModal(true);
//   };

//   return (
//     <div>
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Company Name</th>
//             <th>Owner Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>GSTIN</th>
//             <th>Created At</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pendingVendors.map((vendor) => (
//             <tr key={vendor.vendor_id}>
//               <td>{vendor.vendor_id}</td>
//               <td>{vendor.company_name}</td>
//               <td>{vendor.company_owner_name}</td>
//               <td>{vendor.email}</td>
//               <td>{vendor.phone}</td>
//               <td>{vendor.gstin}</td>
//               <td>{new Date(vendor.created_at).toLocaleDateString()}</td>
//               <td>
//                 <Button variant="primary" size="sm" onClick={() => handleReview(vendor)}>
//                   Review
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Review Vendor Application</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedVendor && <VendorReviewForm vendor={selectedVendor} />}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default PendingVendors;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'react-bootstrap';
import VendorReviewForm from './VendorReviewForm';

const PendingVendors = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [pendingVendors, setPendingVendors] = useState([]);

  useEffect(() => {
    const fetchPendingVendors = async () => {
      try {
        const response = await axios.get(`http://localhost:5205/api/Vendor/status/PENDING`);
        setPendingVendors(response.data);
      } catch (error) {
        console.error('Error fetching pending vendors:', error);
      }
    };

    fetchPendingVendors();
  }, []);

  const handleReview = (vendor) => {
    setSelectedVendor(vendor);
    setShowModal(true);
  };

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Owner Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>GSTIN</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingVendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.id}</td>
              <td>{vendor.companyName}</td>
              <td>{vendor.companyOwnerName}</td>
              <td>{vendor.email}</td>
              <td>{vendor.phone}</td>
              <td>{vendor.gstin}</td>
              <td>{new Date(vendor.createdAt).toLocaleDateString()}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleReview(vendor)}>
                  Review
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Review Vendor Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVendor && <VendorReviewForm vendor={selectedVendor} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PendingVendors;