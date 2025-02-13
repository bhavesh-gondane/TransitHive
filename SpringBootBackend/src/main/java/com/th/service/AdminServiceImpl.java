package com.th.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.th.dto.AdminDTO;
import com.th.dto.ApiResponse;
import com.th.dto.AuthRequest;
import com.th.entity.Admin;
import com.th.entity.AdminWallet;
import com.th.exception.AuthenticationException;
import com.th.exception.ResourceNotFoundException;
import com.th.repository.AdminRepository;
import com.th.repository.AdminWalletRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private AdminWalletRepository adminWalletRepository;
   

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public AdminDTO getAdminById(Long id) {
        Admin admin = adminRepository.findById(id).orElse(null);
        if (admin == null) {
            return null;
        }
        return modelMapper.map(admin, AdminDTO.class);
    }

    @Override
    public AdminDTO updateAdmin(AdminDTO adminDTO) {
        Admin admin = modelMapper.map(adminDTO, Admin.class);
        admin = adminRepository.save(admin);
        return modelMapper.map(admin, AdminDTO.class);
    }

    @Override
    public List<AdminDTO> getAllAdmins() {
        return adminRepository.findAll().stream()
                .map(admin -> modelMapper.map(admin, AdminDTO.class))
                .collect(Collectors.toList());
    }

	@Override
	public ApiResponse saveAdmin(AdminDTO adminDTO) {
		Admin admin = modelMapper.map(adminDTO, Admin.class);
		Admin saveAdmin = adminRepository.save(admin);
		return new ApiResponse("Added new User with ID : " + saveAdmin.getId());
	}

	@Override
	public AdminDTO authenticateUser(AuthRequest request) {
		
		System.out.println("in auth user "+request);

		Admin admin = adminRepository.findByEmailAndPassword(request.getEmail(), request.getPassword())
				.orElseThrow(() -> new AuthenticationException("Invalid Email or Password !!!!!!"));

		return modelMapper.map(admin, AdminDTO.class);
	}

	@Override
	public ApiResponse addAmountToWallet(BigDecimal amount) {
		Long id=(long) 1;
		AdminWallet admin = adminWalletRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("admin not found"));
		if (admin!=null) {
			BigDecimal walletAmount = admin.getAmount();
			if (walletAmount == null) {
				walletAmount = BigDecimal.ZERO;
			}
			admin.setAmount(admin.getAmount().add(amount));
			adminWalletRepository.save(admin);
		}
		return new ApiResponse("Amount added to wallet successfully");
	}

	@Override
	public BigDecimal TotalAmountAdmin() {
		Long id=(long)1;
		AdminWallet aWallet= adminWalletRepository.getById(id);
		BigDecimal result=aWallet.getAmount();
		return result;
	}
	
	
}
