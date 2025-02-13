package com.th.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Otp extends BaseEntity{
	
	private String code;
	
	private String email;
	
	private LocalDateTime expirationTime;
	
	

}
