package com.user.registration.services.impl;

import com.user.registration.entities.Role;
import com.user.registration.entities.User;
import com.user.registration.payload.request.AuthRequest;
import com.user.registration.payload.request.RefreshTokenRequest;
import com.user.registration.payload.request.RegisterRequest;
import com.user.registration.payload.response.AuthResponse;
import com.user.registration.repositories.RoleRepository;
import com.user.registration.repositories.UserRepository;
import com.user.registration.repositories.customRepository.CustomRoleRepository;
import com.user.registration.services.AuthenticationService;
import com.user.registration.services.JWTtokenService;
import com.user.registration.services.JwtService;
import com.user.registration.services.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationImpl implements AuthenticationService {
  private final String headerName = "X-XSRF-TOKEN";
  private final String cookieName = "XSRF-TOKEN";
  @Autowired
  public UserRepository userRepository;
  @Autowired
  public RoleRepository roleRepository;
  @Autowired
  private AuthenticationManager authenticationManager;
  @Autowired
  private JWTtokenService jwTtokenService;
  @Autowired
  private CustomRoleRepository customRoleRepository;
  @Autowired
  private UserService userService;

  @Autowired
  private UserDetailsImplement userDetailsImplement;

  @Override
  public ResponseEntity<?> signup(RegisterRequest request) {
    try {
//      boolean userExist = userRepository.existsById(request.getEmail().toString());
//      if (userExist) {
//        throw new IllegalArgumentException("User with" + userExist + "email Already Exist");
//      }
      User user = new User(
        request.getUser_name(),
        request.getEmail(),
        request.getPassword(),
        request.getMobile_number(),
        new HashSet<>()
      );
      userService.saveUser(user);
      userService.saveRole(new Role("ROLE_USER"));
      userService.addToUser(request.getEmail(), "ROLE_USER");
      user = userRepository.findByEmail(request.getEmail()).orElseThrow();
      return ResponseEntity.ok(user);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
  }

  @Override
  public ResponseEntity<?> signin(AuthRequest request) {
    try {
      Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
      Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
      var user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new IllegalArgumentException("Invalid email or password!"));
      var role = roleRepository.findById(user.getId()).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
      Set<Role> roles = new HashSet<>();
      roles.add(new Role(role.getName()));
      user.setRoles(roles);
      roles.stream().forEach(r ->
        {
          authorities.add(new SimpleGrantedAuthority(r.getName()));
        }
      );

      var accessToken = jwTtokenService.generateToken(user);
      var refreshToken = jwTtokenService.generateRefreshToken(new HashMap(), user);
      AuthResponse authResponse = new AuthResponse();
      authResponse.setAccess_token(accessToken);
      authResponse.setRefresh_token(refreshToken);
      HttpHeaders httpHeaders = new HttpHeaders();
      httpHeaders.add(headerName, authResponse.getAccess_token());
      httpHeaders.add(cookieName, authResponse.getRefresh_token());
//      return ResponseEntity.status(HttpStatus.CREATED).body(AuthResponse.builder().access_token(accessToken).refresh_token(refreshToken).email(user.getEmail()).user_name(user.getUser_name()).build());
//      return ResponseEntity.ok(AuthResponse.builder().access_token(accessToken).refresh_token(refreshToken).email(user.getEmail()).user_name(user.getUser_name()).build());
      return new ResponseEntity<>(user, httpHeaders, HttpStatus.OK);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
  }

  @Override
  public ResponseEntity<?> refreshToken(RefreshTokenRequest request) {
    try {
      String userEmail = jwTtokenService.extractUserName(request.getRefreshToken());
      UserDetails userDetails = userRepository.findByEmail(userEmail).orElseThrow(() -> new UsernameNotFoundException("not found"));
      if (jwTtokenService.isTokenValidate(request.getRefreshToken(), userDetails)) {
        var jwt = jwTtokenService.generateToken(userDetails);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setAccess_token(jwt);
        authResponse.setRefresh_token(request.getRefreshToken());

        return ResponseEntity.ok(AuthResponse.builder().refresh_token(request.getRefreshToken()).build());
      }
      return null;
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }

  }

}
