// import React, { useState } from 'react';
// import { Card, Button, ListGroup, Form, Modal } from 'react-bootstrap';
// import { toast } from 'react-toastify';

// const UserDetails = ({ user }) => {
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editedUser, setEditedUser] = useState(user);

//   const handleEditUser = () => {
//     setShowEditModal(true);
//   };

//   const handleSaveEdit = () => {
//     // Implement API call to save changes
//     toast.success('User details updated successfully');
//     setShowEditModal(false);
//   };

//   const handleDeleteUser = () => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       // Implement delete API call
//       toast.success('User deleted successfully');
//     }
//   };

//   // const handleSuspendUser = () => {
//   //   if (window.confirm('Are you sure you want to suspend this user?')) {
//   //     // Implement suspend API call
//   //     toast.success('User account suspended successfully');
//   //   }
//   // };

//   return (
//     <>
//       <Card className="mb-4">
//         <Card.Body>
//           <Card.Title>Profile Information</Card.Title>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <strong>Name:</strong> {user.name}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Email:</strong> {user.email}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Phone:</strong> {user.phone}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>City:</strong> {user.city}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <strong>Registration Date:</strong>{' '}
//               {new Date(user.createdAt).toLocaleDateString()}
//             </ListGroup.Item>
//           </ListGroup>
//         </Card.Body>
//       </Card>

//       <div className="d-flex gap-2 flex-wrap">
//         <Button variant="primary" onClick={handleEditUser}>
//           Edit User
//         </Button>
//         <Button variant="danger" onClick={handleDeleteUser}>
//           Delete User
//         </Button>
//       </div>

//       <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit User Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={editedUser.name}
//                 onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={editedUser.email}
//                 onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Phone</Form.Label>
//               <Form.Control
//                 type="tel"
//                 value={editedUser.phone}
//                 onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>City</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={editedUser.city}
//                 onChange={(e) => setEditedUser({ ...editedUser, city: e.target.value })}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSaveEdit}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default UserDetails;




import React, { useState } from 'react';
import { Card, Button, ListGroup, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

const UserDetails = ({ user }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditUser = () => {
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {      
      console.log("editedUser", editedUser);
      await axios.patch(`http://localhost:8080/users/${editedUser.id}`, editedUser);
      toast.success('User details updated successfully');
      setShowEditModal(false);
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update user details');
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        console.log("user id", user.id);
        await axios.delete(`http://localhost:5205/api/User/${user.id}`);
        toast.success('User deleted successfully');
        window.location.reload();

      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  return (
    <>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Profile Information</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Name:</strong> {user.name}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong> {user.email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Phone:</strong> {user.phone}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>City:</strong> {user.city}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Registration Date:</strong>{' '}
              {new Date(user.createdOn).toLocaleDateString()}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <div className="d-flex gap-2 flex-wrap">
        <Button variant="primary" onClick={handleEditUser}>
          Edit User
        </Button>
        <Button variant="danger" onClick={handleDeleteUser}>
          Delete User
        </Button>
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                value={editedUser.phone}
                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={editedUser.city}
                onChange={(e) => setEditedUser({ ...editedUser, city: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserDetails;