package com.user.registration.services;

import com.user.registration.entities.User;
import com.user.registration.payload.request.AuthRequest;
import com.user.registration.payload.request.RefreshTokenRequest;
import com.user.registration.payload.request.RegisterRequest;
import org.springframework.http.ResponseEntity;

public interface AuthenticationService {
  ResponseEntity<?> signup(RegisterRequest request);
  ResponseEntity<?> signin(AuthRequest request);

  ResponseEntity<?> refreshToken(RefreshTokenRequest request);
}
