package com.webapp.eshowroom.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.eshowroom.model.UserDTO;
import com.webapp.eshowroom.model.UserLoginDTO;
import com.webapp.eshowroom.service.AuthService;
import com.webapp.eshowroom.service.UserService;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthController {
	
	private final AuthService authService;
	
	public AuthController(final AuthService authService) {
        this.authService = authService;
    }
	
	@PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody @Valid final UserLoginDTO userDTO) {
        boolean isValidLoginAttempt = authService.validatePassword(userDTO.getEmail(), userDTO.getPassword());
        if(isValidLoginAttempt) {
        	return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid Email Password", HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
