package com.th.controller;


import java.math.BigDecimal;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.th.dto.BookingPayment;
import com.th.dto.VendorWallet;





@RestController
@RequestMapping("/checkout")
@CrossOrigin(origins = "*")
public class CheckoutController {
	@Value("${stripe.secret.key}")
    private String stripeSecretKey;
	
	@PostMapping("/create-checkout-session")
	public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody BookingPayment bookingDTO) {
	    com.stripe.Stripe.apiKey = stripeSecretKey;
	    System.out.println("in create checkout session" + bookingDTO);
	    Long bookingID = bookingDTO.getBookingId();
	    
	    try {
	        // Construct the success URL with the session ID and booking ID
	        String successUrl = String.format("http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}&bookingId=%d", bookingID);

	        SessionCreateParams params = SessionCreateParams.builder()
	            .setMode(SessionCreateParams.Mode.PAYMENT)
	            .setSuccessUrl(successUrl)
	            .setCancelUrl("http://localhost:3000/cancel")
	            .addLineItem(
	                SessionCreateParams.LineItem.builder()
	                    .setQuantity(1L)
	                    .setPriceData(
	                        SessionCreateParams.LineItem.PriceData.builder()
	                            .setCurrency("inr")
	                            .setUnitAmount(bookingDTO.getCost().longValue() * 100) // Stripe uses smallest currency unit
	                            .setProductData(
	                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
	                                    .setName("Booking Payment")
	                                    .build()
	                            )
	                            .build()
	                    )
	                    .build()
	            )
	            .build();

	        Session session = Session.create(params);

	        Map<String, String> responseData = new HashMap<>();
	        responseData.put("sessionId", session.getId());
	        
	        return ResponseEntity.ok(responseData);

	    } catch (StripeException e) {
	        e.printStackTrace();
	        return ResponseEntity.badRequest().build();
	    }
	}

	
	
	@GetMapping("/verify-payment")
	public ResponseEntity<Map<String, String>> verifyPayment(@RequestParam String sessionId) {
	    try {
	        // Retrieve the session from Stripe using the sessionId
	        Session session = Session.retrieve(sessionId);
	        
	        // Optionally, check the session status to confirm payment success
	        if ("paid".equals(session.getPaymentStatus())) {
	            // Send back the transaction ID or any relevant data
	            Map<String, String> response = new HashMap<>();
	            response.put("transactionId", session.getPaymentIntent()); // Or use other transaction ID
	            return ResponseEntity.ok(response);
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", "Payment failed"));
	        }
	    } catch (StripeException e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Error retrieving payment"));
	    }
	}
	
	
	@PostMapping("/vendor/create-checkout-session")
	public ResponseEntity<Map<String, String>> createVendorCheckoutSession(@RequestBody VendorWallet wallet) {
	    com.stripe.Stripe.apiKey = stripeSecretKey;
	    System.out.println("in create checkout session" + wallet.getVendorId());
	    Long vendorId = wallet.getVendorId();
	    String amount = wallet.getAmount().toString();
	    
	    try {
	        // Construct the success URL with the session ID and booking ID
	        String successUrl = String.format("http://localhost:5173/vendorsuccess?session_id={CHECKOUT_SESSION_ID}&vendorId=%d&finalamount=%s", vendorId,amount);

	        SessionCreateParams params = SessionCreateParams.builder()
	            .setMode(SessionCreateParams.Mode.PAYMENT)
	            .setSuccessUrl(successUrl)
	            .setCancelUrl("http://localhost:3000/cancel")
	            .addLineItem(
	                SessionCreateParams.LineItem.builder()
	                    .setQuantity(1L)
	                    .setPriceData(
	                        SessionCreateParams.LineItem.PriceData.builder()
	                            .setCurrency("inr")
	                            .setUnitAmount(wallet.getAmount().longValue() * 100) // Stripe uses smallest currency unit
	                            .setProductData(
	                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
	                                    .setName("Vendor Payment")
	                                    .build()
	                            )
	                            .build()
	                    )
	                    .build()
	            )
	            .build();

	        Session session = Session.create(params);

	        Map<String, String> responseData = new HashMap<>();
	        responseData.put("sessionId", session.getId());
	        
	        return ResponseEntity.ok(responseData);

	    } catch (StripeException e) {
	        e.printStackTrace();
	        return ResponseEntity.badRequest().build();
	    }
	}
	
	@GetMapping("/vendor/verify-payment")
	public ResponseEntity<Map<String, String>> verifyVendorPayment(@RequestParam String sessionId) {
	    try {
	        // Retrieve the session from Stripe using the sessionId
	        Session session = Session.retrieve(sessionId);
	        
	        // Optionally, check the session status to confirm payment success
	        if ("paid".equals(session.getPaymentStatus())) {
	            // Send back the transaction ID or any relevant data
	            Map<String, String> response = new HashMap<>();
	            response.put("transactionId", session.getPaymentIntent()); // Or use other transaction ID
	            return ResponseEntity.ok(response);
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", "Payment failed"));
	        }
	    } catch (StripeException e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Error retrieving payment"));
	    }
	}
}
