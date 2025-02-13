//package com.th.service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.th.dto.BookingDTO;
//import com.th.dto.BookingItemDTO;
//import com.th.entity.Booking;
//import com.th.entity.BookingItem;
//import com.th.repository.BookingRepository;
//import com.th.repository.UserRepository;
//import com.th.service.BookingService;
//
//@Service
//public class BookingServiceImpl implements BookingService {
//
//    @Autowired
//    private BookingRepository bookingRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private ModelMapper modelMapper;
//
//    @Override
//    public BookingDTO getBookingById(Long id) {
//        Booking booking = bookingRepository.findById(id).orElse(null);
//        if (booking == null) {
//            return null;
//        }
//        return modelMapper.map(booking, BookingDTO.class);
//    }
//
//    @Override
//    public BookingDTO saveBooking(BookingDTO bookingDTO) {
//        Booking booking = modelMapper.map(bookingDTO, Booking.class);
//        booking.setUser(userRepository.findById(bookingDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found")));
//
//        // Ensure the vendor is null and status is PENDING
//        booking.setVendor(null);
//        booking.setStatus(Booking.Status.PENDING);
//
//        // Set BookingItems without lambda
//        for (BookingItemDTO itemDTO : bookingDTO.getItems()) {
//            BookingItem bookingItem = modelMapper.map(itemDTO, BookingItem.class);
//            bookingItem.setBooking(booking);  // Set the booking reference here
//            booking.getBookingItems().add(bookingItem);
//        }
//
//        // Map pickupLift and dropLift to LiftAvailability enum
//        booking.setPickupLift(Booking.LiftAvailability.valueOf(bookingDTO.getPickupLift().toUpperCase()));
//        booking.setDropLift(Booking.LiftAvailability.valueOf(bookingDTO.getDropLift().toUpperCase()));
//
//        booking = bookingRepository.save(booking);
//
//        return modelMapper.map(booking, BookingDTO.class);
//    }
//
//    @Override
//    public BookingDTO updateBookingStatus(Long id, Booking.Status status) {
//        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));
//        booking.setStatus(status);
//        booking = bookingRepository.save(booking);
//        return modelMapper.map(booking, BookingDTO.class);
//    }
//
////    @Override
////    public List<BookingDTO> getAllBookings() {
////        return bookingRepository.findAll().stream()
////                .map(booking -> modelMapper.map(booking, BookingDTO.class))
////                .collect(Collectors.toList());
////    }
//    @Override
//    public List<Booking> getAllBookings() {
//        return bookingRepository.findAll();
//    }
//}

package com.th.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.th.dto.BookingDTO;
import com.th.dto.BookingItemDTO;
import com.th.entity.Booking;
import com.th.entity.Booking.PaymentM;
import com.th.entity.BookingItem;
import com.th.entity.Vendor;
import com.th.exception.ResourceNotFoundException;
import com.th.repository.BookingRepository;
import com.th.repository.UserRepository;
import com.th.repository.VendorRepository;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	VendorRepository vendorRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private EmailService emailService;
	
	@Autowired
	private VendorService vendorService;
	
	@Autowired
	private AdminService adminService;

	// get booking by its id
	@Override
	public BookingDTO getBookingById(Long id) {
		Booking booking = bookingRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Booking bot Found"));

		return mapToDTO(booking);
	}

	// user api call save booking by user
	@Override
	public BookingDTO saveBooking(BookingDTO bookingDTO) {
		Booking booking = modelMapper.map(bookingDTO, Booking.class);
		booking.setUser(userRepository.findById(bookingDTO.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("User not found")));

		booking.setVendor(null);
		booking.setStatus(Booking.Status.PENDING);

		booking.getBookingItems().clear();
		for (BookingItemDTO itemDTO : bookingDTO.getItems()) {
			BookingItem bookingItem = modelMapper.map(itemDTO, BookingItem.class);
			bookingItem.setBooking(booking);
			booking.getBookingItems().add(bookingItem);
		}

		booking.setPickupLift(Booking.LiftAvailability.valueOf(bookingDTO.getPickupLift().toUpperCase()));
		booking.setDropLift(Booking.LiftAvailability.valueOf(bookingDTO.getDropLift().toUpperCase()));

		booking = bookingRepository.save(booking);

//		// Send confirmation email
//		String subject = "Your Order is Successfully Booked";
//		String body = String.format(
//				"Dear %s,\n\nYour order has been successfully booked.\nBooking Date: %s\nAmount: %s\n\nThank you!",
//				booking.getUser().getName(), booking.getMoveDate(), booking.getCost());
//		emailService.sendEmail(booking.getUser().getEmail(), subject, body);

		return mapToDTO(booking);
	}

	// for vendor to change the booking status from assigned to completed
	// for use to change the status from booked to canceled
	@Override
	public BookingDTO updateBookingStatus(Long id, Booking.Status status) {
		Booking booking = bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));
		booking.setStatus(status);
		booking = bookingRepository.save(booking);
		BigDecimal cost = booking.getCost();
		 BigDecimal percentage = new BigDecimal("0.0005");
		BigDecimal result = cost.multiply(percentage);
		// Send status change email

		String subject;
		String body;
		if (status == Booking.Status.COMPLETED) {
			subject = "Order SucessFully Completed";
			body = String.format(
					"Dear %s,\nYour Order is Sucessfully Completed \nOrder ID: %d\nThank you for Support! /n The Team TransitHive",
					booking.getUser().getName(), booking.getId());
			vendorService.deducttAmountFromWallet(booking.getVendor().getId(), result);
			adminService.addAmountToWallet(result);
			
		} else if (status == Booking.Status.CANCELLED) {
			subject = "Booking Cancelled";
			body = String.format(
					"Dear %s,\n\nYour Booking has been Cancelled.\nBooking ID: %d \\n[Team TransitHive]\\nCustomer Support: [transithive.system@gmail.com]",
					booking.getUser().getName(), booking.getId());
		} else if (status == Booking.Status.CONFIRMED) {
			subject = "Booking Confirmed";
			body = String.format(
					"Dear %s,\\n\\nThank you for choosing our Service!"
							+ "\\n\\nWe are pleased to confirm your booking:\\n\\nBooking ID: %d"
							+ "\\nScheduled Date: %s\\nPickup Location: %s\\nDrop-off Location: %s"
							+ "\\n\\nOur team will ensure a smooth and hassle-free moving experience."
							+ "\\n\\nWe look forward to serving you!\\n\\nBest regards,"
							+ "\\n[Team TransitHive]\\nCustomer Support: [transithive.system@gmail.com]\",\r\n",
					booking.getUser().getName(), booking.getId(), booking.getMoveDate(), booking.getPickupLocation(),
					booking.getDropLocation());
		} else {
			subject = null;
			body = null;
		}
		if (subject != null && body != null) {
			emailService.sendEmail(booking.getEmail(), subject, body);
		}
		return mapToDTO(booking);
	}

	// for vendor to accpet the order and change status from confirmed to assigned
	// and update venodrId in table ...
	@Override
	public BookingDTO assignVendorToBooking(Long bookingId, Long vendorId) {
		Booking booking = bookingRepository.findById(bookingId)
				.orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
		Vendor vendor = vendorRepository.findById(vendorId)
				.orElseThrow(() -> new ResourceNotFoundException("Vendor not found"));
		booking.setVendor(vendor);
		booking.setStatus(Booking.Status.ASSIGNED);
		booking = bookingRepository.save(booking);
		return mapToDTO(booking);
	}

	// its for admin to get all bookings
	@Override
	public List<BookingDTO> getAllBookings() {
		return bookingRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
	}

//	@Override
//	public List<BookingDTO> getBookingsByCityAndStatus(String city, Booking.Status status) {
//		return bookingRepository.findByCityAndStatus(city, status).stream().map(this::mapToDTO)
//				.collect(Collectors.toList());
//	}

	// its for vendor to get the bookings available to the location where booking
	// status = confirmed
//	@Override
//	public List<BookingDTO> getBookingsByCityAndStatus(String city, Booking.Status status) {
//		List<Booking> bookings = bookingRepository.findByCityAndStatus(city, status);
//		if (bookings.isEmpty()) {
//			throw new ResourceNotFoundException("No bookings found for the specified city and status");
//		}
//		return bookings.stream().map(this::mapToDTO).collect(Collectors.toList());
//	}

//	@Override
//	public List<BookingDTO> getBookingsByUserId(Long userId) {
//		return bookingRepository.findByUserId(userId).stream().map(this::mapToDTO).collect(Collectors.toList());
//	}

	// its for user to get their bookings by their id
	@Override
	public List<BookingDTO> getBookingsByUserId(Long userId) {

		List<Booking> bookings = bookingRepository.findByUserId(userId);
		if (bookings.isEmpty()) {
			throw new ResourceNotFoundException("No bookings found for the User");
		}
		return bookings.stream().map(this::mapToDTO).collect(Collectors.toList());
	}

	// its for vendor to get bookings by id
//	@Override
//	public List<BookingDTO> getBookingsByVendorId(Long vendorId) {
//
//		List<Booking> bookings = bookingRepository.findByVendorId(vendorId);
//		if (bookings.isEmpty()) {
//			throw new ResourceNotFoundException("No bookings found for the Vendor");
//		}
//		return bookings.stream().map(this::mapToDTO).collect(Collectors.toList());
//	}

	// its for admin to chnage any particular booking state and their cost
	@Override
	public BookingDTO updateBookingStatusAndCost(Long id, Booking.Status status, BigDecimal cost) {
		Booking booking = bookingRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
		booking.setStatus(status);
		booking.setCost(cost);
		booking = bookingRepository.save(booking);

		// Send status change email

		String subject;
		String body;
		if (status == Booking.Status.COMPLETED) {
			subject = "Order SucessFully Completed";
			body = String.format(
					"Dear %s,\nYour Order is Sucessfully Completed \nOrder ID: %d\nThank you for Support! /n The Team TransitHive",
					booking.getUser().getName(), booking.getId());
			
		} else if (status == Booking.Status.CANCELLED) {
			subject = "Booking Cancelled";
			body = String.format(
					"Dear %s,\n\nYour Booking has been Cancelled.\nBooking ID: %d \\n[Team TransitHive]\\nCustomer Support: [transithive.system@gmail.com]",
					booking.getUser().getName(), booking.getId());
		} else if (status == Booking.Status.CONFIRMED) {
			subject = "Booking Confirmed";
			body = String.format(
					"Dear %s,\\n\\nThank you for choosing our Service!"
							+ "\\n\\nWe are pleased to confirm your booking:\\n\\nBooking ID: %d"
							+ "\\nScheduled Date: %s\\nPickup Location: %s\\nDrop-off Location: %s"
							+ "\\n\\nOur team will ensure a smooth and hassle-free moving experience."
							+ "\\n\\nWe look forward to serving you!\\n\\nBest regards,"
							+ "\\n[Team TransitHive]\\nCustomer Support: [transithive.system@gmail.com]\",\r\n",
					booking.getUser().getName(), booking.getId(), booking.getMoveDate(), booking.getPickupLocation(),
					booking.getDropLocation());
		} else {
			subject = null;
			body = null;
		}
		if (subject != null && body != null) {
			emailService.sendEmail(booking.getEmail(), subject, body);
		}

		return mapToDTO(booking);
	}

	@Override
	public BookingDTO updateBooking(Long id, BookingDTO bookingDTO) {
		Booking existingBooking = bookingRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
		existingBooking.setName(bookingDTO.getName());
		existingBooking.setMobile(bookingDTO.getMobile());
		existingBooking.setEmail(bookingDTO.getEmail());
		existingBooking.setCity(bookingDTO.getCity());
		existingBooking.setMoveDate(bookingDTO.getMoveDate());
		existingBooking.setPickupLocation(bookingDTO.getPickupLocation());
		existingBooking.setDropLocation(bookingDTO.getDropLocation());
		existingBooking.setPickupLift(Booking.LiftAvailability.valueOf(bookingDTO.getPickupLift().toUpperCase()));
		existingBooking.setPickupFloors(bookingDTO.getPickupFloors());
		existingBooking.setDropLift(Booking.LiftAvailability.valueOf(bookingDTO.getDropLift().toUpperCase()));
		existingBooking.setDropFloors(bookingDTO.getDropFloors());
		existingBooking.setPackagingType(bookingDTO.getPackagingType());
		existingBooking.setCost(bookingDTO.getCost());
		// Update BookingItems
		existingBooking.getBookingItems().clear();
		for (BookingItemDTO itemDTO : bookingDTO.getItems()) {
			BookingItem bookingItem = modelMapper.map(itemDTO, BookingItem.class);
			bookingItem.setBooking(existingBooking);
			// Set the booking reference here
			existingBooking.getBookingItems().add(bookingItem);
		}
		existingBooking = bookingRepository.save(existingBooking);
		return mapToDTO(existingBooking);
	}

	// its is an common method to map the to the Dto to convet the Booking entity
	// and bookingItems entities ito the Concern DTOs
	private BookingDTO mapToDTO(Booking booking) {
		// its conver the booking enttity into bookingDTO
		BookingDTO bookingDTO = modelMapper.map(booking, BookingDTO.class);

		// here we Convert the Items in list and add in booking DTO
		List<BookingItemDTO> bookingItemDTOs = booking.getBookingItems().stream()
				.map(item -> modelMapper.map(item, BookingItemDTO.class)).collect(Collectors.toList());
		bookingDTO.setItems(bookingItemDTOs);
		bookingDTO.setUserId(booking.getUser().getId());
		bookingDTO.setCost(booking.getCost());
		return bookingDTO;
	}

	/// here is the conditional booking details show up to the vendor that if vendor
	/// is see the bookings
	/// by their location then its not known the user details for accepting the
	/// order ... only order cost and
	/// other booking details are shown to the vendor...
	/// its for prevent any misleading or order cancellation

	@Override
	public List<BookingDTO> getBookingsByCityAndStatus(String city, Booking.Status status) {
		System.out.println("in booking get by city and status" + city + "" + status);
		List<Booking> bookings = bookingRepository.findByCityAndStatus(city, status);
		if (bookings.isEmpty()) {
			throw new ResourceNotFoundException("No bookings found for the specified city and status");
		}
		return bookings.stream().map(this::mapToDTOWithoutPersonalInfo).collect(Collectors.toList());
	}

	private BookingDTO mapToDTOWithoutPersonalInfo(Booking booking) {
		BookingDTO bookingDTO = mapToDTO(booking);
		bookingDTO.setName(null);
		bookingDTO.setEmail(null);
		bookingDTO.setMobile(null);

		return bookingDTO;
	}

	// here if vendor accept the order then vendor still can't see the customer
	// information upto
	// before 24 hrs .. its get an customer info before 24 hrs and contact with
	// customer about exact location...

	// its again prevent from any misleading or order cancellation

	@Override
	public List<BookingDTO> getBookingsByVendorId(Long vendorId) {
		List<Booking> bookings = bookingRepository.findByVendorId(vendorId);
		return bookings.stream().map(this::mapToDTOWithConditionalPersonalInfo).collect(Collectors.toList());
	}

	private BookingDTO mapToDTOWithConditionalPersonalInfo(Booking booking) {
		BookingDTO bookingDTO = mapToDTO(booking);
		LocalDate currentDate = LocalDate.now();
		LocalDate moveDate = booking.getMoveDate(); // Ensure this is LocalDate

		Period period = Period.between(moveDate, currentDate);
		System.out.println(period.getDays());
		if (period.getDays() < -1) { // If the difference is 1 day or more
			bookingDTO.setName(null);
			bookingDTO.setEmail(null);
			bookingDTO.setMobile(null);
		}
		return bookingDTO;
	}

	@Override
	public Booking setPaymentMethod(Long id, PaymentM paymentMethod) {

		Booking booking = bookingRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

		if (booking != null) {
			booking.setPaymentMethod(paymentMethod);
			booking = bookingRepository.save(booking);
		}

		return booking;

	}

	@Override
	public boolean markAsReviewd(Long id) {
		
		Booking booking = bookingRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

		if (booking != null) {
			booking.setReviewed(true);
			booking = bookingRepository.save(booking);
		}		
		
		return true;
		
	}

	@Override
	public boolean markAsPaid(Long id) {
		Booking booking = bookingRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

		if (booking == null) {
			booking.setPaid(false);
			booking = bookingRepository.save(booking);
		}
		
		return true;
	}

	@Override
	public BigDecimal getTotalCostForCompletedAndPaidBookings() {
		
		return bookingRepository.sumCostByStatusAndIsPaid(Booking.Status.COMPLETED, true);
	}

	@Override
	public Long totalBookingCount() {
		// TODO Auto-generated method stub
		return bookingRepository.count();
	}
	
	
}
