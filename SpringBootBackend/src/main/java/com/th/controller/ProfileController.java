package com.th.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.th.dto.AdminDTO;
import com.th.dto.UserDTO;
import com.th.dto.VendorDTO;
import com.th.entity.Admin;
import com.th.entity.User;
import com.th.entity.Vendor;
import com.th.repository.AdminRepository;
import com.th.repository.UserRepository;
import com.th.repository.VendorRepository;
import com.th.util.JwtUtil;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private AdminRepository adminRepository;

    @GetMapping("/details")
    public Object getProfileDetails(@RequestHeader("Authorization") String token) {
        // Remove 'Bearer ' from token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // Extract email from token
        String email = jwtUtil.extractUsername(token);

        // Find profile by email
        if (userRepository.findByEmail(email).isPresent()) {
            User user = userRepository.findByEmail(email).get();
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setName(user.getName());
            userDTO.setEmail(user.getEmail());
            userDTO.setPhone(user.getPhone());
            userDTO.setCity(user.getCity());
            //userDTO.setJwt(token); // Return the same token
            return userDTO;
        } else if (vendorRepository.findByEmail(email).isPresent()) {
            Vendor vendor = vendorRepository.findByEmail(email).get();
            VendorDTO vendorDTO = new VendorDTO();
            vendorDTO.setId(vendor.getId());
            vendorDTO.setCompanyName(vendor.getCompanyName());
            vendorDTO.setEmail(vendor.getEmail());
            vendorDTO.setPhone(vendor.getPhone());
            vendorDTO.setGstin(vendor.getGstin());
            vendorDTO.setCompanyOwnerName(vendor.getCompanyOwnerName());
            vendorDTO.setOwnerAadharNumber(vendor.getOwnerAadharNumber());
            vendorDTO.setPanNumber(vendor.getPanNumber());
            vendorDTO.setCity(vendor.getCity());
            vendorDTO.setAmount(vendor.getAmount());
            vendorDTO.setStatus(vendor.getStatus());
            //vendorDTO.setJwt(token); // Return the same token
            return vendorDTO;
        } else if (adminRepository.findByEmail(email).isPresent()) {
            Admin admin = adminRepository.findByEmail(email).get();
            AdminDTO adminDTO = new AdminDTO();
            adminDTO.setId(admin.getId());
            adminDTO.setName(admin.getName());
            adminDTO.setEmail(admin.getEmail());
            adminDTO.setPhone(admin.getPhone());
            //adminDTO.setJwt(token); // Return the same token
            return adminDTO;
        }

        return null;
    }
}
