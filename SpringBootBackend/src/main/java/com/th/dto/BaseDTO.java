package com.th.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class BaseDTO {
    private Long id;
    private LocalDate createdOn;
    private LocalDateTime updatedOn;
}
