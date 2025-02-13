package com.th.global_exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.th.dto.ApiResponse;
import com.th.exception.AuthenticationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(AuthenticationException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public ApiResponse handleAuthenticationException(
			AuthenticationException e) {
		System.out.println("in res not found " + e);
		return new ApiResponse(e.getMessage());
	}
	
}
