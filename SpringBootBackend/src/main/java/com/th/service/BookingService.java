package com.th.service;

import java.math.BigDecimal;
import java.util.List;

import com.th.dto.BookingDTO;
import com.th.entity.Booking;
import com.th.entity.Booking.PaymentM;

public interface BookingService {
    BookingDTO getBookingById(Long id);
    BookingDTO saveBooking(BookingDTO bookingDTO);
    BookingDTO updateBookingStatus(Long id, Booking.Status status);
    List<BookingDTO> getAllBookings();
    BookingDTO assignVendorToBooking(Long bookingId, Long vendorId);
    List<BookingDTO> getBookingsByCityAndStatus(String city, Booking.Status status);
    List<BookingDTO> getBookingsByUserId(Long userId);
    BookingDTO updateBookingStatusAndCost(Long id, Booking.Status status, BigDecimal cost);
    List<BookingDTO> getBookingsByVendorId(Long vendorId);
    BookingDTO updateBooking(Long id, BookingDTO bookingDTO);
    
    Booking setPaymentMethod(Long id, PaymentM paymentMethod);
    
    boolean markAsReviewd(Long id);
    
    boolean markAsPaid(Long id);
    
    BigDecimal getTotalCostForCompletedAndPaidBookings();
    
    Long totalBookingCount();
}
