package com.th.dto;

import lombok.Data;

@Data
public class RequestPassword {

		private String token;
		private String emailId;
		private String newPassword;
}
