package com.th.controller;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.th.dto.ForgotPassword;
import com.th.dto.OtpRequest;
import com.th.dto.RequestPassword;
import com.th.entity.Admin;
import com.th.entity.Booking.PaymentM;
import com.th.entity.Otp;
import com.th.entity.User;
import com.th.entity.Vendor;
import com.th.repository.AdminRepository;
import com.th.repository.UserRepository;
import com.th.repository.VendorRepository;
import com.th.service.BookingService;
import com.th.service.EmailService;
import com.th.service.OtpService;
import com.th.util.JwtUtil;


@RestController
@RequestMapping("/api/otp")
@CrossOrigin(origins = "*")	
public class OtpController {

    @Autowired
    private OtpService otpService;
    
    @Autowired
    private EmailService emailService;

    @Autowired
    private BookingService bookingService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private VendorRepository vendorRepository;
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    
    
    @PostMapping("/generate/{bookingId}")
    public ResponseEntity<String> generateOtp(@PathVariable long bookingId) {
    	
    	var booking = bookingService.getBookingById(bookingId);
		if (booking == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found.");
		}    	
    	String code = String.format("%06d", new Random().nextInt(1000000)); // Generate a 6-digit OTP code
        Otp otp = new Otp();
        otp.setEmail(booking.getEmail());
        otp.setCode(code);
        otp.setExpirationTime(LocalDateTime.now().plusMinutes(10));
        
     // Here, you would send the OTP to the user's email.
        emailService.sendEmail(booking.getEmail(), "Booking Confirmation", "Your OTP is: "+code+" . Share Your Otp if Your Order is Sucessfully Delivered Its Valid for 10 Minutes  ");
        
        otpService.saveOtp(otp);       
        
        return ResponseEntity.ok("success");
    }

    @PostMapping("/verify/{bookingId}")
    public ResponseEntity<String> verifyOtp(@PathVariable long bookingId,@RequestBody OtpRequest otpRequest) {
    	
    	var booking = bookingService.getBookingById(bookingId);
		if (booking == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found.");
		} 
        boolean isValid = otpService.verifyOtp(booking.getEmail(), otpRequest.getCode());
        if (isValid) {
        	var booking1=bookingService.setPaymentMethod(booking.getId(), otpRequest.getPaymentMethod());
        	if(otpRequest.getPaymentMethod()==PaymentM.CASH) {
        		bookingService.markAsPaid(bookingId);
        	}
        	if(booking1==null) {
        		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment Method is not valid");
        	}
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("OTP is invalid or expired.");
        }
    }
    
    
    @PostMapping("/generate/forgototp")
    public ResponseEntity<String> generateForgotOtp(@RequestBody ForgotPassword email1) {
        
    	String email = email1.getEmail();
    	
    	Optional<User> user = userRepository.findByEmail(email);
        Optional<Vendor> vendor = vendorRepository.findByEmail(email);
        Optional<Admin> admin = adminRepository.findByEmail(email);
        
        if (user.isPresent() || vendor.isPresent() || admin.isPresent()) {
        	
        	 String token1 = jwtUtil.generateTokenForgotPassword(email);
             
             // Create the URL with the token
             String url = "http://localhost:5173/reset-password?token=" + token1;
             
             // Send the URL in the email
             emailService.sendEmail(email, "Reset Your Password", "Click on the link to reset your password: " + url);
             
             // Uncomment if you need to save the OTP
             // otpService.saveOtp(otp);       
             
            
        }
        
        return ResponseEntity.ok("success");
    	
        // Generate token
       
    }
    
    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody RequestPassword pass) {
        
    	
        // Verify the token and extract the relevant information
        
            String email = jwtUtil.extractEmail(pass.getToken());
            System.out.println(email);
            
			if (!email.equals(pass.getEmailId())) {
				return "Invalid email";
			}
            
            Boolean check= jwtUtil.isTokenExpired(pass.getToken());
            if(check==true) {
            	return "Token Expired";
            }
            // Provide a form or process to reset the password (you need to implement this part)
            if(email != null) {
            	Optional<User> user = userRepository.findByEmail(email);
                Optional<Vendor> vendor = vendorRepository.findByEmail(email);
                Optional<Admin> admin = adminRepository.findByEmail(email);
                
				if (user.isPresent()) {
					User user1 = user.get();
					//user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
					user1.setPassword(new BCryptPasswordEncoder().encode(pass.getNewPassword()));
					userRepository.save(user1);
					return "Password reset successfully";
				} else if (vendor.isPresent()) {
					Vendor vendor1 = vendor.get();
					vendor1.setPassword(new BCryptPasswordEncoder().encode(pass.getNewPassword()));
					vendorRepository.save(vendor1);
					return "Password reset successfully";
				} else if (admin.isPresent()) {
					Admin admin1 = admin.get();
					admin1.setPassword(new BCryptPasswordEncoder().encode(pass.getNewPassword()));
					adminRepository.save(admin1);
					return "Password reset successfully";
				}
				return "password not reset";
            }
    
            // Handle invalid token scenario
            return "Invalid";
    }
}
