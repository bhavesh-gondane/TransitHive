import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { LoadScript } from '@react-google-maps/api';
import ItemRow from './components/ItemRow';
import CostSummary from './components/CostSummary';
import LocationBox from './components/LocationBox';
import { useGoogleMaps } from './hooks/useGoogleMaps';
import { calculateTotalCost } from './utils/calculateCost';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import NavbarForBookForm from '../../components/NavbarForBookForm';

const libraries = ['places'];


//console.log("in booking form data check user",user)
function BookingForm({ initialData, onSubmit }) {
  const navigate = useNavigate();
  const { user } = useAuth();
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

  const [routeLocations, setRouteLocations] = useState({
    pickup: null,
    drop: null
  });

  const {
    directions,
    distance,
    duration,
    error,
    loading,
    calculateRoute
  } = useGoogleMaps();

  const [cost, setTotalCost] = useState(0);

  useEffect(() => {
    if (routeLocations.pickup && routeLocations.drop) {
      calculateRoute(routeLocations.pickup, routeLocations.drop);
    }
  }, [routeLocations, calculateRoute]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      distance: distance
    }));
  }, [distance]);

  useEffect(() => {
    setTotalCost(calculateTotalCost({ ...formData, distance }));
  }, [formData, distance]);

  const handlePickupSelect = (location) => {
    setRouteLocations(prev => ({
      ...prev,
      pickup: location
    }));
    setFormData(prev => ({
      ...prev,
      pickupLocation: location.address
    }));
  };



  const handleDropSelect = (location) => {
    setRouteLocations(prev => ({
      ...prev,
      drop: location
    }));
    setFormData(prev => ({
      ...prev,
      dropLocation: location.address
    }));
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', quantity: 1, basePrice: 0 }]
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData({ ...formData, items: newItems });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/bookings', {
        ...formData,
        cost
      });
      alert('Booking created successfully!');
      setTimeout(() => {
        navigate('/dashboard/user');
      }, 2000);
      setFormData({
        userId: '',
        name: '',
        mobile: '',
        email: '',
        city: '',
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
      setRouteLocations({ pickup: null, drop: null });
    } catch (error) {
      alert('Error creating booking');
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const bookingData = {
  //       ...formData,
  //       cost
  //     };

  //     await onSubmit(bookingData);
  //     navigate('/customer/bookings');
  //   } catch (error) {
  //     console.error('Error creating booking:', error);
  //   }
  // };
  const date1 = new Date();
  date1.setDate(date1.getDate() + 1);
  const currentDate = date1.toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 15);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDnbCLV_Mj1V2K_NYu_Y20BKg-W6zYDpZQ"
      libraries={libraries}
    >
      <NavbarForBookForm hideLinks={true} />
      <div className="container mt-4 mb-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
              <div className="row g-3">
                {/* <div className="col-12 col-md-6">
                  <label className="form-label">userId</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  />
                </div> */}
                <div className="col-12 col-md-6">
                  <label className="form-label">userId</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    readOnly
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    readOnly
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">Mobile</label>
                  <input
                    type="tel"
                    className="form-control"
                    required
                    pattern="[0-9]{10}"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    readOnly
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                {/* <div className="col-12 col-md-6">
                  <label className="form-label">Date of Moving</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    value={formData.moveDate}
                    onChange={(e) => setFormData({ ...formData, moveDate: e.target.value })}
                  />
                </div> */}

                <div className="col-12 col-md-6">
                  <label className="form-label">Date of Moving</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    value={formData.moveDate}
                    min={currentDate}
                    max={maxDateString}
                    onChange={(e) => setFormData({ ...formData, moveDate: e.target.value })}
                  />
                </div>
              </div>

              <LocationBox
                formData={formData}
                onPickupSelect={handlePickupSelect}
                onDropSelect={handleDropSelect}
                directions={directions}
                distance={distance}
                duration={duration}
                loading={loading}
                error={error}
              />

              <div className="row g-3">
                <div className="col-12 col-sm-6 col-md-3">
                  <label className="form-label">Lift at Pickup</label>
                  <select
                    className="form-select"
                    value={formData.pickupLift}
                    onChange={(e) => setFormData({ ...formData, pickupLift: e.target.value })}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {formData.pickupLift === 'No' && (
                  <div className="col-12 col-sm-6 col-md-3">
                    <label className="form-label">Pickup Floors</label>
                    <input
                      type="number"
                      className="form-control"
                      required
                      value={formData.pickupFloors}
                      onChange={(e) => setFormData({ ...formData, pickupFloors: parseInt(e.target.value) || 0 })}
                    />
                    <small className="text-muted">Note: Rs. 100 per floor charge applies.</small>
                  </div>
                )}

                <div className="col-12 col-sm-6 col-md-3">
                  <label className="form-label">Lift at Drop</label>
                  <select
                    className="form-select"
                    value={formData.dropLift}
                    onChange={(e) => setFormData({ ...formData, dropLift: e.target.value })}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {formData.dropLift === 'No' && (
                  <div className="col-12 col-sm-6 col-md-3">
                    <label className="form-label">Drop Floors</label>

                    <input
                      type="number"
                      className="form-control"
                      required
                      value={formData.dropFloors}
                      onChange={(e) => setFormData({ ...formData, dropFloors: parseInt(e.target.value) || 0 })}
                    />
                    <small className="text-muted">Note: ₹100 per floor charge applies.</small>
                  </div>
                )}
              </div>

              <h4 className="mt-4 mb-3">Items</h4>
              {formData.items.map((item, index) => (
                <ItemRow
                  key={index}
                  item={item}
                  index={index}
                  updateItem={updateItem}
                  removeItem={removeItem}
                  isLastItem={formData.items.length === 1}
                  selectedItems={formData.items}
                />
              ))}

              <button type="button" className="btn btn-secondary mb-4" onClick={addItem}>
                Add Item
              </button>

              <div className="row">
                <div className="col-12 col-md-6">
                  <label className="form-label">Packaging Type</label>
                  <select
                    className="form-select"
                    value={formData.packagingType}
                    onChange={(e) => setFormData({ ...formData, packagingType: e.target.value })}
                  >
                    <option value="Single-Layered">Single-Layered</option>
                    <option value="Double-Layered">Double-Layered</option>
                    <option value="Wooden">Wooden</option>
                  </select>
                  {formData.packagingType === 'Double-Layered' && (
                    <div className="row">
                      <div className="col-12">
                        <small className="text-muted">Note: Double-Layered packaging costs an additional 0.1% of the total item cost.</small>
                      </div>
                    </div>
                  )}
                  {formData.packagingType === 'Wooden' && (
                    <div className="row">
                      <div className="col-12">
                        <small className="text-muted">Note: Wooden packaging costs an additional 0.25% of the total item cost.</small>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <CostSummary formData={formData} cost={cost} />

              <div className="mt-4">
                <button type="submit" className="btn btn-primary">Submit Booking</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LoadScript>
  );
}

export default BookingForm;













