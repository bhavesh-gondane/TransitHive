package com.th.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AuthRequest {

	@NotBlank(message = "Username is required")
	private String email;
	
	//@Pattern(regexp = "^(?=.*[A-Za-z])[A-Za-z\\d@$!%*?&]{6,}$", message = "Password must be at least 6 characters long and contain at least one alphabet")
    @NotEmpty(message = "Password is required")
    private String password;
}
