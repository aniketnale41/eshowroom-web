package com.webapp.eshowroom.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.eshowroom.model.UserDTO;
import com.webapp.eshowroom.model.UserLoginDTO;
import com.webapp.eshowroom.service.AuthService;
import com.webapp.eshowroom.service.UserService;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthController {
	
	private final AuthService authService;
	
	public AuthController(final AuthService authService) {
        this.authService = authService;
    }
	
	@PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody @Valid final UserLoginDTO userDTO, HttpServletResponse response) {
        boolean isValidLoginAttempt = authService.validatePassword(userDTO.getEmail(), userDTO.getPassword());
        if(isValidLoginAttempt) {
        	response.addCookie(new Cookie("token", UUID.randomUUID().toString()));
        	//TODO replace token with jwt token
        	return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid Email Password", HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
