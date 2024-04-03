package com.user.registration.services.impl;

import com.user.registration.entities.Role;
import com.user.registration.entities.User;
import com.user.registration.repositories.RoleRepository;
import com.user.registration.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  UserRepository userRepository;
  @Autowired
  public RoleRepository roleRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(username)
      .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
    var userRole = userRepository.findByEmail(user.getEmail()).orElseThrow(() -> new IllegalArgumentException("Invalid email or password!"));
    var role = roleRepository.findById(userRole.getId()).orElseThrow();
    Set<Role> roles = new HashSet<>();
    roles.add(new Role(role.getName()));
    user.setRoles(roles);
    roles.stream().forEach(r ->
      {
        authorities.add(new SimpleGrantedAuthority(r.getName()));
      }
    );

    return user;
  }
}
