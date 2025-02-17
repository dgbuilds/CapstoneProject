package com.wecp.eventmanagementsystem.controller;

import com.wecp.eventmanagementsystem.dto.LoginRequest;
import com.wecp.eventmanagementsystem.dto.LoginResponse;
import com.wecp.eventmanagementsystem.entity.User;
import com.wecp.eventmanagementsystem.jwt.JwtUtil;
import com.wecp.eventmanagementsystem.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class RegisterAndLoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;
 
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/api/user/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return new ResponseEntity<User>(userService.registerUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/api/user/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password", e);
        }
        User foundUser = userService.getUserByUsername(loginRequest.getUsername());
        final String token = jwtUtil.generateToken(loginRequest.getUsername());
        String role = foundUser.getRole();
        Long userId = foundUser.getUserID();
        String usernameString = foundUser.getUsername();
        String email = foundUser.getEmail();
        System.out.println("User Role: " + foundUser);
        return ResponseEntity.ok(new LoginResponse(userId,token, usernameString, email, role));
    }

    @GetMapping("/api/user/clients")
    public ResponseEntity<List<User>> getClients(){
        return new ResponseEntity<List<User>>(userService.getClients(),HttpStatus.OK);
    }
}
