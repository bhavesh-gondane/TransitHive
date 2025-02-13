package com.th.dto;

import java.math.BigDecimal;

import com.th.entity.ItemCategory;

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
public class ItemDTO extends BaseDTO {
    private String name;
    private Long categoryId;
    //private String categoryName;
   // private ItemCategory category;
    private BigDecimal basePrice;
}