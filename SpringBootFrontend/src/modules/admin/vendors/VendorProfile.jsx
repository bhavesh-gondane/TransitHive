// import React from 'react';
// import { Card, ListGroup, Button } from 'react-bootstrap';

// const VendorProfile = ({ vendor }) => {
//   const handleEdit = () => {
//     // Implement edit functionality
//   };

  // const handleSuspend = () => {
  //   // Implement suspend functionality
  // };

//   return (
//     <div>
//       <Card className="mb-4">
//         <Card.Body>
//           <Card.Title>Company Details</Card.Title>
//           <ListGroup variant="flush">
//           <ListGroup.Item>
//               <strong>Vendor ID:</strong> {vendor.id}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Company Name:</strong> {vendor.companyName}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Company Owner:</strong> {vendor.companyOwnerName}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Email:</strong> {vendor.email}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Phone:</strong> {vendor.phone}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>GSTIN:</strong> {vendor.gstin}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>PAN Number:</strong> {vendor.panNumber}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Aadhar Number:</strong> {vendor.ownerAadharNumber}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>city:</strong> {vendor.city}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Registration Date:</strong>{' '}
//               {new Date(vendor.createdOn).toLocaleDateString()}
//             </ListGroup.Item>
//           </ListGroup>
//         </Card.Body>
//       </Card>

//       <div className="mt-3 d-flex gap-2">
//         <Button variant="primary" onClick={handleEdit}>
//           Edit Details
//         </Button>
//         <Button variant="warning" onClick={handleSuspend}>
//           Suspend Vendor
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default VendorProfile;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Card, ListGroup, Button } from 'react-bootstrap';

// const VendorProfile = ({ vendor }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({ ...vendor });

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axios.put(`/api/vendors/${vendor.id}`, formData);
//       console.log('Vendor updated:', response.data);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating vendor:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };


//   const handleSuspend = async () => {
//     try {
//       const response = await axios.patch(`http://localhost:5205/api/Vendor/${vendor.id}/status?status=SUSPENDED`);
//       console.log('Vendor Suspended:', response.data);
//       toast.success('Vendor Suspended successfully');
//       //onClose();
//     } catch (error) {
//       console.error('Error Suspend vendor:', error);
//       toast.error('Error Suspend vendor');
//     }
//   };

//   return (
//     <div>
//       <Card className="mb-4">
//         <Card.Body>
//           <Card.Title>Company Details</Card.Title>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <strong>Vendor ID:</strong> {vendor.id}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Company Name:</strong>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="companyName"
//                   value={formData.companyName}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 vendor.companyName
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Company Owner:</strong>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="companyOwnerName"
//                   value={formData.companyOwnerName}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 vendor.companyOwnerName
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Email:</strong>
//               {isEditing ? (
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 vendor.email
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Phone:</strong>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 vendor.phone
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>GSTIN:</strong>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="gstin"
//                   value={formData.gstin}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 vendor.gstin
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>PAN Number:</strong>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="panNumber"
//                   value={formData.panNumber}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 vendor.panNumber
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Aadhar Number:</strong>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="ownerAadharNumber"
//                   value={formData.ownerAadharNumber}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 vendor.ownerAadharNumber
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>City:</strong>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 vendor.city
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Registration Date:</strong>{' '}
//               {new Date(vendor.createdAt).toLocaleDateString()}
//             </ListGroup.Item>
//           </ListGroup>
//         </Card.Body>
//       </Card>

//       <div className="mt-3 d-flex gap-2">
//         {isEditing ? (
//           <Button variant="success" onClick={handleSave}>
//             Save Changes
//           </Button>
//         ) : (
//           <Button variant="primary" onClick={handleEdit}>
//             Edit Details
//           </Button>
//         )}
//         <Button variant="warning" onClick={handleSuspend}>
//           Suspend Vendor
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default VendorProfile;




// import React, { useState } from 'react';
// import axios from 'axios';
// import { Card, ListGroup, Button } from 'react-bootstrap';
// import { toast } from 'react-toastify';

// const VendorProfile = ({ vendor }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({ ...vendor });
//   const [errors, setErrors] = useState({});

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const validateField = (name, value) => {
//     switch (name) {
//       case 'companyName':
//         return !value ? 'Company name is required' : '';
//       case 'email':
//         return !value ? 'Email is required' : 
//                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? 
//                'Invalid email format' : '';
//       case 'phone':
//         return !value ? 'Phone number is required' :
//                !/^[0-9]{10}$/.test(value) ? 'Phone number must be 10 digits' : '';
//       case 'gstin':
//         return !value ? 'GSTIN is required' :
//                !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(value) ?
//                'Invalid GSTIN format' : '';
//       case 'companyOwnerName':
//         return !value ? 'Company owner name is required' : '';
//       case 'ownerAadharNumber':
//         return !value ? 'Owner Aadhar number is required' :
//                !/^(?!0{12})(?!1{12})\d{12}$/.test(value) ? 'Aadhar number must be 12 digits' : '';
//       case 'panNumber':
//         return !value ? 'PAN number is required' :
//                !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value) ? 'Invalid PAN number format' : '';
//       case 'city':
//         return !value ? 'City is required' : '';
//       default:
//         return '';
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     Object.keys(formData).forEach(key => {
//       const error = validateField(key, formData[key]);
//       if (error) newErrors[key] = error;
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSave = async () => {
//     if (!validateForm()) {
//       return;
//     }
//     try {
//       const response = await axios.put(`/api/vendors/${vendor.id}`, formData);
//       console.log('Vendor updated:', response.data);
//       setIsEditing(false);
//       toast.success('Vendor updated successfully');
//     } catch (error) {
//       console.error('Error updating vendor:', error);
//       toast.error('Failed to update vendor');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSuspend = async () => {
//     try {
//       const response = await axios.patch(`http://localhost:5205/api/Vendor/${vendor.id}/status?status=SUSPENDED&comment=${comment}`);
//       console.log('Vendor Suspended:', response.data);
//       toast.success('Vendor Suspended successfully');
//     } catch (error) {
//       console.error('Error Suspend vendor:', error);
//       toast.error('Error Suspend vendor');
//     }
//   };

//   return (
//     <div>
//       <Card className="mb-4">
//         <Card.Body>
//           <Card.Title>Company Details</Card.Title>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <strong>Vendor ID:</strong> {vendor.id}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Company Name:</strong>
//               {isEditing ? (
//                 <div>
//                   <input
//                     type="text"
//                     name="companyName"
//                     value={formData.companyName}
//                     onChange={handleChange}
//                   />
//                   {errors.companyName && <div className="text-danger">{errors.companyName}</div>}
//                 </div>
//               ) : (
//                 vendor.companyName
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Company Owner:</strong>
//               {isEditing ? (
//                 <div>
//                   <input
//                     type="text"
//                     name="companyOwnerName"
//                     value={formData.companyOwnerName}
//                     onChange={handleChange}
//                   />
//                   {errors.companyOwnerName && <div className="text-danger">{errors.companyOwnerName}</div>}
//                 </div>
//               ) : (
//                 vendor.companyOwnerName
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Email:</strong> {vendor.email}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Phone:</strong>
//               {isEditing ? (
//                 <div>
//                   <input
//                     type="text"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                   />
//                   {errors.phone && <div className="text-danger">{errors.phone}</div>}
//                 </div>
//               ) : (
//                 vendor.phone
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>GSTIN:</strong>
//               {isEditing ? (
//                 <div>
//                   <input
//                     type="text"
//                     name="gstin"
//                     value={formData.gstin}
//                     onChange={handleChange}
//                   />
//                   {errors.gstin && <div className="text-danger">{errors.gstin}</div>}
//                 </div>
//               ) : (
//                 vendor.gstin
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>PAN Number:</strong>
//               {isEditing ? (
//                 <div>
//                   <input
//                     type="text"
//                     name="panNumber"
//                     value={formData.panNumber}
//                     onChange={handleChange}
//                   />
//                   {errors.panNumber && <div className="text-danger">{errors.panNumber}</div>}
//                 </div>
//               ) : (
//                 vendor.panNumber
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Aadhar Number:</strong>
//               {isEditing ? (
//                 <div>
//                   <input
//                     type="text"
//                     name="ownerAadharNumber"
//                     value={formData.ownerAadharNumber}
//                     onChange={handleChange}
//                   />
//                   {errors.ownerAadharNumber && <div className="text-danger">{errors.ownerAadharNumber}</div>}
//                 </div>
//               ) : (
//                 vendor.ownerAadharNumber
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>City:</strong>
//               {isEditing ? (
//                 <div>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                   />
//                   {errors.city && <div className="text-danger">{errors.city}</div>}
//                 </div>
//               ) : (
//                 vendor.city
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Registration Date:</strong>{' '}
//               {new Date(vendor.createdAt).toLocaleDateString()}
//             </ListGroup.Item>
//           </ListGroup>
//         </Card.Body>
//       </Card>

//       <div className="mt-3 d-flex gap-2">
//         {isEditing ? (
//           <Button variant="success" onClick={handleSave}>
//             Save Changes
//           </Button>
//         ) : (
//           <Button variant="primary" onClick={handleEdit}>
//             Edit Details
//           </Button>
//         )}
//         <Button variant="warning" onClick={handleSuspend}>
//           Suspend Vendor
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default VendorProfile;



import React, { useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const VendorProfile = ({ vendor }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...vendor });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'companyName':
        return !value ? 'Company name is required' : '';
      case 'email':
        return !value ? 'Email is required' : 
               !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? 
               'Invalid email format' : '';
      case 'phone':
        return !value ? 'Phone number is required' :
               !/^[0-9]{10}$/.test(value) ? 'Phone number must be 10 digits' : '';
      case 'gstin':
        return !value ? 'GSTIN is required' :
               !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(value) ?
               'Invalid GSTIN format' : '';
      case 'companyOwnerName':
        return !value ? 'Company owner name is required' : '';
      case 'ownerAadharNumber':
        return !value ? 'Owner Aadhar number is required' :
               !/^(?!0{12})(?!1{12})\d{12}$/.test(value) ? 'Aadhar number must be 12 digits' : '';
      case 'panNumber':
        return !value ? 'PAN number is required' :
               !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value) ? 'Invalid PAN number format' : '';
      case 'city':
        return !value ? 'City is required' : '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      console.log('formData:', formData);
      console.log('Vendor ID:', vendor.id);
      const response = await axios.patch(`http://localhost:8080/vendors/${vendor.id}`, formData);
      console.log('Vendor updated:', response.data);
      setIsEditing(false);
      toast.success('Vendor updated successfully');
    } catch (error) {
      console.error('Error updating vendor:', error);
      toast.error('Failed to update vendor');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSuspend = async () => {
    try {
      const response = await axios.patch(`http://localhost:8080/vendors/${vendor.id}/status?status=SUSPENDED&comment=${comment}`);
      console.log('Vendor Suspended:', response.data);
      toast.success('Vendor Suspended successfully');
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error('Error Suspend vendor:', error);
      toast.error('Error Suspend vendor');
    }
  };

  return (
    <div>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Company Details</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Vendor ID:</strong> {vendor.id}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Company Name:</strong>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                  {errors.companyName && <div className="text-danger">{errors.companyName}</div>}
                </div>
              ) : (
                vendor.companyName
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Company Owner:</strong>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="companyOwnerName"
                    value={formData.companyOwnerName}
                    onChange={handleChange}
                  />
                  {errors.companyOwnerName && <div className="text-danger">{errors.companyOwnerName}</div>}
                </div>
              ) : (
                vendor.companyOwnerName
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong> {vendor.email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Phone:</strong>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <div className="text-danger">{errors.phone}</div>}
                </div>
              ) : (
                vendor.phone
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>GSTIN:</strong>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleChange}
                  />
                  {errors.gstin && <div className="text-danger">{errors.gstin}</div>}
                </div>
              ) : (
                vendor.gstin
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>PAN Number:</strong>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                  />
                  {errors.panNumber && <div className="text-danger">{errors.panNumber}</div>}
                </div>
              ) : (
                vendor.panNumber
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Aadhar Number:</strong>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="ownerAadharNumber"
                    value={formData.ownerAadharNumber}
                    onChange={handleChange}
                  />
                  {errors.ownerAadharNumber && <div className="text-danger">{errors.ownerAadharNumber}</div>}
                </div>
              ) : (
                vendor.ownerAadharNumber
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>City:</strong>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && <div className="text-danger">{errors.city}</div>}
                </div>
              ) : (
                vendor.city
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Registration Date:</strong>{' '}
              {new Date(vendor.createdAt).toLocaleDateString()}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <div className="mt-3 d-flex gap-2">
        {isEditing ? (
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        ) : (
          <Button variant="primary" onClick={handleEdit}>
            Edit Details
          </Button>
        )}
        <Button variant="warning" onClick={() => setShowModal(true)}>
          Suspend Vendor
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Suspend Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter comment"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSuspend}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VendorProfile;