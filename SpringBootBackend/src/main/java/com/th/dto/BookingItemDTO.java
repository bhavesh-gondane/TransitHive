package com.th.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingItemDTO extends BaseDTO {
    private String name;
    private int quantity;
    private BigDecimal basePrice;
}
