package com.th.entity;

import java.math.BigDecimal;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
public class Admin extends BaseEntity {
	
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String phone;
    
    private boolean isEmailVerified = false; // New field
    
    private String resetToken; // Stores password reset token
    
    private Date resetTokenExpiry; // Expiry time for token
    
    private String city;
    
    
    private BigDecimal amount;
    
//    public bool IsEmailVerified { get; set; } = false; // New field
//    public string ResetToken { get; set; } // Stores password reset token
//    public DateTime? ResetTokenExpiry { get; set; } // Expiry time for token    
//    public string? City { get ; set; }
}
