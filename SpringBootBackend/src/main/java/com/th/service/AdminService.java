package com.th.service;

import java.math.BigDecimal;
import java.util.List;

import com.th.dto.AdminDTO;
import com.th.dto.ApiResponse;
import com.th.dto.AuthRequest;
import com.th.entity.AdminWallet;

public interface AdminService {
    AdminDTO getAdminById(Long id);
    AdminDTO updateAdmin(AdminDTO adminDTO);
    List<AdminDTO> getAllAdmins();
	ApiResponse saveAdmin(AdminDTO adminDTO);
	AdminDTO authenticateUser(AuthRequest request);
	
	ApiResponse addAmountToWallet( BigDecimal amount);
	
	BigDecimal TotalAmountAdmin();
}
