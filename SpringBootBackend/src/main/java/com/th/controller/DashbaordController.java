package com.th.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.th.dto.DashboardDTO;
import com.th.service.AdminService;
import com.th.service.BookingService;
import com.th.service.UserService;
import com.th.service.VendorService;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "*")
public class DashbaordController {
	
	
	@Autowired
	private BookingService bookingService;
	
	@Autowired
	private VendorService vendorService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AdminService adminService;
	
	
	@GetMapping("/info")
	public ResponseEntity<DashboardDTO> getDashboardData(){
		
		DashboardDTO dashboardDTO = new DashboardDTO();
		
		dashboardDTO.setVendors(vendorService.totalVendorCount());
		dashboardDTO.setUsers(userService.totalUserCount());
		dashboardDTO.setBookings(bookingService.totalBookingCount());
		dashboardDTO.setRevenue(bookingService.getTotalCostForCompletedAndPaidBookings());
		dashboardDTO.setActualRevenue(adminService.TotalAmountAdmin());
		
		return dashboardDTO != null ? ResponseEntity.ok(dashboardDTO) : ResponseEntity.notFound().build();
		
		
		
	}

}
