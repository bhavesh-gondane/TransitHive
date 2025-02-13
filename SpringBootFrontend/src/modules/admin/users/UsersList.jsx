import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import UserDetails from './UserDetails';
import UserBookings from './UserBookings';

import axios from 'axios';

const UsersList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersList = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users`);
        console.log("in users list response", response);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsersList();
  }, []);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Users Management</h2>
        <div className="d-flex" style={{ maxWidth: '300px' }}>
          <InputGroup>
            <Form.Control
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </div>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Registration Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{new Date(user.createdOn).toLocaleDateString()}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleViewUser(user)}>
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <UserDetails user={selectedUser} />
              <UserBookings userId={selectedUser.id} />
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UsersList;