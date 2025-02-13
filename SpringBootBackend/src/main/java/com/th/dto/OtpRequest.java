package com.th.dto;

import com.th.entity.Booking.PaymentM;

import lombok.Data;

@Data
public class OtpRequest {
	
   
    private String code;
    
    private PaymentM paymentMethod;
    
    
}
