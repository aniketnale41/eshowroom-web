package com.webapp.eshowroom.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.bind.annotation.GetMapping;
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
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthController {
	
	private final AuthService authService;
	private final Map<String,String> tokenEmailMap = new HashMap<String,String>();
	
	public AuthController(final AuthService authService) {
        this.authService = authService;
    }
	
	@PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody @Valid final UserLoginDTO userDTO, HttpServletResponse response) throws IOException {
        boolean isValidLoginAttempt = authService.validatePassword(userDTO.getEmail(), userDTO.getPassword());
        if(isValidLoginAttempt) {
        	final String token = UUID.randomUUID().toString();
        	Cookie ck = new Cookie("token", token);
    		ck.setPath("/");
    		ck.setHttpOnly(true);
    		ck.setSecure(false);
        	response.addCookie(ck);
        	tokenEmailMap.put(token, userDTO.getEmail());
        	if(userDTO.getEmail().equals("admin@admin.com")) {
        		return new ResponseEntity<>("/dashboard", HttpStatus.OK);
        	}else {
        		return new ResponseEntity<>("/", HttpStatus.OK);
        	}
        }
        return new ResponseEntity<>("Invalid Email Password", HttpStatus.INTERNAL_SERVER_ERROR);
    }
	
	@PostMapping("/auth")
	public ResponseEntity<?> auth(HttpServletRequest request, HttpServletResponse response) throws IOException {	
    	String token = getAuthToken(request);
    	if(token == null) {
    		return ResponseEntity.status(401).body(false);
    	}else {
    		if(tokenEmailMap.containsKey(token)) {
    			if(tokenEmailMap.get(token).equals("admin@admin.com")) {
    				return ResponseEntity.status(200).body(true);
    			}
    			return ResponseEntity.status(200).body(false);
    		}else {
    			Cookie ck = new Cookie("token", token);
    			ck.setMaxAge(0);
    			ck.setPath("/");
    			response.addCookie(ck);
    		}
    	}
		return ResponseEntity.status(401).body(false);
	}
	
	@PostMapping("/logout")
	public boolean logOut(HttpServletRequest request, HttpServletResponse response) {
		String token = getAuthToken(request);
		if(tokenEmailMap.containsKey(token)) {
			tokenEmailMap.remove(token);
		}
		Cookie ck = new Cookie("token", token);
		ck.setMaxAge(0);
		ck.setPath("/");
		response.addCookie(ck);
		return true;
	}
	
	private String getAuthToken(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();    	
    	String token = null;
    	if(cookies == null) {
    		return null;
    	}
    	for(Cookie cookie: cookies) {
			if(cookie.getName().equals("token")) {
				token = cookie.getValue();
				break;
			}
		}
    	return token;
	}
}
