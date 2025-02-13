package com.th.dto;

import com.th.entity.Vendor.Status;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VendorDTO2 extends BaseDTO {
    private String companyName;
    private String email;
    
    private String phone;
    
    
   
}
