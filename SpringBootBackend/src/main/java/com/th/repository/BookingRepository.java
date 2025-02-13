package com.th.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.th.entity.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
	List<Booking> findByCityAndStatus(String city, Booking.Status status);
	List<Booking> findByUserId(Long userId);
	List<Booking> findByVendorId(Long vendorId);
	
	@Query("SELECT SUM(b.cost) FROM Booking b WHERE b.status = :status AND b.isPaid = :isPaid")
    BigDecimal sumCostByStatusAndIsPaid(@Param("status") Booking.Status status, @Param("isPaid") boolean isPaid);
}
