// import React, { useState, useEffect } from 'react';
// import { Modal, Form, Button } from 'react-bootstrap';

// const StatusUpdateModal = ({ booking, onUpdate, onClose }) => {
//   const [status, setStatus] = useState(booking.status);
//   const [cost, setCost] = useState(booking.cost || '');
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!status) newErrors.status = 'Status is required';
//     if (cost === '') newErrors.cost = 'Cost is required';
//     if (cost < 0) newErrors.cost = 'Cost cannot be negative';
//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = validateForm();
    
//     if (Object.keys(newErrors).length === 0) {
//       onUpdate(booking.id, status, parseFloat(cost));
//     } else {
//       setErrors(newErrors);
//     }
//   };

//   return (
//     <Modal show={true} onHide={onClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Update Booking #{booking.id}</Modal.Title>
//       </Modal.Header>
//       <Form onSubmit={handleSubmit}>
//         <Modal.Body>
//           <Form.Group className="mb-3">
//             <Form.Label>Status</Form.Label>
//             <Form.Select
//               value={status}
//               onChange={(e) => {
//                 setStatus(e.target.value);
//                 setErrors({ ...errors, status: null });
//               }}
//               isInvalid={!!errors.status}
//             >
//               <option value="">Select Status</option>
//               <option value="pending">Pending</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">
//               {errors.status}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Cost ($)</Form.Label>
//             <Form.Control
//               type="number"
//               value={cost}
//               onChange={(e) => {
//                 setCost(e.target.value);
//                 setErrors({ ...errors, cost: null });
//               }}
//               step="0.01"
//               min="0"
//               isInvalid={!!errors.cost}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.cost}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button variant="primary" type="submit">
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Form>
//     </Modal>
//   );
// };

// export default StatusUpdateModal;





import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const StatusUpdateModal = ({ booking, onUpdate, onClose }) => {
  const [status, setStatus] = useState(booking.status);
  const [cost, setCost] = useState(booking.cost || '');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!status) newErrors.status = 'Status is required';
    if (cost === '') newErrors.cost = 'Cost is required';
    if (cost < 0) newErrors.cost = 'Cost cannot be negative';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      onUpdate(booking.id, status, parseFloat(cost));
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Booking #{booking.id}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setErrors({ ...errors, status: null });
              }}
              isInvalid={!!errors.status}
            >
              <option value="">Select Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.status}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cost ($)</Form.Label>
            <Form.Control
              type="number"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
                setErrors({ ...errors, cost: null });
              }}
              step="0.01"
              min="0"
              isInvalid={!!errors.cost}
            />
            <Form.Control.Feedback type="invalid">
              {errors.cost}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default StatusUpdateModal;