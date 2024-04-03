package com.user.registration.services;

import com.user.registration.entities.Role;
import com.user.registration.entities.User;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.Map;

public interface JWTtokenService {

  String extractUserName(String token);

  String generateToken(UserDetails userDetails);

  String generateRefreshToken(Map<String, Object> extraClaims, UserDetails userDetails);

  Boolean isTokenValidate(String token, UserDetails userDetails);


}
