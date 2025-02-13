package com.th.entity;

import java.math.BigDecimal;

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
public class AdminWallet extends BaseEntity {

	
		private BigDecimal amount;
}
