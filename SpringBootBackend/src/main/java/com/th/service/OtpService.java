package com.th.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.th.dto.OtpRequest;
import com.th.entity.Otp;
import com.th.repository.OtpRepository;

@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepository;

    public boolean verifyOtp(String email, String code) {
    	
        Optional<Otp> otpOptional = otpRepository.findByEmailAndCode(email, code);
        if (otpOptional.isPresent()) {
            Otp otp = otpOptional.get();
            return otp.getExpirationTime().isAfter(LocalDateTime.now());
        }
        return false;
    }

    public void saveOtp(Otp otp) {
        otpRepository.save(otp);
    }
}
