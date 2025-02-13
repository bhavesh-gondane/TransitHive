import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const SuccessPage = () => {
  const location = useLocation();
  const [transactionId, setTransactionId] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const hasRunRef = useRef(false);

  useEffect(() => {
    
    if (hasRunRef.current) return;  // If already run, exit early

    hasRunRef.current = true;

    // Get the session ID from query parameters
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('session_id');
    const bookingId1 = queryParams.get("booking_id");

    if (sessionId) {
      console.log("session id 1",sessionId);
      // Make a request to your backend to retrieve payment details or transaction info
      fetch(`http://localhost:5205/api/checkout/verify-payment?sessionId=${sessionId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data is ", data)
        if (data.transactionId) {
          setTransactionId(data.transactionId);

          console.log("booking is",bookingId1)
          // Sending payment info to your backend
          axios.post('http://localhost:5205/api/Payments', {
            
            id: data.bookingId, // Assuming you get this from the backend response
            transactionId: data.transactionId,
            userId: user.id,
            bookingId: bookingId1,
            amount: data.amountTotal/100,
            paymentMethod: 'Card',
            paymentDate: new Date().toISOString(),
          })
          .then(() => {
            console.log('Payment info saved successfully');
          })
          .catch(error => {
            console.error('Error saving payment info:', error);
          });






        } else {
          setError('Transaction not found.');
        }
      })
      .catch((err) => {
        setError('Error retrieving transaction details.');
        console.error('Error:', err);
      });

    } else {
      setError('Session ID not found.');
    }
  }, [location, user]);

  return (
    <div>
      <Navbar hideLinks={true} />
    <div className="container" style={{position:"relative", top:"20px"}}>
      <h2 style={{ fontSize: '32px', textDecorationLine:"underline" }}><strong>Payment Successful</strong></h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div style={{paddingLeft:"100px"}} >
          <br />
          <p style={{ fontSize: '24px', fontFamily:"cursive" }}><strong style={{textDecorationLine:"underline"}} >Transaction ID:</strong> {transactionId} </p>
          <br />
          <p style={{ fontSize: '24px', fontFamily:"cursive" }}>Thank you for your payment!Welcoming Your new Booking in <strong>TRANSITHIVE!!</strong></p>
        </div>
      )}
    </div>
    </div>
  );
};

export default SuccessPage;
