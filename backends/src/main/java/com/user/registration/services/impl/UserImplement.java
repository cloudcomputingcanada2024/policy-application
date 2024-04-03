package com.user.registration.services.impl;

import com.user.registration.entities.Role;
import com.user.registration.entities.User;
import com.user.registration.repositories.RoleRepository;
import com.user.registration.repositories.UserRepository;
import com.user.registration.services.UserService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@Transactional
@Slf4j
public class UserImplement implements UserService {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;



//  @Override
//  public UserDetailsService userDetailsService() {
//    return new UserDetailsService() {
//      @Override
//      public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user;
//        user = userRepository.findByEmail(username)
//          .orElseThrow(() -> new UsernameNotFoundException("user not found"));
//        System.out.println("user  when i login" + user);
//        return user;
//      }
//    };
//  }



  @Override
  public User saveUser(User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setRoles(new HashSet<>());
    return userRepository.save(user);
  }

  @Override
  public Role saveRole(Role role) {
    return roleRepository.save(role);
  }

  @Override
  public void addToUser(String username, String rolename) {
    if (!userRepository.findByEmail(username).isPresent()) {
      throw new IllegalArgumentException("User with email" + username + "does not exist");
    }
    Role role = roleRepository.findByName(rolename);
    if (role == null) {
      throw new IllegalArgumentException("Role with name" + rolename + "does not exist");
    }
    User user = userRepository.findByEmail(username).get();
    user.getRoles().add(role);
  }
}

