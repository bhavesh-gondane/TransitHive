// import React, { useState } from 'react';
// import { Table, Button, Modal } from 'react-bootstrap';
// import VendorProfile from './VendorProfile';

// const ActiveVendors = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedVendor, setSelectedVendor] = useState(null);

//   // Mock data - replace with actual API call
//   const activeVendors = [
//     {
//       vendor_id: 1,
//       company_name: 'Prime Movers',
//       email: 'prime@example.com',
//       phone: '1234567890',
//       gstin: 'GST987654321',
//       company_owner_name: 'Jane Smith',
//       owner_aadhar_number: '987654321098',
//       pan_number: 'ZYXWV9876G',
//       address: '456 Business Ave, City, State',
//       created_at: '2024-01-01',
//       approved: true
//     }
//   ];

//   const handleView = (vendor) => {
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
//             <th>Registration Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {activeVendors.map((vendor) => (
//             <tr key={vendor.vendor_id}>
//               <td>{vendor.vendor_id}</td>
//               <td>{vendor.company_name}</td>
//               <td>{vendor.company_owner_name}</td>
//               <td>{vendor.email}</td>
//               <td>{vendor.phone}</td>
//               <td>{vendor.gstin}</td>
//               <td>{new Date(vendor.created_at).toLocaleDateString()}</td>
//               <td>
//                 <Button variant="info" size="sm" onClick={() => handleView(vendor)}>
//                   View
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Vendor Profile</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedVendor && <VendorProfile vendor={selectedVendor} />}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default ActiveVendors;





import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import VendorProfile from './VendorProfile';
import axios from 'axios';

const ActiveVendors = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [activeVendors, setActiveVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`http://localhost:5205/api/Vendor/status/APPROVED`);
        console.log('Active vendors:', response.data);
        setActiveVendors(response.data);
      } catch (error) {
        console.error('Error fetching active vendors:', error);
      }
    };

    fetchVendors();
  }, []);

  const handleView = (vendor) => {
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
            <th>Registration Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activeVendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.id}</td>
              <td>{vendor.companyName}</td>
              <td>{vendor.companyOwnerName}</td>
              <td>{vendor.email}</td>
              <td>{vendor.phone}</td>
              <td>{vendor.gstin}</td>
              <td>{new Date(vendor.createdAt).toLocaleDateString()}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleView(vendor)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Vendor Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVendor && <VendorProfile vendor={selectedVendor} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ActiveVendors;