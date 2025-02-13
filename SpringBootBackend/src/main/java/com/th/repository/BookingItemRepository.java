package com.th.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.th.entity.BookingItem;

@Repository
public interface BookingItemRepository extends JpaRepository<BookingItem, Long> {
}
