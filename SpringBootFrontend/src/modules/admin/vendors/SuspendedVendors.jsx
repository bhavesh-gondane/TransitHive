// import React, { useState } from 'react';
// import { Table, Button, Modal } from 'react-bootstrap';
// import VendorProfile from './VendorProfile';

// const SuspendedVendors = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedVendor, setSelectedVendor] = useState(null);

//   // Mock data - replace with actual API call
//   const suspendedVendors = [
//     {
//       vendor_id: 1,
//       company_name: 'Fast Movers',
//       email: 'fast@example.com',
//       phone: '1234567890',
//       gstin: 'GST567890123',
//       company_owner_name: 'Mike Johnson',
//       owner_aadhar_number: '456789012345',
//       pan_number: 'MNOPQ4567H',
//       address: '789 Transport Road, City, State',
//       created_at: '2023-12-01',
//       approved: false
//     }
//   ];

//   const handleView = (vendor) => {
//     setSelectedVendor(vendor);
//     setShowModal(true);
//   };

//   const handleReactivate = (vendorId) => {
//     // Implement reactivation logic
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
//           {suspendedVendors.map((vendor) => (
//             <tr key={vendor.vendor_id}>
//               <td>{vendor.vendor_id}</td>
//               <td>{vendor.company_name}</td>
//               <td>{vendor.company_owner_name}</td>
//               <td>{vendor.email}</td>
//               <td>{vendor.phone}</td>
//               <td>{vendor.gstin}</td>
//               <td>{new Date(vendor.created_at).toLocaleDateString()}</td>
//               <td>
//                 <div className="d-flex gap-2">
//                   <Button variant="info" size="sm" onClick={() => handleView(vendor)}>
//                     View
//                   </Button>
//                   <Button variant="success" size="sm" onClick={() => handleReactivate(vendor.vendor_id)}>
//                     Reactivate
//                   </Button>
//                 </div>
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

// export default SuspendedVendors;


import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import VendorProfile from './VendorProfile';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SuspendedVendors = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [suspendedVendors, setSuspendedVendors] = useState([]);

  useEffect(() => {
    const fetchSuspendedVendors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/vendors/status/SUSPENDED');
        setSuspendedVendors(response.data);
      } catch (error) {
        console.error('Error fetching suspended vendors:', error);
      }
    };

    fetchSuspendedVendors();
  }, []);

  const handleView = (vendor) => {
    setSelectedVendor(vendor);
    setShowModal(true);
  };

  // const handleReactivate = async (vendorId) => {
  //   try {
  //     await axios.post(`/api/reactivate-vendor/${vendorId}`);
  //     setSuspendedVendors((prevVendors) =>
  //       prevVendors.filter((vendor) => vendor.id !== vendorId)
  //     );
  //   } catch (error) {
  //     console.error('Error reactivating vendor:', error);
  //   }
  // };

  const handleReactivate = async (vendorId) => {
    try {
      const response = await axios.patch(`http://localhost:8080/vendors/${vendorId}/status?status=APPROVED&comment=APPROVED`);
      console.log('Vendor Reactivate:', response.data);
      toast.success('Vendor Reactivate successfully');
      //onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error Reactivate vendor:', error);
      toast.error('Error Reactivate vendor');
    }
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
          {suspendedVendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.id}</td>
              <td>{vendor.companyName}</td>
              <td>{vendor.companyOwnerName}</td>
              <td>{vendor.email}</td>
              <td>{vendor.phone}</td>
              <td>{vendor.gstin}</td>
              <td>{new Date(vendor.createdOn).toLocaleDateString()}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button variant="info" size="sm" onClick={() => handleView(vendor)}>
                    View
                  </Button>
                  <Button variant="success" size="sm" onClick={() => handleReactivate(vendor.id)}>
                    Reactivate
                  </Button>
                </div>
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

export default SuspendedVendors;