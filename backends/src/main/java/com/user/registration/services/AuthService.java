package com.user.registration.services;


import com.user.registration.entities.Role;
import com.user.registration.entities.User;
import com.user.registration.payload.request.AuthRequest;
import com.user.registration.payload.request.RegisterRequest;
import com.user.registration.payload.response.AuthResponse;
import com.user.registration.repositories.RoleRepository;
import com.user.registration.repositories.UserRepository;
import com.user.registration.repositories.customRepository.CustomRoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class AuthService {
  @Autowired
  public UserRepository userRepository;
  @Autowired
  public RoleRepository roleRepository;
  @Autowired
  private AuthenticationManager authenticationManager;
  @Autowired
  private JwtService jwtService;
  @Autowired
  private CustomRoleRepository customRoleRepository;
  @Autowired
  private UserService userService;

  public ResponseEntity<?> register(RegisterRequest request) {
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

  public ResponseEntity<?> authenticate(AuthRequest authRequest) {
    try {

      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
      User user = userRepository.findByEmail(authRequest.getEmail()).orElseThrow(() -> new NoSuchElementException("User not found"));

//      List<Role> roles = null;
//      System.out.println("roles" + user);
//      roles = customRoleRepository.getRoles(user);
//      System.out.println("roles" + roles);
//      Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
      Set<Role> set = new HashSet<>();
//      roles.stream().forEach(c -> {
//        set.add(new Role(c.getName()));
//        authorities.add(new SimpleGrantedAuthority(c.getName()));
//      });
//      Set<Role> roles = new HashSet<>();
//      roles.add(new Role("ROLE_ADMIN"));
//      user.setRoles(roles);
//      roles.stream().forEach(r ->
//        {
//          authorities.add(new SimpleGrantedAuthority(r.getName()));
//        }
//      );
      Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
//      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
      var role = roleRepository.findById(user.getId()).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
      Set<Role> roles = new HashSet<>();
      roles.add(new Role(role.getName()));
      user.setRoles(roles);
      roles.stream().forEach(r ->
        {
          authorities.add(new SimpleGrantedAuthority(r.getName()));
        }
      );
      user.setRoles(set);
      set.stream().forEach(i -> authorities.add(new SimpleGrantedAuthority(i.getName())));
      var jwtAccessToken = jwtService.generateAccessToken(user, authorities);
      var jwtRefreshToken = jwtService.generateRefreshToken(user, authorities);
      return ResponseEntity.ok(AuthResponse.builder().access_token(jwtAccessToken).refresh_token(jwtRefreshToken).email(user.getEmail()).user_name(user.getUser_name()).build());
    } catch (NoSuchElementException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (BadCredentialsException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }

  }

  public AuthService() {

  }


}
