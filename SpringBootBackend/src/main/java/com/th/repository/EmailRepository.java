package com.th.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.th.entity.Email;

@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {
}
