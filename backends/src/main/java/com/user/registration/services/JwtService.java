package com.user.registration.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.user.registration.entities.User;
import com.user.registration.repositories.RoleRepository;
import com.user.registration.repositories.UserRepository;
import com.user.registration.repositories.customRepository.CustomRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JwtService {


  @Autowired
  private UserRepository userRepository;
  @Autowired
  private CustomRoleRepository customRoleRepository;

  public JwtService() {
  }

  public String generateAccessToken(User user, Collection<SimpleGrantedAuthority> authorities) {
    Algorithm algorithm = Algorithm.HMAC256("secretKey");
    return JWT.create()
      .withSubject(user.getEmail())
      .withExpiresAt(new Date(System.currentTimeMillis() + 50 * 60 * 1000))
      .withClaim("roles", authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
      .sign(algorithm);
  }
  public String generateRefreshToken(User user, Collection<SimpleGrantedAuthority> authorities) {
    Algorithm algorithm = Algorithm.HMAC256("secretKey");
    return JWT.create()
      .withSubject(user.getEmail())
      .withExpiresAt(new Date(System.currentTimeMillis() + 50 * 60 * 1000))
      .withClaim("roles", authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
      .sign(algorithm);
  }

}
