package com.th.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.th.dto.PaymentDTO;
import com.th.entity.Payment;
import com.th.repository.BookingRepository;
import com.th.repository.PaymentRepository;
import com.th.repository.UserRepository;
import com.th.repository.VendorRepository;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public PaymentDTO getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id).orElse(null);
        if (payment == null) {
            return null;
        }
        return modelMapper.map(payment, PaymentDTO.class);
    }

    @Override
    public PaymentDTO savePayment(PaymentDTO paymentDTO) {
        Payment payment = modelMapper.map(paymentDTO, Payment.class);
        payment.setBooking(bookingRepository.findById(paymentDTO.getBookingId()).orElseThrow(() -> new RuntimeException("Booking not found")));
        payment.setUser(userRepository.findById(paymentDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found")));
        payment.setVendor(vendorRepository.findById(paymentDTO.getVendorId()).orElseThrow(() -> new RuntimeException("Vendor not found")));
        payment = paymentRepository.save(payment);
        return modelMapper.map(payment, PaymentDTO.class);
    }

    @Override
    public List<PaymentDTO> getAllPayments() {
    	
    	//Payment payment=paymentRepository.findAll()
        
    			
    		return paymentRepository.findAll().stream()
                .map(payment -> modelMapper.map(payment, PaymentDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public PaymentDTO updatePaymentStatus(Long id, PaymentDTO.PaymentStatus status) {
        Payment payment = paymentRepository.findById(id).orElseThrow(() -> new RuntimeException("Payment not found"));
        payment.setStatus(Payment.PaymentStatus.valueOf(status.name())); // Correctly mapping enums
        payment = paymentRepository.save(payment);
        return modelMapper.map(payment, PaymentDTO.class);
    }
}
