package com.th.exception;

@SuppressWarnings("serial")
public class UsernameNotFoundException extends RuntimeException {
	public UsernameNotFoundException(String message) {
		super(message);
	}

}
