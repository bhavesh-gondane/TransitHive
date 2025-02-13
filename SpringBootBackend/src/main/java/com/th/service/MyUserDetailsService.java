package com.th.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.th.entity.Admin;
import com.th.entity.User;
import com.th.entity.Vendor;
import com.th.repository.AdminRepository;
import com.th.repository.UserRepository;
import com.th.repository.VendorRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserBuilder builder = null;

        User user = userRepository.findByEmail(username).orElse(null);
        if (user != null) {
            builder = org.springframework.security.core.userdetails.User.withUsername(user.getEmail());
            builder.password(user.getPassword());
            builder.roles("USER");
        } else {
            Vendor vendor = vendorRepository.findByEmail(username).orElse(null);
            if (vendor != null) {
                builder = org.springframework.security.core.userdetails.User.withUsername(vendor.getEmail());
                builder.password(vendor.getPassword());
                builder.roles("VENDOR");
            } else {
                Admin admin = adminRepository.findByEmail(username).orElse(null);
                if (admin != null) {
                    builder = org.springframework.security.core.userdetails.User.withUsername(admin.getEmail());
                    builder.password(admin.getPassword());
                    builder.roles("ADMIN");
                } else {
                    throw new UsernameNotFoundException("User not found with email: " + username);
                }
            }
        }
        
        return builder.build();
    }
}
