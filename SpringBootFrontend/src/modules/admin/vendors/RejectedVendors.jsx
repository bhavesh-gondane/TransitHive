import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import VendorProfileApprove from './VendorProfileApprove';

const RejectedVendors = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [rejectedVendors, setRejectedVendors] = useState([]);

    useEffect(() => {
        const fetchRejectedVendors = async () => {
            try {
                const response = await axios.get('http://localhost:8080/vendors/status/REJECTED');
                setRejectedVendors(response.data);
            } catch (error) {
                console.error('Error fetching rejected vendors:', error);
            }
        };

        fetchRejectedVendors();
    }, []);

    const handleView = (vendor) => {
        setSelectedVendor(vendor);
        setShowModal(true);
    };

    const handleReactivate = async (vendorId) => {
        try {
            console.log('Vendor ID:', vendorId);
            const response = await axios.patch(`http://localhost:8080/vendors/${vendorId}/status?status=APPROVED&comment=APPROVED`);
            console.log('Vendor APPROVED:', response.data);
            toast.success('Vendor APPROVED successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error APPROVED vendor:', error);
            toast.error('Error APPROVED vendor');
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
                    {rejectedVendors.map((vendor) => (
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
                                       Approve
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
                    {selectedVendor && <VendorProfileApprove vendor={selectedVendor} />}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default RejectedVendors;