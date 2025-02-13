package com.th.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO extends BaseDTO {
    private Long bookingId;
    private Long userId;
    private Long vendorId;
    private String paymentMethod;
    private BigDecimal amount;
    private LocalDateTime paymentDate;
    private PaymentStatus status;
    private String transactionId;
    public enum PaymentStatus {
        SUCCESS, FAILED, PENDING
    }
}
