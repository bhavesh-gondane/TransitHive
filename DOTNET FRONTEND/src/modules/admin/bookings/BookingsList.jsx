import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import BookingsTable from './BookingsTable';
import BookingDetailsModal from './BookingDetailsModal';
import StatusUpdateModal from './StatusUpdateModal';
import axios from 'axios';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [statusUpdateBooking, setStatusUpdateBooking] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5205/api/Booking/getAllBooking');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleViewDetails = async (bookingId) => {
    try {
      const response = await axios.get(`http://localhost:5205/api/Booking/${bookingId}`);
      setSelectedBooking(response.data);
    } catch (error) {
      console.error('Error fetching booking details:', error);
    }
  };

  const updateBooking = async (id, status, cost) => {
    try {
      console.log("in update booking",id,status,cost);
      await axios.patch(`http://localhost:5205/api/Booking/${id}/statusandcost?status=${status}&cost=${cost}`);
      fetchBookings();
      setStatusUpdateBooking(null);
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const filterBookingsByStatus = (status) => {
    if (status === 'all') return bookings;
    return bookings.filter(booking => booking.status === status);
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Bookings Management</h2>
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="all" title="All Bookings">
          <BookingsTable
            bookings={filterBookingsByStatus('all')}
            onViewDetails={handleViewDetails}
            onUpdateStatus={(booking) => setStatusUpdateBooking(booking)}
          />
        </Tab>
        <Tab eventKey="PENDING" title="PENDING">
          <BookingsTable
            bookings={filterBookingsByStatus('PENDING')}
            onViewDetails={handleViewDetails}
            onUpdateStatus={(booking) => setStatusUpdateBooking(booking)}
          />
        </Tab>
        <Tab eventKey="COMFIRMED" title="CONFIRMED">
          <BookingsTable
            bookings={filterBookingsByStatus('CONFIRMED')}
            onViewDetails={handleViewDetails}
            onUpdateStatus={(booking) => setStatusUpdateBooking(booking)}
          />
        </Tab>
        
        <Tab eventKey="ASSIGNED" title="ASSIGNED">
          <BookingsTable
            bookings={filterBookingsByStatus('ASSIGNED')}
            onViewDetails={handleViewDetails}
            onUpdateStatus={(booking) => setStatusUpdateBooking(booking)}
          />
        </Tab>


        <Tab eventKey="COMPLETED" title="COMPLETED">
          <BookingsTable
            bookings={filterBookingsByStatus('COMPLETED')}
            onViewDetails={handleViewDetails}
            onUpdateStatus={(booking) => setStatusUpdateBooking(booking)}
          />
        </Tab>
        <Tab eventKey="CANCELLED" title="CANCELLED">
          <BookingsTable
            bookings={filterBookingsByStatus('CANCELLED')}
            onViewDetails={handleViewDetails}
            onUpdateStatus={(booking) => setStatusUpdateBooking(booking)}
          />
        </Tab>
      </Tabs>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}

      {statusUpdateBooking && (
        <StatusUpdateModal
          booking={statusUpdateBooking}
          onUpdate={updateBooking}
          onClose={() => setStatusUpdateBooking(null)}
        />
      )}
    </Container>
  );
};

export default BookingsList;

