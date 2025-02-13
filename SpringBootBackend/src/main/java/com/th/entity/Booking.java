package com.th.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Booking extends BaseEntity {
    private String name;
    private String mobile;
    private String email;
    private String city;
    private LocalDate moveDate;
    private String pickupLocation;
    private String dropLocation;
    private Integer pickupFloors;
    private Integer dropFloors;
    private String packagingType;
    private BigDecimal cost;
    
    @Enumerated(EnumType.STRING)
    private PaymentM paymentMethod;
    
    private boolean isPaid;
    
    private boolean isReviewed;    
    

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "vendor_id", nullable = true)
    private Vendor vendor;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookingItem> bookingItems = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    @Enumerated(EnumType.STRING)
    private LiftAvailability pickupLift;

    @Enumerated(EnumType.STRING)
    private LiftAvailability dropLift;

    public enum Status {
        PENDING, CONFIRMED, ASSIGNED, COMPLETED, CANCELLED
    }

    public enum LiftAvailability {
        YES, NO
    }
    
    public enum PaymentM { CASH, CARD }
}
