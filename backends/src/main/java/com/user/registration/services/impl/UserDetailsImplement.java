package com.user.registration.services.impl;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.user.registration.entities.Role;
import com.user.registration.entities.User;
import com.user.registration.repositories.RoleRepository;
import com.user.registration.repositories.UserRepository;
import com.user.registration.services.UserService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

public class UserDetailsImplement implements UserDetails {
  private static final long serialVersionUID = 1L;

  private Long id;

  private String username;

  private String email;
  private String mobile_number;

  @JsonIgnore
  private String password;

  private Collection<? extends GrantedAuthority> authorities;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;
 public UserDetailsImplement(Long id, String username, String email, String password, String mobile_number,
                              Collection<? extends GrantedAuthority> authorities) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.mobile_number = mobile_number;
    this.authorities = authorities;
  }

  public UserDetailsImplement() {

  }

  public static UserDetailsImplement build(User user) {
    List<GrantedAuthority> authorities = user.getRoles().stream()
      .map(role -> new SimpleGrantedAuthority(role.getName()))
      .collect(Collectors.toList());

    return new UserDetailsImplement(
      user.getId(),
      user.getUser_name(),
      user.getEmail(),
      user.getMobile_number(),
      user.getPassword(),
      authorities
    );
  }
//  @Override
//  public UserDetailsService userDetailsService() {
//    return new UserDetailsService() {
//      @Override
//      public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        UserDetails user;
//        user = userRepository.findByEmail(username)
//          .orElseThrow(() -> new UsernameNotFoundException("user not found"));
//        return user;
//      }
//    };
//  }

//  @Override
//  public Collection<? extends GrantedAuthority> getAuthorities() {
//    Collection<? extends GrantedAuthority> collection;
//    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
//    roles.stream().forEach(i -> authorities.add(new SimpleGrantedAuthority(i.getName())));
//    collection = List.of(new SimpleGrantedAuthority(authorities.toString()));
//    return collection;
//  }
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  public Long getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }
  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserDetailsImplement user = (UserDetailsImplement) o;
    return Objects.equals(id, user.id);
  }
}

