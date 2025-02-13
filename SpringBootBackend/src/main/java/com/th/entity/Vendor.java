//package com.th.entity;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.EnumType;
//import jakarta.persistence.Enumerated;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Getter
//@Setter
//@Entity
//public class Vendor extends BaseEntity {
//    private String companyName;
//
//    @Column(unique = true, nullable = false)
//    private String email;
//
//    private String password;
//
//    private String phone;
//
//    @Column(unique = true, nullable = false)
//    private String gstin;
//
//    private String companyOwnerName;
//
//    @Column(unique = true, nullable = false)
//    private String ownerAadharNumber;
//
//    @Column(unique = true, nullable = false)
//    private String panNumber;
//
//    private String city;
//
//    private String amount;
//
//    @Enumerated(EnumType.STRING)
//    private Status status = Status.PENDING;
//    
//    
//    public enum Status {
//        PENDING, APPROVED, SUSPENDED
//    }
//}

package com.th.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
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
public class Vendor extends BaseEntity {

    @NotEmpty(message = "Company name is required")
    private String companyName;

    @Email(message = "Email should be valid")
    @NotEmpty(message = "Email is required")
    @Column(unique = true, nullable = false)
    private String email;

    //@Pattern(regexp = "^[a-zA-Z]\\w{3,14}$", message = "Password should be atlleast 4 characters , and no longer than 15 charaters.")
    @NotEmpty(message = "Password is required")
    private String password;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String phone;

    @Pattern(regexp = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$", message = "Invalid GSTIN format")
    @NotEmpty(message = "GSTIN is required")
    @Column(unique = true, nullable = false)
    private String gstin;

    @NotEmpty(message = "Company owner name is required")
    private String companyOwnerName;

    @Pattern(regexp = "^[0-9]{12}$", message = "Aadhar number must be 12 digits")
    @NotEmpty(message = "Owner Aadhar number is required")
    @Column(unique = true, nullable = false)
    private String ownerAadharNumber;

    @Pattern(regexp = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$", message = "Invalid PAN number format")
    @NotEmpty(message = "PAN number is required")
    @Column(unique = true, nullable = false)
    private String panNumber;

    @NotEmpty(message = "City is required")
    private String city;

    
    private BigDecimal amount;
    
    private String comment;
    
    private String resetToken; // Stores password reset token
    
    private boolean isEmailVerified = false; // New field
    
    private String resetTokenExpiry; // Expiry time for

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    public enum Status {
        PENDING, APPROVED, SUSPENDED , REJECTED
    }
}

