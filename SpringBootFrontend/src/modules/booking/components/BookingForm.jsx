import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import ItemRow from './ItemRow';
import CostSummary from './CostSummary';
import LocationBox from './LocationBox';
import { useGoogleMaps } from '../hooks/useGoogleMaps';
import { calculateTotalCost } from '../utils/calculateCost';

function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = location.state?.mode === 'edit';
  const existingBooking = location.state?.bookingData;

  const [formData, setFormData] = useState({
    userId: user?.id || '',
    name: user?.username || '',
    mobile: user?.mobile || '',
    email: user?.email || '',
    city: user?.city || '',
    moveDate: '',
    pickupLocation: '',
    dropLocation: '',
    pickupLift: 'No',
    pickupFloors: 0,
    dropLift: 'No',
    dropFloors: 0,
    items: [{ name: '', quantity: 1, basePrice: 0 }],
    packagingType: 'Single-Layered',
  });

  useEffect(() => {
    if (isEditMode && existingBooking) {
      setFormData({
        ...existingBooking,
        userId: user?.id,
        name: user?.username,
        email: user?.email
      });
    }
  }, [isEditMode, existingBooking, user]);

  const {
    directions,
    distance,
    duration,
    error: mapError,
    loading: mapLoading,
    calculateRoute
  } = useGoogleMaps();

  const [cost, setTotalCost] = useState(0);

  useEffect(() => {
    if (formData.pickupLocation && formData.dropLocation) {
      calculateRoute(
        { address: formData.pickupLocation },
        { address: formData.dropLocation }
      );
    }
  }, [formData.pickupLocation, formData.dropLocation, calculateRoute]);

  useEffect(() => {
    setTotalCost(calculateTotalCost({ ...formData, distance }));
  }, [formData, distance]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const endpoint = isEditMode 
        ? `http://localhost:8080/bookings/${existingBooking.id}`
        : 'http://localhost:8080/bookings';
      
      const method = isEditMode ? 'put' : 'post';
      
      await axios[method](endpoint, {
        ...formData,
        cost
      });

      setSuccess('Booking saved successfully!');
      setTimeout(() => {
        navigate('/dashboard/user');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/user');
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <h2 className="mb-4">{isEditMode ? 'Edit Booking' : 'New Booking'}</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
            {/* Form implementation remains the same as your existing code */}
            {/* Just add these buttons at the bottom */}
            <div className="mt-4 d-flex gap-3">
              <Button 
                type="submit" 
                variant="primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Booking' : 'Create Booking')}
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;