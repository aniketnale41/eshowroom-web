package com.webapp.eshowroom.service;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.webapp.eshowroom.model.UserDTO;

@Service
public class AuthService {
	private final UserService userService;
	
	public AuthService(UserService userService) {
		this.userService = userService;
	}
	
	public boolean validatePassword(final String email, final String password) {
		UserDTO userDTO =  userService.findAllByEmail(email);
		boolean isValidPassword = BCrypt.checkpw(password, userDTO.getPassword());
		return isValidPassword;
	}
}
