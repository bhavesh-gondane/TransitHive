package com.th.dto;

import java.time.LocalDateTime;

import com.th.entity.User;
import com.th.entity.Vendor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequestDTO extends BaseDTO {
    private BookingReviewDTO booking;
    private UserDTO user;
    private VendorDTO2 vendor;
    private int rating;
    private String comment;
    private LocalDateTime reviewDate;
}
