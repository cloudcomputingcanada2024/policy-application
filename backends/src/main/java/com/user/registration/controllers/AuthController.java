package com.user.registration.controllers;

import com.user.registration.payload.request.AuthRequest;
import com.user.registration.payload.request.RefreshTokenRequest;
import com.user.registration.payload.request.RegisterRequest;
import com.user.registration.services.AuthService;
import com.user.registration.services.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

  @Autowired
  private final AuthenticationService authenticationService;

  @Autowired
  private final AuthService authService;
  Logger logger = LoggerFactory.getLogger(AuthController.class);

  @PostMapping("/signup")
  public ResponseEntity<?> signup(@Valid @RequestBody RegisterRequest request) {
    logger.error("signup error");
    return ResponseEntity.ok(authenticationService.signup(request));
  }

  @PostMapping("/signin")
  public ResponseEntity<?> signin(@RequestBody AuthRequest request) {
    return ResponseEntity.ok(authenticationService.signin(request));
  }

  @PostMapping("/refreshToken")
  public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest request) {
    return ResponseEntity.ok(authenticationService.refreshToken(request));
  }


  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
    return ResponseEntity.ok(authService.register(request));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
    return ResponseEntity.ok(authService.authenticate(authRequest));
  }

}
