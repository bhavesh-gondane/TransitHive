package com.th.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.th.entity.Otp;

import java.util.Optional;

public interface OtpRepository extends JpaRepository<Otp, Long> {
    Optional<Otp> findByEmailAndCode(String email, String code);
}
