package com.th.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class DashboardDTO {

	
	private Long Users;
	private Long Vendors;
    private Long Bookings;
    private BigDecimal Revenue;
    private BigDecimal ActualRevenue;
}
