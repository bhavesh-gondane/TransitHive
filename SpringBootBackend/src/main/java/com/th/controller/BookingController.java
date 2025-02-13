//package com.th.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.th.dto.ApiResponse;
//import com.th.dto.BookingDTO;
//import com.th.entity.Booking;
//import com.th.service.BookingService;
//
//@RestController
//@RequestMapping("/bookings")
//@CrossOrigin(origins="http://localhost:5173/")
//public class BookingController {
//
//    @Autowired
//    private BookingService bookingService;
//
//    @GetMapping("/{id}")
//    public ResponseEntity<?> getBookingById(@PathVariable Long id) {
//        BookingDTO bookingDTO = bookingService.getBookingById(id);
//        if (bookingDTO == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Booking not found"));
//        }
//        return ResponseEntity.ok(bookingDTO);
//    }
//
//    @PostMapping
//    public ResponseEntity<ApiResponse> addBooking(@RequestBody BookingDTO bookingDTO) {
//    	System.out.println(bookingDTO);
//        BookingDTO newBooking = bookingService.saveBooking(bookingDTO);
//        return ResponseEntity.status(201).body(new ApiResponse("Booking created successfully"));
//    }
//
//    @PutMapping("/{id}/status")
//    public ResponseEntity<ApiResponse> updateBookingStatus(@PathVariable Long id, @RequestParam Booking.Status status) {
//        BookingDTO updatedBooking = bookingService.updateBookingStatus(id, status);
//        return ResponseEntity.ok(new ApiResponse("Booking status updated successfully"));
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Booking>> getAllBookings() {
//        List<Booking> bookingList = bookingService.getAllBookings();
//        return ResponseEntity.ok(bookingList);
//    }
//}

package com.th.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.th.dto.ApiResponse;
import com.th.dto.BookingDTO;
import com.th.entity.Booking;
import com.th.service.BookingService;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

	@Autowired
	private BookingService bookingService;

	@GetMapping("/{id}")
	public ResponseEntity<?> getBookingById(@PathVariable Long id) {
		BookingDTO bookingDTO = bookingService.getBookingById(id);
		if (bookingDTO == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Booking not found"));
		}
		return ResponseEntity.ok(bookingDTO);
	}

	@PostMapping
	public ResponseEntity<ApiResponse> addBooking(@RequestBody BookingDTO bookingDTO) {
		System.out.println("In add booking method forntend data =" + bookingDTO);
		BookingDTO newBooking = bookingService.saveBooking(bookingDTO);
		return ResponseEntity.status(201).body(new ApiResponse("Booking created successfully"));
	}

	@PutMapping("/{id}/status")
	public ResponseEntity<ApiResponse> updateBookingStatus(@PathVariable Long id, @RequestParam Booking.Status status) {
		BookingDTO updatedBooking = bookingService.updateBookingStatus(id, status);
		return ResponseEntity.ok(new ApiResponse("Booking status updated successfully"));
	}

	@PatchMapping("/{id}/assign-vendor")
	public ResponseEntity<ApiResponse> assignVendorToBooking(@PathVariable Long id, @RequestParam Long vendorId) {
		BookingDTO updatedBooking = bookingService.assignVendorToBooking(id, vendorId);
		return ResponseEntity.ok(new ApiResponse("Vendor assigned to booking successfully"));
	}

	@GetMapping
	public ResponseEntity<List<BookingDTO>> getAllBookings() {
		List<BookingDTO> bookingList = bookingService.getAllBookings();
		return ResponseEntity.ok(bookingList);
	}

	@GetMapping("/city-status")
	public ResponseEntity<List<BookingDTO>> getBookingsByCityAndStatus(@RequestParam String city,
			@RequestParam Booking.Status status) {
		System.out.printf("in booking get by city and status",city,status);
		List<BookingDTO> bookingList = bookingService.getBookingsByCityAndStatus(city, status);
		return ResponseEntity.ok(bookingList);
	}

	@PatchMapping("/{id}/status-cost")
	public ResponseEntity<ApiResponse> updateBookingStatusAndCost(@PathVariable Long id,
			@RequestParam Booking.Status status, @RequestParam BigDecimal cost) {
		BookingDTO updatedBooking = bookingService.updateBookingStatusAndCost(id, status, cost);
		return ResponseEntity.ok(new ApiResponse("Booking status and cost updated successfully"));
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<BookingDTO>> getBookingsByUserId(@PathVariable Long userId) {
		List<BookingDTO> bookingList = bookingService.getBookingsByUserId(userId);
		return ResponseEntity.ok(bookingList);
	}

	@GetMapping("/vendor/{vendorId}")
	public ResponseEntity<List<BookingDTO>> getBookingsByVendorId(@PathVariable Long vendorId) {
		List<BookingDTO> bookingList = bookingService.getBookingsByVendorId(vendorId);
		System.out.println(bookingList);
		return ResponseEntity.ok(bookingList);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse> updateBooking(@PathVariable Long id, @RequestBody BookingDTO bookingDTO) {
		BookingDTO updatedBooking = bookingService.updateBooking(id, bookingDTO);
		return ResponseEntity.ok(new ApiResponse("Booking updated successfully"));
	}
}
