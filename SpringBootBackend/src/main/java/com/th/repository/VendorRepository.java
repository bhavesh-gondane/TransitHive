package com.th.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.th.entity.Vendor;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {

	Optional<Vendor> findByEmailAndPassword(String email, String pwd);
	List<Vendor> findByStatus(Vendor.Status status);
	@Query("SELECT DISTINCT v.city FROM Vendor v")
    List<String> findDistinctCities();
	Optional<Vendor> findByEmail(String email);
}
