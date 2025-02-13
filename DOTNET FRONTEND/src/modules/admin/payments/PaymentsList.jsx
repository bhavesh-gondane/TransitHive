import { useState, useEffect } from 'react';
import { Container, Table, Form, InputGroup, Badge, Card, Row, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

function PaymentsList() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAmount: 0,
    successfulPayments: 0,
    pendingPayments: 0,
    failedPayments: 0
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchPayments();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []); // Empty dependency array to set the polling when the component mounts

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5205/api/Payments'); // Make sure this matches the backend endpoint
      console.log("Fetched payments:", response.data);
      setPayments(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (paymentsData) => {
    const stats = paymentsData.reduce((acc, payment) => {
      acc.totalAmount += payment.amount;
      if (payment.status === 'SUCCESS') acc.successfulPayments++;
      if (payment.status === 'PENDING') acc.pendingPayments++;
      if (payment.status === 'FAILED') acc.failedPayments++;
      return acc;
    }, {
      totalAmount: 0,
      successfulPayments: 0,
      pendingPayments: 0,
      failedPayments: 0
    });
    setStats(stats);
  };

  const getStatusBadge = (status) => {
    const variants = {
      SUCCESS: 'success',
      FAILED: 'danger',
      PENDING: 'warning'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const filteredPayments = payments.filter(payment =>
    (payment.bookingId && payment.bookingId.toString().includes(searchTerm)) ||
    (payment.paymentMethod && payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Payments Management</h2>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="bg-primary text-white">
            <Card.Body>
              <h6>Total Revenue</h6>
              <h3>₹{stats.totalAmount.toFixed(2)}</h3>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col md={3}>
          <Card className="bg-success text-white">
            <Card.Body>
              <h6>Successful Payments</h6>
              <h3>{stats.successfulPayments}</h3>
            </Card.Body>
          </Card>
        </Col> */}
        {/* <Col md={3}>
          <Card className="bg-warning text-white">
            <Card.Body>
              <h6>Pending Payments</h6>
              <h3>{stats.pendingPayments}</h3>
            </Card.Body>
          </Card>
        </Col> */}
        {/* <Col md={3}>
          <Card className="bg-danger text-white">
            <Card.Body>
              <h6>Failed Payments</h6>
              <h3>{stats.failedPayments}</h3>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>

      <div className="mb-4">
        <InputGroup>
          <Form.Control
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
        </InputGroup>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Booking ID</th>
            <th>UserID</th>
            {/* <th>Vendor</th> */}
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Date</th>
            {/* <th>Status</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.bookingId}</td>
              <td>{payment.userId}</td>
              {/* <td>{payment.vendorId}</td> */}
              <td>₹{payment.amount.toFixed(2)}</td>
              <td>{payment.paymentMethod}</td>
              <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
              {/* <td>{getStatusBadge(payment.status)}</td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default PaymentsList;






// import { useState, useEffect } from 'react';
// import { Container, Table, Form, InputGroup, Badge, Card, Row, Col } from 'react-bootstrap';
// import { FaSearch } from 'react-icons/fa';
// import axios from 'axios';

// function PaymentsList() {
//   const [payments, setPayments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     totalAmount: 0,
//     successfulPayments: 0,
//     pendingPayments: 0,
//     failedPayments: 0
//   });

//   useEffect(() => {
//     fetchPayments();
//   }, []);

//   const fetchPayments = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/payments');
//       console.log("payment",response.data);
//       setPayments(response.data);
//       calculateStats(response.data);
//     } catch (error) {
//       console.error('Error fetching payments:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateStats = (paymentsData) => {
//     const stats = paymentsData.reduce((acc, payment) => {
//       acc.totalAmount += payment.amount;
//       if (payment.status === 'SUCCESS') acc.successfulPayments++;
//       if (payment.status === 'PENDING') acc.pendingPayments++;
//       if (payment.status === 'FAILED') acc.failedPayments++;
//       return acc;
//     }, {
//       totalAmount: 0,
//       successfulPayments: 0,
//       pendingPayments: 0,
//       failedPayments: 0
//     });
//     setStats(stats);
//   };

//   const getStatusBadge = (status) => {
//     const variants = {
//       SUCCESS: 'success',
//       FAILED: 'danger',
//       PENDING: 'warning'
//     };
//     return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
//   };

//   // const filteredPayments = payments.filter(payment =>
//   //   (payment.booking_id && payment.booking_id.toString().includes(searchTerm)) ||
//   //   payment.payment_method.toLowerCase().includes(searchTerm.toLowerCase())
//   // );

//   const filteredPayments = payments.filter(payment =>
//     (payment.bookingId && payment.bookingId.toString().includes(searchTerm)) ||
//     (payment.paymentMethod && payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Container fluid className="p-4">
//       <h2 className="mb-4">Payments Management</h2>

//       <Row className="mb-4">
//         <Col md={3}>
//           <Card className="bg-primary text-white">
//             <Card.Body>
//               <h6>Total Revenue</h6>
//               <h3>₹{stats.totalAmount.toFixed(2)}</h3>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="bg-success text-white">
//             <Card.Body>
//               <h6>Successful Payments</h6>
//               <h3>{stats.successfulPayments}</h3>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="bg-warning text-white">
//             <Card.Body>
//               <h6>Pending Payments</h6>
//               <h3>{stats.pendingPayments}</h3>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="bg-danger text-white">
//             <Card.Body>
//               <h6>Failed Payments</h6>
//               <h3>{stats.failedPayments}</h3>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <div className="mb-4">
//         <InputGroup>
//           <Form.Control
//             placeholder="Search payments..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <InputGroup.Text>
//             <FaSearch />
//           </InputGroup.Text>
//         </InputGroup>
//       </div>

//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>Payment ID</th>
//             <th>Booking ID</th>
//             <th>User</th>
//             <th>Vendor</th>
//             <th>Amount</th>
//             <th>Payment Method</th>
//             <th>Date</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredPayments.map(payment => (
//             console.log("payment11",payment),
//             <tr key={payment.id}>
//               <td>{payment.id}</td>
//               <td>{payment.bookingId}</td>
//               <td>{payment.userId}</td>
//               <td>{payment.vendorId}</td>
//               <td>₹{payment.amount.toFixed(2)}</td>
//               <td>{payment.paymentMethod}</td>
//               <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
//               <td>{getStatusBadge(payment.status)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// }

// export default PaymentsList;