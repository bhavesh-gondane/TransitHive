package com.th.entity;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BookingItem extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    private String name;
    private int quantity;
    private BigDecimal basePrice;
}
