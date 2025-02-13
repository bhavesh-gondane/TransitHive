package com.th.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class User extends BaseEntity {
    
    @NotEmpty(message = "Name is required")
    private String name;

    @Email(message = "Email should be valid")
    @NotEmpty(message = "Email is required")
    @Column(unique = true, nullable = false)
    private String email;

    //@Pattern(regexp = "^(?=.*[A-Za-z])[A-Za-z\\d@$!%*?&]{6,}$", message = "Password must be at least 6 characters long and contain at least one alphabet")
    @NotEmpty(message = "Password is required")
    private String password;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String phone;

    @NotEmpty(message = "City is required")
    private String city;
    
    private boolean isEmailVerified = false; // New field
    
    private String resetToken; // Stores password reset token
    
    private Date resetTokenExpiry; // Expiry time for token
    
    
}
