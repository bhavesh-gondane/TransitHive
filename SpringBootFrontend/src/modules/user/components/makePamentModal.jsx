import { useState } from 'react';
import { Modal, Form, DropdownButton, Dropdown } from 'react-bootstrap';

function makePaymentModal({ handleClose, booking }) {
  const [paymentType, setPaymentType] = useState('');

  const handlePayment = () => {
    // Handle payment logic here
    console.log('Payment made with:', paymentType);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Make Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Booking ID</Form.Label>
            <Form.Control type="text" value={booking.id} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>User ID</Form.Label>
            <Form.Control type="text" value={booking.userId} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>Vendor ID</Form.Label>
            <Form.Control type="text" value={booking.vendorId} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control type="text" value={booking.amount} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>Payment Type</Form.Label>
            <DropdownButton
              title={paymentType || 'Select Payment Type'}
              onSelect={(e) => setPaymentType(e)}
            >
              <Dropdown.Item eventKey="UPI">UPI</Dropdown.Item>
              <Dropdown.Item eventKey="Banking">Banking</Dropdown.Item>
              <Dropdown.Item eventKey="Credit/Debit">Credit/Debit</Dropdown.Item>
            </DropdownButton>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePayment} disabled={!paymentType}>
          Make Payment
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default makePaymentModal;

// function MyBookings({ onViewDetails, onUpdateStatus, onMakePayment }) {
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);

  

//   return (
//     <div>
//       {/* Existing code */}
//       {selectedBooking && (
//         <PaymentModal
//           show={showPaymentModal}
//           handleClose={handleClosePaymentModal}
//           booking={selectedBooking}
//         />
//       )}
//     </div>
//   );
// }