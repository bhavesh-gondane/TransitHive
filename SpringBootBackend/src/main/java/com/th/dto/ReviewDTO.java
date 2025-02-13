package com.th.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO extends BaseDTO {
    private Long bookingId;
    private Long userId;
    private Long vendorId;
    private int rating;
    private String comment;
    private LocalDateTime reviewDate;
}
