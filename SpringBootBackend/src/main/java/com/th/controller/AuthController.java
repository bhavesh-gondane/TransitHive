package com.th.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.th.dto.AuthRequest;
import com.th.entity.Admin;
import com.th.entity.User;
import com.th.entity.Vendor;
import com.th.repository.AdminRepository;
import com.th.repository.UserRepository;
import com.th.repository.VendorRepository;
import com.th.service.EmailService;
import com.th.service.MyUserDetailsService;
import com.th.util.JwtUtil;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private EmailService emailService;

    // User Signup
    @PostMapping("/signup/user")
    public String signupUser(@RequestBody User user) {
        if (isEmailTaken(user.getEmail())) {
            return "Email is already taken!";
        }
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userRepository.save(user);
        return "User signed up successfully!";
        
    }

    // Vendor Signup
    @PostMapping("/signup/vendor")
    public String signupVendor(@RequestBody Vendor vendor) {
        if (isEmailTaken(vendor.getEmail())) {
            return "Email is already taken!";
        }
        vendor.setPassword(new BCryptPasswordEncoder().encode(vendor.getPassword()));
        vendorRepository.save(vendor);
        
        String subject = "Registration Successful";
		String body = String.format(
				"Dear %s,\n\nThank you for joining our platform!\nYour application has been successfully submitted with Application ID: %d.\n\nWe are currently reviewing your application. Please be patient during this time.\n\nBest regards,\nThe Team TransitHive",
				vendor.getCompanyName(), vendor.getId());
		emailService.sendEmail(vendor.getEmail(), subject, body);
        
        return "Vendor signed up successfully!";
    }

    // Admin Signup
    @PostMapping("/signup/admin")
    public String signupAdmin(@RequestBody Admin admin) {
        if (isEmailTaken(admin.getEmail())) {
            return "Email is already taken!";
        }
        admin.setPassword(new BCryptPasswordEncoder().encode(admin.getPassword()));
        adminRepository.save(admin);
        return "Admin signed up successfully!";
    }

    // Common Sign-In
    @PostMapping("/authenticate")
    public String createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
       System.out.println(authRequest.getEmail());
    	try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        } catch (Exception e) {
            return ("Incorrect email or password");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());

        String jwt = null;
        if (userDetails.getAuthorities().toString().contains("USER")) {
            User user = userRepository.findByEmail(authRequest.getEmail()).get();
            jwt = jwtUtil.generateToken(String.valueOf(user.getId()), user.getName(), user.getEmail(),user.getCity() ,"USER");
        } else if (userDetails.getAuthorities().toString().contains("VENDOR")) {
            Vendor vendor = vendorRepository.findByEmail(authRequest.getEmail()).get();
            jwt = jwtUtil.generateTokenVendor(String.valueOf(vendor.getId()), vendor.getCompanyName(), vendor.getEmail(),vendor.getCity(), vendor.getStatus().toString() ,"VENDOR");
        } else if (userDetails.getAuthorities().toString().contains("ADMIN")) {
            Admin admin = adminRepository.findByEmail(authRequest.getEmail()).get();
            jwt = jwtUtil.generateTokenadmin(String.valueOf(admin.getId()), admin.getName(), admin.getEmail(), "ADMIN");
        }

        return jwt;
    }

    // Method to check if email is taken
    private boolean isEmailTaken(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        Optional<Vendor> vendor = vendorRepository.findByEmail(email);
        Optional<Admin> admin = adminRepository.findByEmail(email);
        return user.isPresent() || vendor.isPresent() || admin.isPresent();
    }
}
