package com.th.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class BookingPayment {
	
	private Long bookingId;
	
	private BigDecimal cost;

}

